"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"

export default function VirusPortada() {
  const [currentView, setCurrentView] = useState<"sin-barbijo" | "con-barbijo">("sin-barbijo")
  const svgRef = useRef<SVGSVGElement>(null)

  const downloadImage = (version: "sin-barbijo" | "con-barbijo") => {
    const svg = svgRef.current
    if (!svg) return

    // Crear una copia del SVG para exportar
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    canvas.width = 1000
    canvas.height = 1000

    img.onload = () => {
      if (ctx) {
        // Fondo blanco puro
        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(0, 0, 1000, 1000)

        ctx.drawImage(img, 0, 0, 1000, 1000)

        // Descargar como PNG
        const link = document.createElement("a")
        link.download = `covid-virus-${version}.png`
        link.href = canvas.toDataURL("image/png")
        link.click()
      }
    }

    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(svgBlob)
    img.src = url
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <div className="mb-8 flex gap-4">
        <Button
          onClick={() => setCurrentView("sin-barbijo")}
          variant={currentView === "sin-barbijo" ? "default" : "outline"}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Sin Barbijo
        </Button>
        <Button
          onClick={() => setCurrentView("con-barbijo")}
          variant={currentView === "con-barbijo" ? "default" : "outline"}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Con Barbijo
        </Button>
      </div>

      <div className="relative bg-white border border-gray-200 rounded-lg p-8">
        <svg ref={svgRef} width="500" height="500" viewBox="0 0 1000 1000" className="bg-white">
          {/* Definiciones de gradientes para efecto 3D */}
          <defs>
            {/* Gradiente principal del virus */}
            <radialGradient id="virusGradient" cx="0.3" cy="0.3" r="0.8">
              <stop offset="0%" stopColor="#7BB3F0" />
              <stop offset="40%" stopColor="#4A90E2" />
              <stop offset="80%" stopColor="#2E5F8A" />
              <stop offset="100%" stopColor="#1A4B73" />
            </radialGradient>

            {/* Gradiente para las espigas */}
            <radialGradient id="spikeGradient" cx="0.3" cy="0.3" r="0.7">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="60%" stopColor="#E74C3C" />
              <stop offset="100%" stopColor="#C0392B" />
            </radialGradient>

            {/* Gradiente para el barbijo */}
            <linearGradient id="maskGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F0F8FF" />
              <stop offset="50%" stopColor="#E1F0FF" />
              <stop offset="100%" stopColor="#D1E8FF" />
            </linearGradient>

            {/* Filtro para efecto de profundidad */}
            <filter id="depth" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
              <feOffset dx="2" dy="2" result="offset" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Cuerpo principal del virus */}
          <circle cx="500" cy="500" r="180" fill="url(#virusGradient)" filter="url(#depth)" />

          {/* Espigas del virus - distribuidas de forma natural */}
          {Array.from({ length: 32 }, (_, i) => {
            const angle = (i * 360) / 32 + (Math.random() - 0.5) * 20
            const radian = (angle * Math.PI) / 180
            const spikeLength = 35 + Math.random() * 25
            const baseRadius = 180
            const baseX = 500 + Math.cos(radian) * baseRadius
            const baseY = 500 + Math.sin(radian) * baseRadius
            const tipX = 500 + Math.cos(radian) * (baseRadius + spikeLength)
            const tipY = 500 + Math.sin(radian) * (baseRadius + spikeLength)
            const midX = 500 + Math.cos(radian) * (baseRadius + spikeLength * 0.7)
            const midY = 500 + Math.sin(radian) * (baseRadius + spikeLength * 0.7)

            return (
              <g key={i}>
                {/* Tallo de la espiga */}
                <line
                  x1={baseX}
                  y1={baseY}
                  x2={midX}
                  y2={midY}
                  stroke="#2E5F8A"
                  strokeWidth="8"
                  strokeLinecap="round"
                  opacity="0.8"
                />
                {/* Cabeza de la espiga */}
                <circle cx={tipX} cy={tipY} r="12" fill="url(#spikeGradient)" filter="url(#depth)" />
                {/* Detalle interno de la espiga */}
                <circle cx={tipX - 2} cy={tipY - 2} r="4" fill="#FF8A8A" opacity="0.6" />
              </g>
            )
          })}

          {/* Detalles internos del virus */}
          <circle cx="500" cy="500" r="120" fill="none" stroke="#2E5F8A" strokeWidth="2" opacity="0.2" />
          <circle cx="500" cy="500" r="80" fill="none" stroke="#2E5F8A" strokeWidth="1" opacity="0.15" />

          {/* Estructura interna tipo ARN */}
          <g opacity="0.3">
            <path
              d="M 400 500 Q 450 450 500 500 Q 550 550 600 500"
              fill="none"
              stroke="#1A4B73"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 400 480 Q 450 430 500 480 Q 550 530 600 480"
              fill="none"
              stroke="#1A4B73"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M 400 520 Q 450 470 500 520 Q 550 570 600 520"
              fill="none"
              stroke="#1A4B73"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>

          {/* Barbijo quirúrgico - solo visible en la segunda versión */}
          {currentView === "con-barbijo" && (
            <g className="transition-opacity duration-500">
              {/* Cuerpo principal del barbijo */}
              <path
                d="M 320 420 Q 500 380 680 420 L 680 520 Q 500 560 320 520 Z"
                fill="url(#maskGradient)"
                stroke="#B8D4EA"
                strokeWidth="3"
                filter="url(#depth)"
              />

              {/* Pliegues del barbijo */}
              <line x1="340" y1="440" x2="660" y2="440" stroke="#B8D4EA" strokeWidth="2" opacity="0.4" />
              <line x1="330" y1="470" x2="670" y2="470" stroke="#B8D4EA" strokeWidth="2" opacity="0.4" />
              <line x1="340" y1="500" x2="660" y2="500" stroke="#B8D4EA" strokeWidth="2" opacity="0.4" />

              {/* Elásticos laterales */}
              <path
                d="M 320 450 Q 250 450 250 470 Q 250 490 320 490"
                fill="none"
                stroke="#A0C4E0"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M 680 450 Q 750 450 750 470 Q 750 490 680 490"
                fill="none"
                stroke="#A0C4E0"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Reflejos del barbijo para efecto 3D */}
              <path d="M 340 425 Q 500 390 660 425 L 660 440 Q 500 405 340 440 Z" fill="white" opacity="0.4" />

              {/* Textura sutil del material */}
              <g opacity="0.1">
                {Array.from({ length: 8 }, (_, i) => (
                  <line
                    key={i}
                    x1={350 + i * 40}
                    y1="430"
                    x2={350 + i * 40}
                    y2="510"
                    stroke="#B8D4EA"
                    strokeWidth="1"
                  />
                ))}
              </g>
            </g>
          )}
        </svg>
      </div>

      <div className="mt-8 flex gap-4">
        <Button
          onClick={() => downloadImage("sin-barbijo")}
          variant="outline"
          className="border-blue-600 text-blue-600 hover:bg-blue-50"
        >
          Descargar Sin Barbijo (PNG)
        </Button>
        <Button
          onClick={() => downloadImage("con-barbijo")}
          variant="outline"
          className="border-blue-600 text-blue-600 hover:bg-blue-50"
        >
          Descargar Con Barbijo (PNG)
        </Button>
      </div>

      <div className="mt-6 text-center max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Imágenes para Portada Web COVID-19</h2>
        <p className="text-gray-600 text-sm">
          Dos versiones perfectamente alineadas del virus SARS-CoV-2 para animación de scrollytelling. Fondo blanco
          puro, estilo editorial profesional, resolución 1000×1000px.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-8 text-xs text-gray-500 max-w-md">
        <div className="text-center">
          <div className="font-semibold">Imagen 1</div>
          <div>Virus solo</div>
          <div>Para inicio de animación</div>
        </div>
        <div className="text-center">
          <div className="font-semibold">Imagen 2</div>
          <div>Virus con barbijo</div>
          <div>Para final de animación</div>
        </div>
      </div>
    </div>
  )
}
