"use client"

import { useEffect, useState } from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export type StatPoint = { date: string; count: number }
export type StatsData = {
  txStats: StatPoint[]
  accStats: StatPoint[]
  timestamp: number
}

export default function GasNetworkStats() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchStats = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/gas/network-stats")
      const json = await res.json()
      setStats(json)
    } catch (err) {
      console.error("Failed to fetch stats:", err)
    } finally {
      setLoading(false)
    }
  }

  const txNow = stats?.txStats.at(-1)?.count ?? 0
  const txPrev = stats?.txStats.at(-2)?.count ?? 0
  const accNow = stats?.accStats.at(-1)?.count ?? 0

  const txDelta = txNow - txPrev
  const isVolatile = txDelta > 50000

  return (
    <div className="w-full max-w-md mx-auto p-5 rounded-2xl bg-muted text-foreground shadow-md space-y-4 hidden">
      <h2 className="text-center text-lg font-bold tracking-tight">
        📊 Daily Network Activity
      </h2>

      <div className="flex justify-center">
        <Button onClick={fetchStats} disabled={loading} size="sm">
          🔄 {loading ? "Fetching..." : "Refresh Stats"}
        </Button>
      </div>

      {stats ? (
        <div className="grid gap-3 text-sm">
          <Stat label="📅 Tx (Yesterday)" value={txNow.toLocaleString()} />
          <Stat label="👥 Active Accounts" value={accNow.toLocaleString()} />
          <Stat
            label="⚠️ Volatility"
            value={
              <Badge
                className={`px-2 py-1 rounded-md text-xs font-medium ${
                  isVolatile
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {isVolatile ? "High" : "Stable"}
              </Badge>
            }
          />
        </div>
      ) : (
        <p className="text-center text-sm text-muted-foreground italic">
          Stats not loaded
        </p>
      )}

      {stats && (
        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={stats.txStats}
              margin={{ top: 20, right: 10, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" fontSize={10} tick={{ fill: "#aaa" }} />
              <YAxis fontSize={12} tick={{ fill: "#aaa" }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#FAFF2A"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

function Stat({
  label,
  value,
}: {
  label: string
  value: string | number | React.ReactNode
}) {
  return (
    <div className="flex justify-between items-center px-3 py-2 bg-background rounded-lg shadow-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
