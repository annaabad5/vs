let currentChapter = 0;
        const totalChapters = 8;
        let scrollY = 0;
        let maskOpacity = 0;

        // Crear espigas del virus principal
        function createVirusSpikes() {
            const spikesContainer = document.getElementById('virus-spikes');
            const spikeCount = 32;

            for (let i = 0; i < spikeCount; i++) {
                const angle = (i * 360) / spikeCount + (Math.random() - 0.5) * 20;
                const radian = (angle * Math.PI) / 180;
                const spikeLength = 35 + Math.random() * 25;
                const baseRadius = 180;
                const baseX = 500 + Math.cos(radian) * baseRadius;
                const baseY = 500 + Math.sin(radian) * baseRadius;
                const tipX = 500 + Math.cos(radian) * (baseRadius + spikeLength);
                const tipY = 500 + Math.sin(radian) * (baseRadius + spikeLength);
                const midX = 500 + Math.cos(radian) * (baseRadius + spikeLength * 0.7);
                const midY = 500 + Math.sin(radian) * (baseRadius + spikeLength * 0.7);

                // Crear grupo para la espiga
                const spikeGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");

                // Tallo de la espiga
                const spikeLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
                spikeLine.setAttribute("x1", baseX);
                spikeLine.setAttribute("y1", baseY);
                spikeLine.setAttribute("x2", midX);
                spikeLine.setAttribute("y2", midY);
                spikeLine.setAttribute("stroke", "#2E5F8A");
                spikeLine.setAttribute("stroke-width", "8");
                spikeLine.setAttribute("stroke-linecap", "round");
                spikeLine.setAttribute("opacity", "0.8");

                // Cabeza de la espiga
                const spikeHead = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                spikeHead.setAttribute("cx", tipX);
                spikeHead.setAttribute("cy", tipY);
                spikeHead.setAttribute("r", "12");
                spikeHead.setAttribute("fill", "url(#spikeGradient)");
                spikeHead.setAttribute("filter", "url(#depth)");

                // Detalle interno
                const spikeDetail = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                spikeDetail.setAttribute("cx", tipX - 2);
                spikeDetail.setAttribute("cy", tipY - 2);
                spikeDetail.setAttribute("r", "4");
                spikeDetail.setAttribute("fill", "#FF8A8A");
                spikeDetail.setAttribute("opacity", "0.6");

                spikeGroup.appendChild(spikeLine);
                spikeGroup.appendChild(spikeHead);
                spikeGroup.appendChild(spikeDetail);
                spikesContainer.appendChild(spikeGroup);
            }
        }

        // Crear plaga de virus para propagación global
        function createVirusPlague() {
            const plagueContainer = document.getElementById('virusPlague');
            const virusCount = 25;

            for (let i = 0; i < virusCount; i++) {
                const virus = document.createElement('div');
                virus.className = 'plague-virus';
                virus.style.left = Math.random() * 100 + '%';
                virus.style.top = Math.random() * 100 + '%';
                virus.style.animationDelay = Math.random() * 6 + 's';
                virus.style.animationDuration = (4 + Math.random() * 4) + 's';
                plagueContainer.appendChild(virus);
            }
        }

        // Actualizar estado del virus según capítulo
        function updateVirusState(chapter) {
            const virusMain = document.getElementById('virusMain');
            const virusPlague = document.getElementById('virusPlague');
            
            // Limpiar clases anteriores
            virusMain.className = 'virus-main';
            virusPlague.classList.remove('active');
            
            switch(chapter) {
                case 1: // Los Orígenes - Bandera de China
                    virusMain.classList.add('china');
                    break;
                case 2: // ¿Qué es COVID? - Normal
                    virusMain.classList.add('c0vid');
                    break;
                case 3: // Propagación Global - Plaga de virus
                    virusPlague.classList.add('active');
                    break;
                case 4: // Cuarentena - Virus en casa
                    virusMain.classList.add('house');
                    break;
                case 5: // Vacunas - Virus vacunándose
                    virusMain.classList.add('vaccine');
                    break;
                case 6: // Consecuencias - Virus muerto
                    virusMain.classList.add('dead');
                    break;
                case 7: // Tu turno - Virus 
                    virusMain.classList.add('china');
                    break;
                case 8: // Fuentes - Virus con libro
                    virusMain.classList.add('book');
                    break;
            }
        }

        function updateTimeline() {
            scrollY = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            // Mostrar timeline después de pasar la portada
            const timelineContainer = document.getElementById('timelineContainer');
            const progressIndicator = document.getElementById('progress');
            const floatingVirus = document.getElementById('floatingVirus');
            const virusMask = document.getElementById('virus-mask');
            
            if (scrollY > windowHeight * 0.8) {
                timelineContainer.classList.add('visible');
                progressIndicator.classList.add('visible');
                floatingVirus.classList.add('visible');
            } else {
                timelineContainer.classList.remove('visible');
                progressIndicator.classList.remove('visible');
                floatingVirus.classList.remove('visible');
                return;
            }
            
            // ANIMAR VIRUS FLOTANTE
            const maxScroll = document.body.scrollHeight - windowHeight;
            const scrollProgress = (scrollY - windowHeight) / (maxScroll - windowHeight);
            const virusTop = 100 + (scrollProgress * (windowHeight - 300));
            floatingVirus.style.top = virusTop + 'px';
            
            // ANIMAR BARBIJO EN PORTADA
            const maskStart = windowHeight * 0.3;
            const maskEnd = windowHeight * 0.8;
            
            if (scrollY < maskStart) {
                maskOpacity = 0;
            } else if (scrollY > maskEnd) {
                maskOpacity = 1;
            } else {
                const progress = (scrollY - maskStart) / (maskEnd - maskStart);
                maskOpacity = progress;
            }
            
            if (virusMask) {
                virusMask.style.opacity = maskOpacity;
            }
            
            // Detectar capítulo actual
            const contentSections = document.querySelectorAll('.content-section');
            let newChapter = 0;
            
            contentSections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                const chapterNum = index + 1;
                
                if (rect.top < windowHeight * 0.6 && rect.bottom > windowHeight * 0.4) {
                    newChapter = chapterNum;
                }
            });
            
            if (newChapter !== currentChapter && newChapter > 0) {
                currentChapter = newChapter;
                updateChapterDisplay();
                updateVirusState(currentChapter);
                document.getElementById('progress').textContent = `${currentChapter}/9`;
            }
        }

        function updateChapterDisplay() {
            const timelineItems = document.querySelectorAll('.timeline-item');
            
            timelineItems.forEach((item, index) => {
                const chapterNum = index + 1;
                
                if (chapterNum === currentChapter) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }

        function navigateToChapter(chapterNum) {
            const targetSection = document.getElementById(`chapter-${chapterNum}`);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }

        // Event listeners
        window.addEventListener('scroll', updateTimeline);

        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                navigateToChapter(index + 1);
            });
        });

        // Inicialización
        document.addEventListener('DOMContentLoaded', () => {
            createVirusSpikes();
            createVirusPlague();
            updateTimeline();
        });

        //Slider Antes y Despues
        function activarComparador(comparadorId, imagenId, divisorId) {
            const comparador = document.getElementById(comparadorId);
            const imagen = document.getElementById(imagenId);
            const divisor = document.getElementById(divisorId);

            comparador.addEventListener('mousemove', (e) => {
                const rect = comparador.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const porcentaje = (x / rect.width) * 100;

                imagen.style.clipPath = `inset(0 ${100 - porcentaje}% 0 0)`;
                divisor.style.left = `${porcentaje}%`;
            });

            // Inicial
            const inicial = comparador.getBoundingClientRect().width / 2;
            imagen.style.clipPath = `inset(0 50% 0 0)`;
            divisor.style.left = `50%`;
            }

            // Activar todos los comparadores
            window.addEventListener("load", () => {
            activarComparador("comparador-paris", "imagen-paris", "divisor-paris");
            activarComparador("comparador-la", "imagen-la", "divisor-la");
            activarComparador("comparador-granvia", "imagen-granvia", "divisor-granvia");
            activarComparador("comparador-ny", "imagen-ny", "divisor-ny");
            activarComparador("comparador-coliseo", "imagen-coliseo", "divisor-coliseo");
            });

            // mapa esparcion
            const covidData = [
            { 
                day: 0, 
                date: "31 Dic 2019", 
                country: "China", 
                city: "Wuhan", 
                id: "wuhan", 
                cases: 27, 
                description: "Primeros casos reportados de neumonía desconocida en el mercado de mariscos de Huanan. El epicentro de la pandemia global.",
                flag: "🇨🇳"
            },
            { 
                day: 13, 
                date: "13 Ene 2020", 
                country: "Tailandia", 
                city: "Bangkok", 
                id: "thailand", 
                cases: 1, 
                description: "Primera propagación internacional confirmada. Mujer china de 61 años que viajó desde Wuhan.",
                flag: "🇹🇭"
            },
            { 
                day: 16, 
                date: "16 Ene 2020", 
                country: "Japón", 
                city: "Tokio", 
                id: "japan", 
                cases: 1, 
                description: "Hombre japonés de 30 años que había viajado a Wuhan por trabajo.",
                flag: "🇯🇵"
            },
            { 
                day: 20, 
                date: "20 Ene 2020", 
                country: "Corea del Sur", 
                city: "Seúl", 
                id: "korea", 
                cases: 1, 
                description: "Mujer china de 35 años que llegó desde Wuhan vía vuelo comercial.",
                flag: "🇰🇷"
            },
            { 
                day: 21, 
                date: "21 Ene 2020", 
                country: "Estados Unidos", 
                city: "Seattle", 
                id: "usa", 
                cases: 1, 
                description: "Hombre de 35 años que regresó de Wuhan a Washington State.",
                flag: "🇺🇸"
            },
            { 
                day: 24, 
                date: "24 Ene 2020", 
                country: "Francia", 
                city: "París", 
                id: "france", 
                cases: 2, 
                description: "Primeros casos confirmados en Europa. Dos pacientes en París y Burdeos.",
                flag: "🇫🇷"
            },
            { 
                day: 25, 
                date: "25 Ene 2020", 
                country: "Australia", 
                city: "Melbourne", 
                id: "australia", 
                cases: 1, 
                description: "Hombre chino que llegó desde Guangzhou en vuelo internacional.",
                flag: "🇦🇺"
            },
            { 
                day: 27, 
                date: "27 Ene 2020", 
                country: "Canadá", 
                city: "Toronto", 
                id: "canada", 
                cases: 1, 
                description: "Hombre de 50 años que regresó de Wuhan tras visita familiar.",
                flag: "🇨🇦"
            },
            { 
                day: 27, 
                date: "27 Ene 2020", 
                country: "Alemania", 
                city: "Múnich", 
                id: "germany", 
                cases: 1, 
                description: "Empleado de empresa alemana con contacto con colega china infectada.",
                flag: "🇩🇪"
            },
            { 
                day: 30, 
                date: "30 Ene 2020", 
                country: "India", 
                city: "Kerala", 
                id: "india", 
                cases: 1, 
                description: "Estudiante que regresó de la Universidad de Wuhan.",
                flag: "🇮🇳"
            },
            { 
                day: 31, 
                date: "31 Ene 2020", 
                country: "Italia", 
                city: "Roma", 
                id: "italy", 
                cases: 2, 
                description: "Pareja de turistas chinos que visitaban Roma.",
                flag: "🇮🇹"
            },
            { 
                day: 31, 
                date: "31 Ene 2020", 
                country: "Reino Unido", 
                city: "Londres", 
                id: "uk", 
                cases: 2, 
                description: "Dos miembros de una familia china en hotel de Yorkshire.",
                flag: "🇬🇧"
            },
            { 
                day: 31, 
                date: "31 Ene 2020", 
                country: "España", 
                city: "Madrid", 
                id: "spain", 
                cases: 1, 
                description: "Turista alemán en La Gomera, Islas Canarias.",
                flag: "🇪🇸"
            },
            { 
                day: 57, 
                date: "26 Feb 2020", 
                country: "Brasil", 
                city: "São Paulo", 
                id: "brazil", 
                cases: 1, 
                description: "Hombre de 61 años que viajó a Italia (región de Lombardía).",
                flag: "🇧🇷"
            },
            { 
                day: 63, 
                date: "3 Mar 2020", 
                country: "Argentina", 
                city: "Buenos Aires", 
                id: "argentina", 
                cases: 1, 
                description: "Hombre de 43 años que regresó de Italia. Primer caso confirmado en Argentina.",
                flag: "🇦🇷"
            }
        ];

        let currentDay = 0;
        let isPlaying = false;
        let playInterval;
        let totalCases = 27;
        let countriesAffected = 1;
        let activeConnections = 0;

        const playButton = document.getElementById('playButton');
        const timelineSlider = document.getElementById('timelineSlider');
        const dateDisplay = document.getElementById('dateDisplay');
        const infoPanel = document.getElementById('infoPanel');
        const infoTitle = document.getElementById('infoTitle');
        const infoText = document.getElementById('infoText');
        const countriesCount = document.getElementById('countriesCount');
        const daysCount = document.getElementById('daysCount');
        const casesCount = document.getElementById('casesCount');
        const connectionsCount = document.getElementById('connectionsCount');
        const progressBar = document.getElementById('progressBar');
        const legend = document.getElementById('legend');

        // Inicializar
        function init() {
            updateVisualization(0);
            createLegend();
            infoPanel.classList.add('visible');
        }

        // Crear leyenda
        function createLegend() {
            covidData.forEach((item, index) => {
                const legendItem = document.createElement('div');
                legendItem.className = 'legend-item';
                legendItem.innerHTML = `
                    <div class="country-name">${item.flag} ${item.country}</div>
                    <div class="date">${item.date}</div>
                    <div class="cases">${item.cases} caso${item.cases > 1 ? 's' : ''}</div>
                `;
                legend.appendChild(legendItem);
                
                // Animar aparición con delay
                setTimeout(() => {
                    legendItem.classList.add('visible');
                }, index * 150);
            });
        }

        // Actualizar visualización
        function updateVisualization(day) {
            currentDay = day;
            
            // Encontrar eventos hasta el día actual
            const activeEvents = covidData.filter(item => item.day <= day);
            const latestEvent = activeEvents[activeEvents.length - 1];
            
            if (latestEvent) {
                dateDisplay.textContent = latestEvent.date;
                infoTitle.textContent = `${latestEvent.flag} ${latestEvent.city}, ${latestEvent.country}`;
                infoText.textContent = latestEvent.description;
                
                // Actualizar estadísticas
                daysCount.textContent = day;
                countriesCount.textContent = activeEvents.length;
                totalCases = activeEvents.reduce((sum, event) => sum + event.cases, 0);
                casesCount.textContent = totalCases.toLocaleString();
                activeConnections = activeEvents.length - 1; // -1 porque Wuhan es el origen
                connectionsCount.textContent = activeConnections;
            }

            // Actualizar barra de progreso
            const progress = (day / 67) * 100;
            progressBar.style.width = `${progress}%`;

            // Activar/desactivar elementos según el día
            covidData.forEach(event => {
                const dot = document.getElementById(event.id);
                const label = document.getElementById(`${event.id}-label`);
                const flow = document.getElementById(`flow-${event.id}`);
                
                if (event.day <= day && event.id !== 'wuhan') {
                    // Activar línea primero
                    if (flow && !flow.classList.contains('active')) {
                        flow.classList.add('active');
                    }
                    
                    // Luego activar punto con delay
                    if (dot && !dot.classList.contains('active')) {
                        setTimeout(() => {
                            dot.classList.add('active');
                        }, 1000); // Delay para que aparezca después de la línea
                    }
                    
                    // Finalmente activar etiqueta
                    if (label && !label.classList.contains('active')) {
                        setTimeout(() => {
                            label.classList.add('active');
                        }, 1500);
                    }
                } else if (event.id !== 'wuhan') {
                    // Desactivar elementos futuros
                    if (dot) dot.classList.remove('active');
                    if (label) label.classList.remove('active');
                    if (flow) flow.classList.remove('active');
                }
            });

            timelineSlider.value = day;
        }

        // Reproducir automáticamente
        function play() {
            if (isPlaying) {
                clearInterval(playInterval);
                playButton.textContent = '▶';
                isPlaying = false;
            } else {
                playButton.textContent = '⏸';
                isPlaying = true;
                
                playInterval = setInterval(() => {
                    if (currentDay >= 67) {
                        clearInterval(playInterval);
                        playButton.textContent = '🔄';
                        isPlaying = false;
                        return;
                    }
                    
                    currentDay += 1;
                    updateVisualization(currentDay);
                }, 500); // Velocidad más lenta para ver mejor las transiciones
            }
        }

        // Event listeners
        playButton.addEventListener('click', () => {
            if (playButton.textContent === '🔄') {
                // Reiniciar
                currentDay = 0;
                updateVisualization(0);
                playButton.textContent = '▶';
            } else {
                play();
            }
        });

        timelineSlider.addEventListener('input', (e) => {
            if (isPlaying) {
                clearInterval(playInterval);
                playButton.textContent = '▶';
                isPlaying = false;
            }
            updateVisualization(parseInt(e.target.value));
        });

        // Hover en puntos para mostrar información
        covidData.forEach(event => {
            const dot = document.getElementById(event.id);
            if (dot) {
                dot.addEventListener('mouseenter', () => {
                    infoTitle.textContent = `${event.flag} ${event.city}, ${event.country}`;
                    infoText.textContent = `${event.date} - ${event.description}`;
                });
                
                dot.addEventListener('mouseleave', () => {
                    const currentEvent = covidData.find(item => item.day <= currentDay);
                    if (currentEvent) {
                        infoTitle.textContent = `${currentEvent.flag} ${currentEvent.city}, ${currentEvent.country}`;
                        infoText.textContent = currentEvent.description;
                    }
                });
            }
        });

        // Inicializar cuando cargue la página
        document.addEventListener('DOMContentLoaded', init);
        document.querySelectorAll('.circular-item').forEach(item => {
            const valor = item.dataset.valor;
            const circle = item.querySelector('.circle');
            const porcentaje = item.querySelector('.circle-percentage');
            setTimeout(() => {
              circle.setAttribute('stroke-dasharray', `${valor}, 100`);
            }, 300);
          });

          const c = document.getElementById("canvas"), ctx = c.getContext("2d");
          let w, h;
          
          function resize() {
            w = c.width = innerWidth;
            h = c.height = innerHeight;
          }
          window.addEventListener("resize", resize);
          resize();
          
          const virusImg = new Image();
          virusImg.src = "virus_transparente_real_hd.png";
          
          class Virus {
            constructor(x, y, inf = false) {
              this.x = x;
              this.y = y;
              this.r = Math.random() * 4 + 2;
              this.vx = (Math.random() - 0.5) * 2;
              this.vy = (Math.random() - 0.5) * 2;
              this.infected = inf;
              this.growth = inf ? 1.5 : 0.5;
              this.opacity = 1;
            }
          
            update() {
              this.x += this.vx;
              this.y += this.vy;
          
              // Rebote en bordes
              if (this.x < 0 || this.x > w) this.vx *= -1;
              if (this.y < 0 || this.y > h) this.vy *= -1;
          
              if (this.infected && this.r < 90) {
                this.r += this.growth;
              }
            }
          
            draw() {
              ctx.save();
              ctx.globalAlpha = this.opacity;
              if (virusImg.complete && virusImg.naturalWidth) {
                ctx.drawImage(virusImg, this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
              } else {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
                ctx.fillStyle = this.infected ? "#E74C3C" : "#7BB3F0";
                ctx.fill();
              }
              ctx.restore();
            }
          
            infect(arr) {
              if (!this.infected) return;
              for (const o of arr) {
                if (!o.infected) {
                  const dx = this.x - o.x;
                  const dy = this.y - o.y;
                  if (Math.hypot(dx, dy) < this.r + o.r + 8) o.infected = true;
                }
              }
            }
          }
          
          const viruses = [];
          for (let i = 0; i < 100; i++) viruses.push(new Virus(Math.random() * w, Math.random() * h));
          viruses[0].infected = true;
          
          function animate() {
            ctx.clearRect(0, 0, w, h);
            for (const v of viruses) {
              v.update();
              v.infect(viruses);
              v.draw();
            }
            requestAnimationFrame(animate);
          }
          animate();
          
          const title = document.getElementById("title");
          
          // Mostrar el título a los 9 segundos
          setTimeout(() => {
            title.classList.add("show");
          }, 9000);
          
  
// probando lo de imagenes
function ajustarScrollyOffset() {
  const timeline = document.getElementById('timelineContainer');
  const scrollyBlocks = document.querySelectorAll('.scrolly-background');

  if (timeline) {
    const timelineHeight = timeline.offsetHeight;

    scrollyBlocks.forEach(bg => {
      bg.style.top = `${timelineHeight}px`;
      bg.style.height = `calc(100vh - ${timelineHeight}px)`;
    });
  }
}

window.addEventListener('load', ajustarScrollyOffset);
window.addEventListener('resize', ajustarScrollyOffset);

function setupScrollytelling() {
  const steps = document.querySelectorAll('.scrolly-step-foto');
  const images = document.querySelectorAll('.scrolly-background img');

  // Mostrar imagen inicial (data-step="0")
  images.forEach(img => {
    if (img.dataset.step === "0") {
      img.classList.add("active");
    } else {
      img.classList.remove("active");
    }
  });

  // Crear observer
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const step = entry.target.dataset.step;
          images.forEach(img => {
            img.classList.toggle("active", img.dataset.step === step);
          });
        }
      });
    },
    {
      root: null,
      threshold: 0.5
    }
  );

  // Observar cada step
  steps.forEach(step => observer.observe(step));
}

// Activar al cargar la página
document.addEventListener("DOMContentLoaded", setupScrollytelling);


const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("click", () => {
    cards.forEach(c => {
      if (c !== card) c.classList.remove("expanded");
    });
    card.classList.toggle("expanded");
  });
});

document.body.addEventListener("click", e => {
  if (!e.target.closest(".card")) {
    cards.forEach(c => c.classList.remove("expanded"));
  }
});

         

// KIT
let nombreKitSelectedItems = [];
        let nombreKitCompletedKits = [];
        let nombreKitCurrentSlot = 1;

        const nombreKitItems = document.querySelectorAll('.nombre-kit-item-card');
        const nombreKitSlots = document.querySelectorAll('.nombre-kit-slot');
        const nombreKitOverlay = document.getElementById('nombreKitOverlay');
        const nombreKitSuccessMessage = document.getElementById('nombreKitSuccessMessage');
        const nombreKitCompletedKitsContainer = document.getElementById('nombreKitCompletedKits');
        const nombreKitProgressFill = document.getElementById('nombreKitProgressFill');

        nombreKitItems.forEach(item => {
            item.addEventListener('click', () => nombreKitSelectItem(item));
        });

        function nombreKitSelectItem(item) {
            if (item.classList.contains('selected') || item.classList.contains('disabled')) {
                return;
            }

            if (nombreKitSelectedItems.length >= 3) {
                return;
            }

            // Add item to selection
            nombreKitSelectedItems.push({
                emoji: item.dataset.emoji,
                title: item.dataset.title,
                description: item.dataset.description
            });

            // Update UI
            item.classList.add('selected');
            nombreKitUpdateSlot(nombreKitCurrentSlot, item.dataset.emoji);
            nombreKitCurrentSlot++;

            // Update progress
            nombreKitUpdateProgress();

            // Disable other items if we have 3 selected
            if (nombreKitSelectedItems.length === 3) {
                nombreKitItems.forEach(i => {
                    if (!i.classList.contains('selected')) {
                        i.classList.add('disabled');
                    }
                });
                
                // Show success message after a short delay
                setTimeout(() => {
                    nombreKitShowSuccess();
                }, 500);
            }
        }

        function nombreKitUpdateSlot(slotNumber, emoji) {
            const slot = document.getElementById(`nombreKitSlot${slotNumber}`);
            slot.textContent = emoji;
            slot.classList.add('filled');
        }

        function nombreKitUpdateProgress() {
            const progress = (nombreKitSelectedItems.length / 3) * 100;
            nombreKitProgressFill.style.width = progress + '%';
        }

        function nombreKitShowSuccess() {
            nombreKitOverlay.style.display = 'block';
            nombreKitSuccessMessage.style.display = 'block';
        }

        function nombreKitCloseSuccess() {
            nombreKitOverlay.style.display = 'none';
            nombreKitSuccessMessage.style.display = 'none';
            
            // Save current kit
            nombreKitCompletedKits.push([...nombreKitSelectedItems]);
            nombreKitUpdateCompletedKits();
            
            // Reset for next kit
            nombreKitReset();
        }

        function nombreKitCreateAnother() {
            nombreKitCloseSuccess();
        }

        function nombreKitReset() {
            nombreKitSelectedItems = [];
            nombreKitCurrentSlot = 1;
            
            // Reset slots
            nombreKitSlots.forEach(slot => {
                slot.textContent = '?';
                slot.classList.remove('filled');
            });
            
            // Reset items
            nombreKitItems.forEach(item => {
                item.classList.remove('selected', 'disabled');
            });
            
            // Reset progress
            nombreKitProgressFill.style.width = '0%';
        }

        function nombreKitUpdateCompletedKits() {
            nombreKitCompletedKitsContainer.innerHTML = '';
            
            nombreKitCompletedKits.forEach((kit, index) => {
                const miniKit = document.createElement('div');
                miniKit.className = 'nombre-kit-mini-kit';
                
                const itemsDiv = document.createElement('div');
                itemsDiv.className = 'nombre-kit-mini-kit-items';
                
                kit.forEach(item => {
                    const itemSpan = document.createElement('span');
                    itemSpan.className = 'nombre-kit-mini-kit-item';
                    itemSpan.textContent = item.emoji;
                    itemsDiv.appendChild(itemSpan);
                });
                
                const titleDiv = document.createElement('div');
                titleDiv.className = 'nombre-kit-mini-kit-title';
                titleDiv.textContent = `Kit ${index + 1}`;
                
                miniKit.appendChild(itemsDiv);
                miniKit.appendChild(titleDiv);
                nombreKitCompletedKitsContainer.appendChild(miniKit);
            });
        }

        // Add some fun animations on load
        window.addEventListener('load', () => {
            nombreKitItems.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
            });
        });


        // MURO
        let tituloMuroMemoriesData = [
            {
                id: 1,
                text: "Recuerdo el primer día de cuarentena, todo parecía surreal...",
                date: "15 Mar 2020",
                time: "14:30",
                likes: 12,
                position: { x: 15, y: 20 },
                rotation: -3
            },
            {
                id: 2,
                text: "La solidaridad que vi en mi barrio durante la pandemia me marcó para siempre",
                date: "22 Abr 2020",
                time: "09:15",
                likes: 8,
                position: { x: 70, y: 15 },
                rotation: 2
            },
            {
                id: 3,
                text: "Aprendí a valorar las pequeñas cosas: un abrazo, una cena familiar...",
                date: "10 Jun 2020",
                time: "20:45",
                likes: 15,
                position: { x: 25, y: 60 },
                rotation: -1
            }
        ];

        function tituloMuroGetRandomPosition() {
            const positions = [
                { x: Math.random() * 60 + 10, y: Math.random() * 50 + 20 },
                { x: Math.random() * 60 + 30, y: Math.random() * 50 + 30 },
                { x: Math.random() * 40 + 50, y: Math.random() * 40 + 25 }
            ];
            return positions[Math.floor(Math.random() * positions.length)];
        }

        function tituloMuroRenderMemories() {
            const container = document.getElementById('tituloMuroMemories');
            container.innerHTML = '';

            tituloMuroMemoriesData.forEach(memory => {
                const memoryDiv = document.createElement('div');
                memoryDiv.className = 'titulo-muro-memory';
                memoryDiv.style.left = `${memory.position.x}%`;
                memoryDiv.style.top = `${memory.position.y}%`;
                memoryDiv.style.transform = `rotate(${memory.rotation}deg)`;

                memoryDiv.innerHTML = `
                    <p class="titulo-muro-memory-text">${memory.text}</p>
                    <div class="titulo-muro-memory-footer">
                        <div class="titulo-muro-memory-date">
                            <svg class="titulo-muro-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12,6 12,12 16,14"></polyline>
                            </svg>
                            <span>${memory.date} - ${memory.time}</span>
                        </div>
                        <button class="titulo-muro-like-btn" onclick="tituloMuroLike(${memory.id})">
                            <svg class="titulo-muro-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                            <span>${memory.likes}</span>
                        </button>
                    </div>
                `;

                container.appendChild(memoryDiv);
            });
        }

        function tituloMuroShowForm() {
            document.getElementById('tituloMuroModal').classList.add('active');
        }

        function tituloMuroHideForm() {
            document.getElementById('tituloMuroModal').classList.remove('active');
            document.getElementById('tituloMuroTextarea').value = '';
        }

        function tituloMuroSubmit() {
            const textarea = document.getElementById('tituloMuroTextarea');
            const text = textarea.value.trim();

            if (text) {
                const now = new Date();
                const newMemory = {
                    id: Date.now(),
                    text: text,
                    date: now.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
                    time: now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
                    likes: 0,
                    position: tituloMuroGetRandomPosition(),
                    rotation: Math.random() * 6 - 3
                };

                tituloMuroMemoriesData.push(newMemory);
                tituloMuroRenderMemories();
                tituloMuroHideForm();
            }
        }

        function tituloMuroLike(id) {
            const memory = tituloMuroMemoriesData.find(m => m.id === id);
            if (memory) {
                memory.likes++;
                tituloMuroRenderMemories();
            }
        }

        // Cerrar modal al hacer clic fuera
        document.getElementById('tituloMuroModal').addEventListener('click', function(e) {
            if (e.target === this) {
                tituloMuroHideForm();
            }
        });

        // Inicializar
        tituloMuroRenderMemories();
