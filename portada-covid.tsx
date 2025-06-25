"use client"

import { useState, useEffect } from "react"

export default function PortadaCovid() {
  const [scrollY, setScrollY] = useState(0)
  const [maskOpacity, setMaskOpacity] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      // El barbijo aparece solo en el virus principal
      const maskStart = 200
      const maskEnd = 600

      if (currentScrollY < maskStart) {
        setMaskOpacity(0)
      } else if (currentScrollY > maskEnd) {
        setMaskOpacity(1)
      } else {
        const progress = (currentScrollY - maskStart) / (maskEnd - maskStart)
        setMaskOpacity(progress)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Virus pequeño de fondo (sin barbijo, desenfocado)
  const createBackgroundVirus = (size: number, x: number, y: number, id: string) => {
    const radius = size / 2
    const spikeCount = 16

    return (
      <g key={id} transform={`translate(${x}, ${y})`} style={{ filter: "blur(3px)", opacity: 0.4 }}>
        <defs>
          <radialGradient id={`bgVirusGrad${id}`} cx="0.3" cy="0.3" r="0.8">
            <stop offset="0%" stopColor="#E6F3FF" />
            <stop offset="40%" stopColor="#B8E0FF" />
            <stop offset="70%" stopColor="#87CEEB" />
            <stop offset="100%" stopColor="#6BB6FF" />
          </radialGradient>
        </defs>

        {/* Cuerpo del virus */}
        <circle cx="0" cy="0" r={radius} fill={`url(#bgVirusGrad${id})`} stroke="#87CEEB" strokeWidth="1" />

        {/* Espigas */}
        {Array.from({ length: spikeCount }, (_, i) => {
          const angle = (i * 360) / spikeCount
          const radian = (angle * Math.PI) / 180
          const spikeLength = radius * 0.5
          const baseX = Math.cos(radian) * radius
          const baseY = Math.sin(radian) * radius
          const tipX = Math.cos(radian) * (radius + spikeLength)
          const tipY = Math.sin(radian) * (radius + spikeLength)

          return (
            <g key={i}>
              <line x1={baseX} y1={baseY} x2={tipX} y2={tipY} stroke="#87CEEB" strokeWidth="2" strokeLinecap="round" />
              <circle cx={tipX} cy={tipY} r={radius * 0.12} fill="#B8E0FF" />
            </g>
          )
        })}
      </g>
    )
  }

  return (
    <div className="min-h-[200vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Título principal */}
      <div className="fixed top-8 left-0 right-0 z-20 pointer-events-none">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent drop-shadow-sm">
              COVID-19
            </span>
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-2xl md:text-3xl lg:text-4xl font-light text-blue-600/80 tracking-wide">
            Una Historia Global
          </p>
          <p className="text-sm md:text-base text-blue-500/60 mt-4 max-w-2xl mx-auto">
            Desliza para ver cómo la protección hace la diferencia
          </p>
        </div>
      </div>

      {/* SVG con todos los virus */}
      <svg width="100%" height="100%" className="fixed inset-0 z-10" style={{ minHeight: "100vh" }}>
        <defs>
          {/* Gradientes para el virus principal */}
          <radialGradient id="mainVirusGradient" cx="0.3" cy="0.3" r="0.8">
            <stop offset="0%" stopColor="#E6F3FF" />
            <stop offset="25%" stopColor="#B8E0FF" />
            <stop offset="50%" stopColor="#87CEEB" />
            <stop offset="75%" stopColor="#6BB6FF" />
            <stop offset="100%" stopColor="#4A90E2" />
          </radialGradient>

          <radialGradient id="mainSpikeGradient" cx="0.2" cy="0.2" r="0.9">
            <stop offset="0%" stopColor="#E6F3FF" />
            <stop offset="40%" stopColor="#B8E0FF" />
            <stop offset="70%" stopColor="#87CEEB" />
            <stop offset="100%" stopColor="#6BB6FF" />
          </radialGradient>

          <linearGradient id="maskGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F8FBFF" />
            <stop offset="50%" stopColor="#E8F4FD" />
            <stop offset="100%" stopColor="#D6EFFF" />
          </linearGradient>

          {/* Filtro de textura para el virus principal */}
          <filter id="virusTexture" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.8" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
          </filter>

          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="3" dy="6" stdDeviation="8" floodColor="#4A90E2" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Virus pequeños de fondo - desenfocados */}
        {Array.from({ length: 12 }, (_, i) => {
          const size = 40 + Math.random() * 30
          const x = Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200)
          const y = 100 + Math.random() * (typeof window !== "undefined" ? window.innerHeight - 200 : 600)
          return createBackgroundVirus(size, x, y, `bg${i}`)
        })}

        {/* Virus principal - centrado debajo del título */}
        <g transform={`translate(${typeof window !== "undefined" ? window.innerWidth / 2 : 600}, 450)`}>
          {/* Cuerpo principal del virus - siguiendo exactamente tu imagen */}
          <circle
            cx="0"
            cy="0"
            r="100"
            fill="url(#mainVirusGradient)"
            stroke="#6BB6FF"
            strokeWidth="2"
            filter="url(#virusTexture)"
          />

          {/* Espigas exactamente como en tu imagen - forma de bastón */}
          {Array.from({ length: 20 }, (_, i) => {
            const angle = (i * 360) / 20 + (i % 2) * 18
            const radian = (angle * Math.PI) / 180
            const spikeLength = 35 + (i % 3) * 8
            const baseX = Math.cos(radian) * 100
            const baseY = Math.sin(radian) * 100
            const midX = Math.cos(radian) * (100 + spikeLength * 0.7)
            const midY = Math.sin(radian) * (100 + spikeLength * 0.7)
            const tipX = Math.cos(radian) * (100 + spikeLength)
            const tipY = Math.sin(radian) * (100 + spikeLength)

            return (
              <g key={i}>
                {/* Tallo de la espiga */}
                <line
                  x1={baseX}
                  y1={baseY}
                  x2={midX}
                  y2={midY}
                  stroke="#6BB6FF"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                {/* Cabeza tipo bastón - más ancha en la punta como en tu imagen */}
                <ellipse
                  cx={tipX}
                  cy={tipY}
                  rx="14"
                  ry="9"
                  fill="url(#mainSpikeGradient)"
                  transform={`rotate(${angle} ${tipX} ${tipY})`}
                  stroke="#4A90E2"
                  strokeWidth="1"
                  filter="url(#softShadow)"
                />

                {/* Brillo en la cabeza */}
                <ellipse
                  cx={tipX - 3}
                  cy={tipY - 2}
                  rx="5"
                  ry="3"
                  fill="#F0F8FF"
                  opacity="0.8"
                  transform={`rotate(${angle} ${tipX - 3} ${tipY - 2})`}
                />
              </g>
            )
          })}

          {/* Detalles internos del virus */}
          <circle cx="0" cy="0" r="70" fill="none" stroke="#6BB6FF" strokeWidth="1" opacity="0.3" />
          <circle cx="0" cy="0" r="45" fill="none" stroke="#6BB6FF" strokeWidth="1" opacity="0.2" />

          {/* Barbijo que aparece SOLO en el virus principal */}
          <g style={{ opacity: maskOpacity }} className="transition-opacity duration-500">
            <path
              d="M -80 -30 Q 0 -50 80 -30 L 80 30 Q 0 50 -80 30 Z"
              fill="url(#maskGradient)"
              stroke="#B8D4EA"
              strokeWidth="3"
              filter="url(#softShadow)"
            />

            {/* Pliegues del barbijo */}
            <line x1="-60" y1="-10" x2="60" y2="-10" stroke="#B8D4EA" strokeWidth="2" opacity="0.6" />
            <line x1="-70" y1="0" x2="70" y2="0" stroke="#B8D4EA" strokeWidth="2" opacity="0.6" />
            <line x1="-60" y1="10" x2="60" y2="10" stroke="#B8D4EA" strokeWidth="2" opacity="0.6" />

            {/* Elásticos laterales */}
            <path
              d="M -80 -10 Q -120 -10 -120 0 Q -120 10 -80 10"
              fill="none"
              stroke="#A0C4E0"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 80 -10 Q 120 -10 120 0 Q 120 10 80 10"
              fill="none"
              stroke="#A0C4E0"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Reflejos del barbijo */}
            <path d="M -70 -35 Q 0 -45 70 -35 L 70 -20 Q 0 -30 -70 -20 Z" fill="white" opacity="0.4" />
          </g>
        </g>
      </svg>

      {/* Indicador de scroll */}
      <div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-blue-400 z-30 transition-opacity duration-500"
        style={{ opacity: scrollY < 100 ? 1 : 0 }}
      >
        <div className="text-center animate-bounce">
          <div className="text-sm mb-3 font-medium">Desliza hacia abajo</div>
          <div className="w-6 h-10 border-2 border-blue-400 rounded-full mx-auto flex justify-center bg-white/20 backdrop-blur-sm">
            <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Indicador de progreso del barbijo */}
      <div className="fixed bottom-8 right-8 z-30">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-blue-100">
          <div className="text-sm font-semibold text-blue-700 mb-3">Protección</div>
          <div className="w-20 h-3 bg-blue-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 transition-all duration-300 rounded-full"
              style={{ width: `${maskOpacity * 100}%` }}
            />
          </div>
          <div className="text-xs text-blue-600 mt-2 font-medium">{Math.round(maskOpacity * 100)}%</div>
        </div>
      </div>

      {/* Barra de progreso superior */}
      <div className="fixed top-0 left-0 w-full h-1 bg-blue-100/50 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 transition-all duration-300"
          style={{ width: `${Math.min((scrollY / (window.innerHeight * 1.5)) * 100, 100)}%` }}
        />
      </div>
    </div>
  )
}
