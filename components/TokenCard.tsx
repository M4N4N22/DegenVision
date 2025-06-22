"use client"

import { LineChart, Line, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function TokenCard({
  symbol,
  color,
  trendData,
  onSelect,
  selected = false,
  disabled = false,
}: {
  symbol: string
  color: string
  trendData: number[]
  onSelect?: () => void
  selected?: boolean
  disabled?: boolean
}) {
  const chartData = trendData.map((value, i) => ({ x: i, y: value }))
  const latestDelta = trendData.length > 1
    ? ((trendData.at(-1)! - trendData.at(-2)!) / trendData.at(-2)!) * 100
    : 0
  const trendColor = latestDelta >= 0 ? "text-green-400" : "text-red-400"
  const arrow = latestDelta >= 0 ? "▲" : "▼"

  return (
    <motion.button
 
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        "rounded-xl p-4 0 shadow-md w-full h-full text-black transition-all flex flex-col justify-between bg-white/5 border",
        selected ? "border-yellow-300" : "border-transparent hover:border-white/20",
        disabled && "opacity-50 pointer-events-none"
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg font-bold text-white">{symbol}</span>
        <span className={cn("text-xs font-medium", trendColor)}>
          {latestDelta.toFixed(1)}% {arrow}
        </span>
      </div>

      {/* Sparkline Chart */}
      <div className="h-20 w-full bg-white/5 rounded-xl p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="y"
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.button>
  )
}
