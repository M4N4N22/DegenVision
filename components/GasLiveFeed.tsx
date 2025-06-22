"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { GiPoisonGas, GiWhaleTail } from "react-icons/gi"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type GasSnapshot = {
  high: string
  average: string
  low: string
  baseFee: string
  latestBlock: string
}

type BlockIntel = {
  latestBlock: number
  txCount: number
  totalGasUsed: number
  avgPriorityFee: number
  contractTxRatio: number
  timestamp: number
}

export default function GasLiveFeed() {
  const [data, setData] = useState<GasSnapshot | null>(null)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [history, setHistory] = useState<{ time: string; average: number }[]>(
    []
  )
  const [blockIntel, setBlockIntel] = useState<BlockIntel | null>(null)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const fetchGas = async () => {
    const [gasRes, intelRes] = await Promise.all([
      fetch("/api/gas/price"),
      fetch("/api/gas/block-intel"),
    ])

    const gasJson: GasSnapshot = await gasRes.json()
    const intelJson: BlockIntel = await intelRes.json()

    setData(gasJson)
    setBlockIntel(intelJson) // ⬅️ Add new state hook for this

    const avgGwei = parseInt(gasJson.average) / 1e9
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })

    setHistory((prev) => [
      ...prev.slice(-19),
      { time, average: +avgGwei.toFixed(2) },
    ])
  }

  const subscribe = async () => {
    await fetchGas()
    setIsSubscribed(true)
    intervalRef.current = setInterval(fetchGas, 5000)
  }

  const unsubscribe = () => {
    setIsSubscribed(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const formatGwei = (wei: string | null) =>
    wei ? `${(parseInt(wei) / 1e9).toFixed(2)} Gwei` : "--"

  function IntelStat({
    label,
    value,
  }: {
    label: string
    value: string | number
  }) {
    return (
      <div className="p-4 bg-white/5 rounded-xl flex flex-col items-center">
        <div className="text-xs text-white/60">{label}</div>
        <div className="text-base font-bold text-white">{value}</div>
      </div>
    )
  }

  return (
    <div className="w-full  rounded-2xl p-6 shadow-xl ">
      <div className="flex gap-6 items-center justify-center py-8">
        <h2 className="text-3xl font-bold text-center tracking-tight flex items-center gap-2">
          <GiPoisonGas className="text-primary" /> Live Gas Feed
        </h2>

        <div className="flex justify-center">
          {!isSubscribed ? (
            <Button
              onClick={subscribe}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-black rounded-xl text-xl font-medium"
            >
              Subscribe
            </Button>
          ) : (
            <Button
              className="bg-primary hover:bg-primary/90 text-black rounded-xl text-xl font-medium"
              onClick={unsubscribe}
              size="sm"
              variant="destructive"
            >
              Unsubscribe
            </Button>
          )}
        </div>
      </div>
      <div className="space-y-10 ">
        {data ? (
          <div className="flex flex-col w-full items-center ">
            <motion.div
              className="flex justify-between items-start text-sm py-6 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Left side: Average */}
              <Stat
                label="Average"
                value={formatGwei(data.average)}
                color="text-emerald-400"
              />

              {/* Right side: High, Low, Base Fee */}
              <div className="flex ">
                <Stat
                  label="High"
                  value={formatGwei(data.high)}
                  color="text-red-500"
                />
                <Stat
                  label="Low"
                  value={formatGwei(data.low)}
                  color="text-blue-500"
                />
                <Stat
                  label="Base Fee"
                  value={formatGwei(data.baseFee)}
                  color="text-yellow-300"
                />
              </div>
            </motion.div>
            <div className="col-span-2 text-center  ">
              <div className="bg-white/5 rounded-full px-6 py-2">
                Block #{data.latestBlock}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground ">
            {isSubscribed ? "Fetching gas data..." : "Feed is paused."}
          </div>
        )}
       {blockIntel && typeof blockIntel.txCount === "number" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-white/80 ">
            <IntelStat
              label="Tx Count"
              value={blockIntel.txCount.toLocaleString()}
            />
            <IntelStat
              label="Total Gas Used"
              value={blockIntel.totalGasUsed.toLocaleString()}
            />
            <IntelStat
              label="Avg Priority Fee"
              value={`${(blockIntel.avgPriorityFee / 1e9).toFixed(2)} Gwei`}
            />
            <IntelStat
              label="Contract Tx Ratio"
              value={`${(blockIntel.contractTxRatio * 100).toFixed(1)}%`}
            />
          </div>
        )}

        {/* Chart Section */}
        {history.length > 1 && (
          <div className="pt-2">
            <h3 className="text-center text-sm text-muted-foreground mb-2 hidden">
              Average Gas Trend (Last {history.length} Points)
            </h3>
            <ResponsiveContainer width="100%" height={360}>
              <LineChart
                data={history}
                margin={{ top: 16, right: 16, bottom: 16, left: 0 }}
              >
                {/* Y Axis - Cleaned */}
                <YAxis
                  domain={["auto", "auto"]}
                  tick={{ fontSize: 14, fill: "#E5FFE9" }}
                  axisLine={false}
                  tickLine={false}
                />

                {/* X Axis - Spaced out + Cleaned */}
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 14, fill: "#E5FFE9", dy: 12 }}
                  interval={Math.floor(history.length / 6)}
                  axisLine={false}
                  tickLine={false}
                  minTickGap={20}
                />

                {/* Only vertical dashed lines */}
                <CartesianGrid vertical={false} horizontal stroke="#444" />

                {/* Tooltip */}
                <Tooltip
                  contentStyle={{ backgroundColor: "#111", border: "none" }}
                  labelStyle={{ color: "#FAFF2A", fontSize: 12 }}
                  itemStyle={{ color: "#A4FFD4", fontSize: 12 }}
                />

                {/* Line */}
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="#28FE93"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color: string
}) {
  return (
    <div className="flex items-center gap-3 p-3 px-6 rounded-xl shadow-inner">
      <span className="text-sm">{label}</span>
      <div
        className={cn(
          "font-medium text-sm bg-white/10 px-6 py-2 rounded-xl overflow-hidden min-w-[100px] h-[32px] flex items-center justify-center",
          color
        )}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={value} // Triggers animation on value change
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}
