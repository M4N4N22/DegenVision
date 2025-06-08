"use client"

import React from "react"
import { Zap, Activity } from "lucide-react"
import { useBlockStream } from "@/hooks/useBlockStream" // adjust path if needed

const MAX_GAS = 30000000 // rough max gas limit on Ethereum block (30M)
const MAX_TX = 3000       // rough max tx count per block

export default function NetworkPulse() {
  const { blocks, loading, error } = useBlockStream()

  if (loading) return <div>Loading network pulse...</div>
  if (error)
    return (
      <div className="text-red-400 p-4">
        Error loading network pulse: {error.message}
      </div>
    )
  if (!blocks.length)
    return <div>No block data available for network pulse.</div>

  // Use the latest block for pulse
  const block = blocks[0]

  // Calculate intensity 0-100% based on gasUsed & txCount relative to max
  const gasIntensity = Math.min(1, block.gasUsed / MAX_GAS)
  const txIntensity = Math.min(1, block.txCount / MAX_TX)
  // Average the two metrics
  const intensity = (gasIntensity + txIntensity) / 2

  // Map intensity to color from green (calm) → yellow (moderate) → red (hot)
  const getColor = () => {
    if (intensity > 0.7) return "text-red-500"
    if (intensity > 0.4) return "text-yellow-400"
    return "text-green-400"
  }

  return (
    <div className="p-4 rounded-lg bg-gray-800/80 text-white max-w-sm mx-auto shadow-lg">
      <h3 className="mb-2 text-lg font-semibold flex items-center gap-2">
        <Activity className={`size-5 ${getColor()}`} />
        Network Activity Pulse
      </h3>

      <div className="mb-3">
        <div className="text-sm text-white/50 mb-1">Block #{block.blockNumber}</div>

        <div className="flex justify-between mb-1">
          <span className="flex items-center gap-1">
            <Zap className="size-4 text-yellow-400" /> Gas Used
          </span>
          <span>{block.gasUsed.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-1">
            <Zap className="size-4 text-blue-400" /> Transactions
          </span>
          <span>{block.txCount.toLocaleString()}</span>
        </div>
      </div>

      <div className="relative h-4 w-full rounded-full bg-gray-700">
        <div
          className={`h-4 rounded-full ${getColor()} transition-all duration-500 ease-in-out`}
          style={{ width: `${(intensity * 100).toFixed(1)}%` }}
        />
      </div>

      <p className="mt-2 text-sm text-gray-300">
        Network activity is{" "}
        <span className={`font-semibold ${getColor()}`}>
          {intensity > 0.7
            ? "High - Expect Volatility"
            : intensity > 0.4
            ? "Moderate"
            : "Low - Calm Market"}
        </span>
      </p>
    </div>
  )
}
