"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function VirusIllustration() {
  const [showMask, setShowMask] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="mb-8">
        <Button
          onClick={() => setShowMask(!showMask)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          {showMask ? "Remove Mask" : "Add Mask"}
        </Button>
      </div>

      <div className="relative">
        <svg
          width="512"
          height="512"
          viewBox="0 0 512 512"
          className="drop-shadow-lg"
          style={{ filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.1))" }}
        >
          {/* Background circle for contrast */}
          <circle cx="256" cy="256" r="240" fill="white" opacity="0.8" />

          {/* Main virus body */}
          <circle cx="256" cy="256" r="120" fill="#4A90E2" stroke="#357ABD" strokeWidth="3" />

          {/* Virus spikes - distributed around the circumference */}
          {Array.from({ length: 24 }, (_, i) => {
            const angle = (i * 360) / 24
            const radian = (angle * Math.PI) / 180
            const spikeLength = 25 + Math.random() * 15
            const baseX = 256 + Math.cos(radian) * 120
            const baseY = 256 + Math.sin(radian) * 120
            const tipX = 256 + Math.cos(radian) * (120 + spikeLength)
            const tipY = 256 + Math.sin(radian) * (120 + spikeLength)

            return (
              <g key={i}>
                {/* Spike stem */}
                <line
                  x1={baseX}
                  y1={baseY}
                  x2={tipX}
                  y2={tipY}
                  stroke="#357ABD"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                {/* Spike tip */}
                <circle cx={tipX} cy={tipY} r="8" fill="#E74C3C" stroke="#C0392B" strokeWidth="2" />
              </g>
            )
          })}

          {/* Inner virus details */}
          <circle cx="256" cy="256" r="80" fill="none" stroke="#357ABD" strokeWidth="2" opacity="0.3" />

          <circle cx="256" cy="256" r="50" fill="none" stroke="#357ABD" strokeWidth="1" opacity="0.2" />

          {/* RNA strands representation */}
          <path
            d="M 200 256 Q 228 230 256 256 Q 284 282 312 256"
            fill="none"
            stroke="#2C5F8B"
            strokeWidth="3"
            opacity="0.6"
          />

          <path
            d="M 200 240 Q 228 214 256 240 Q 284 266 312 240"
            fill="none"
            stroke="#2C5F8B"
            strokeWidth="2"
            opacity="0.4"
          />

          <path
            d="M 200 272 Q 228 246 256 272 Q 284 298 312 272"
            fill="none"
            stroke="#2C5F8B"
            strokeWidth="2"
            opacity="0.4"
          />

          {/* Surgical mask overlay - only visible when showMask is true */}
          {showMask && (
            <g className="transition-opacity duration-300">
              {/* Mask body */}
              <path
                d="M 180 220 Q 256 200 332 220 L 332 280 Q 256 300 180 280 Z"
                fill="#E8F4FD"
                stroke="#B8D4EA"
                strokeWidth="2"
              />

              {/* Mask pleats */}
              <line x1="190" y1="235" x2="322" y2="235" stroke="#B8D4EA" strokeWidth="1" opacity="0.6" />
              <line x1="185" y1="250" x2="327" y2="250" stroke="#B8D4EA" strokeWidth="1" opacity="0.6" />
              <line x1="190" y1="265" x2="322" y2="265" stroke="#B8D4EA" strokeWidth="1" opacity="0.6" />

              {/* Ear loops */}
              <path
                d="M 180 240 Q 140 240 140 250 Q 140 260 180 260"
                fill="none"
                stroke="#B8D4EA"
                strokeWidth="3"
                strokeLinecap="round"
              />

              <path
                d="M 332 240 Q 372 240 372 250 Q 372 260 332 260"
                fill="none"
                stroke="#B8D4EA"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Mask highlight */}
              <path d="M 190 225 Q 256 210 322 225 L 322 235 Q 256 220 190 235 Z" fill="white" opacity="0.3" />
            </g>
          )}
        </svg>
      </div>

      <div className="mt-8 text-center max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">COVID-19 Virus Illustration</h2>
        <p className="text-gray-600">
          Click the button above to toggle between the virus with and without a protective mask. The illustration
          features a clean, vector-style design with smooth animations.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
        <div className="text-center">
          <div className="font-semibold">Version 1</div>
          <div>Virus only</div>
        </div>
        <div className="text-center">
          <div className="font-semibold">Version 2</div>
          <div>Virus with surgical mask</div>
        </div>
      </div>
    </div>
  )
}
