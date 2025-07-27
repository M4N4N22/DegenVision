"use client"

import React from "react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

type Log = {
  from: string
  to: string
  value: number
  blockNumber: number
  txHash: string
}

const COLORS = [
  "#FAFF2A",
  "#FDBA74",
  "#60A5FA",
  "#34D399",
  "#F472B6",
  "#F87171",
  "#A78BFA",
  "#FACC15",
]

export default function TransferDonutChart({ logs }: { logs: Log[] }) {
  const aggregated = logs.reduce((acc, log) => {
    acc[log.to] = (acc[log.to] || 0) + log.value
    return acc
  }, {} as Record<string, number>)

  const chartData = Object.entries(aggregated)
    .map(([to, value]) => ({ name: to, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8) // top 8 recipients

  return (
    <div className="bg-zinc-900 rounded-2xl p-4 shadow-sm mt-8">
      <h3 className="text-lg font-bold mb-2">Top Recipients by ETH Transferred</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
            nameKey="name"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", color: "white" }}
            formatter={(value: number) => `${value} ETH`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
