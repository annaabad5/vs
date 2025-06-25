// Variables globales
let scrollY = 0
let maskOpacity = 0

// Elementos del DOM
const virusMask = document.getElementById("virus-mask")
const scrollIndicator = document.getElementById("scroll-indicator")
const progressFill = document.getElementById("progress-fill")
const progressText = document.getElementById("progress-text")
const topProgressFill = document.getElementById("top-progress-fill")
const mainVirus = document.getElementById("main-virus")
const backgroundViruses = document.getElementById("background-viruses")
const mainVirusSpikes = document.getElementById("main-virus-spikes")

// Función para crear virus de fondo
function createBackgroundVirus(size, x, y, id) {
  const radius = size / 2
  const spikeCount = 16

  const virusGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
  virusGroup.setAttribute("transform", `translate(${x}, ${y})`)
  virusGroup.setAttribute("class", "background-virus")

  // Cuerpo del virus
  const virusBody = document.createElementNS("http://www.w3.org/2000/svg", "circle")
  virusBody.setAttribute("cx", "0")
  virusBody.setAttribute("cy", "0")
  virusBody.setAttribute("r", radius)
  virusBody.setAttribute("fill", "url(#bgVirusGradient)")
  virusBody.setAttribute("stroke", "#87CEEB")
  virusBody.setAttribute("stroke-width", "1")

  virusGroup.appendChild(virusBody)

  // Espigas
  for (let i = 0; i < spikeCount; i++) {
    const angle = (i * 360) / spikeCount
    const radian = (angle * Math.PI) / 180
    const spikeLength = radius * 0.5
    const baseX = Math.cos(radian) * radius
    const baseY = Math.sin(radian) * radius
    const tipX = Math.cos(radian) * (radius + spikeLength)
    const tipY = Math.sin(radian) * (radius + spikeLength)

    // Tallo de la espiga
    const spikeLine = document.createElementNS("http://www.w3.org/2000/svg", "line")
    spikeLine.setAttribute("x1", baseX)
    spikeLine.setAttribute("y1", baseY)
    spikeLine.setAttribute("x2", tipX)
    spikeLine.setAttribute("y2", tipY)
    spikeLine.setAttribute("stroke", "#87CEEB")
    spikeLine.setAttribute("stroke-width", "2")
    spikeLine.setAttribute("stroke-linecap", "round")

    // Cabeza de la espiga
    const spikeHead = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    spikeHead.setAttribute("cx", tipX)
    spikeHead.setAttribute("cy", tipY)
    spikeHead.setAttribute("r", radius * 0.12)
    spikeHead.setAttribute("fill", "#B8E0FF")

    virusGroup.appendChild(spikeLine)
    virusGroup.appendChild(spikeHead)
  }

  return virusGroup
}

// Función para crear espigas del virus principal
function createMainVirusSpikes() {
  const spikeCount = 20

  for (let i = 0; i < spikeCount; i++) {
    const angle = (i * 360) / spikeCount + (i % 2) * 18
    const radian = (angle * Math.PI) / 180
    const spikeLength = 35 + (i % 3) * 8
    const baseX = Math.cos(radian) * 100
    const baseY = Math.sin(radian) * 100
    const midX = Math.cos(radian) * (100 + spikeLength * 0.7)
    const midY = Math.sin(radian) * (100 + spikeLength * 0.7)
    const tipX = Math.cos(radian) * (100 + spikeLength)
    const tipY = Math.sin(radian) * (100 + spikeLength)

    // Tallo de la espiga
    const spikeLine = document.createElementNS("http://www.w3.org/2000/svg", "line")
    spikeLine.setAttribute("x1", baseX)
    spikeLine.setAttribute("y1", baseY)
    spikeLine.setAttribute("x2", midX)
    spikeLine.setAttribute("y2", midY)
    spikeLine.setAttribute("stroke", "#6BB6FF")
    spikeLine.setAttribute("stroke-width", "5")
    spikeLine.setAttribute("stroke-linecap", "round")

    // Cabeza tipo bastón
    const spikeHead = document.createElementNS("http://www.w3.org/2000/svg", "ellipse")
    spikeHead.setAttribute("cx", tipX)
    spikeHead.setAttribute("cy", tipY)
    spikeHead.setAttribute("rx", "14")
    spikeHead.setAttribute("ry", "9")
    spikeHead.setAttribute("fill", "url(#mainSpikeGradient)")
    spikeHead.setAttribute("transform", `rotate(${angle} ${tipX} ${tipY})`)
    spikeHead.setAttribute("stroke", "#4A90E2")
    spikeHead.setAttribute("stroke-width", "1")
    spikeHead.setAttribute("filter", "url(#softShadow)")

    // Brillo en la cabeza
    const spikeHighlight = document.createElementNS("http://www.w3.org/2000/svg", "ellipse")
    spikeHighlight.setAttribute("cx", tipX - 3)
    spikeHighlight.setAttribute("cy", tipY - 2)
    spikeHighlight.setAttribute("rx", "5")
    spikeHighlight.setAttribute("ry", "3")
    spikeHighlight.setAttribute("fill", "#F0F8FF")
    spikeHighlight.setAttribute("opacity", "0.8")
    spikeHighlight.setAttribute("transform", `rotate(${angle} ${tipX - 3} ${tipY - 2})`)

    mainVirusSpikes.appendChild(spikeLine)
    mainVirusSpikes.appendChild(spikeHead)
    mainVirusSpikes.appendChild(spikeHighlight)
  }
}

// Función para generar virus de fondo
function generateBackgroundViruses() {
  const virusCount = 12

  for (let i = 0; i < virusCount; i++) {
    const size = 40 + Math.random() * 30
    const x = Math.random() * window.innerWidth
    const y = 100 + Math.random() * (window.innerHeight - 200)

    const virus = createBackgroundVirus(size, x, y, `bg${i}`)
    backgroundViruses.appendChild(virus)
  }
}

// Función para actualizar la posición del virus principal
function updateMainVirusPosition() {
  const centerX = window.innerWidth / 2
  mainVirus.setAttribute("transform", `translate(${centerX}, 450)`)
}

// Función para manejar el scroll
function handleScroll() {
  scrollY = window.pageYOffset

  // Calcular opacidad del barbijo
  const maskStart = 200
  const maskEnd = 600

  if (scrollY < maskStart) {
    maskOpacity = 0
  } else if (scrollY > maskEnd) {
    maskOpacity = 1
  } else {
    const progress = (scrollY - maskStart) / (maskEnd - maskStart)
    maskOpacity = progress
  }

  // Aplicar opacidad al barbijo
  virusMask.style.opacity = maskOpacity

  // Actualizar indicador de scroll
  if (scrollY < 100) {
    scrollIndicator.style.opacity = "1"
  } else {
    scrollIndicator.style.opacity = "0"
  }

  // Actualizar indicadores de progreso
  const progressPercentage = Math.round(maskOpacity * 100)
  progressFill.style.width = `${progressPercentage}%`
  progressText.textContent = `${progressPercentage}%`

  // Actualizar barra de progreso superior
  const totalProgress = Math.min((scrollY / (window.innerHeight * 1.5)) * 100, 100)
  topProgressFill.style.width = `${totalProgress}%`
}

// Función para manejar el redimensionamiento de ventana
function handleResize() {
  // Limpiar virus de fondo existentes
  backgroundViruses.innerHTML = ""

  // Regenerar virus de fondo
  generateBackgroundViruses()

  // Actualizar posición del virus principal
  updateMainVirusPosition()
}

// Inicialización
function init() {
  // Generar virus de fondo
  generateBackgroundViruses()

  // Crear espigas del virus principal
  createMainVirusSpikes()

  // Posicionar virus principal
  updateMainVirusPosition()

  // Event listeners
  window.addEventListener("scroll", handleScroll)
  window.addEventListener("resize", handleResize)

  // Llamar handleScroll una vez para inicializar
  handleScroll()
}

// Inicializar cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init)
} else {
  init()
}
