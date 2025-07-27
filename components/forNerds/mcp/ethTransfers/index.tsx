"use client"

import React, { useEffect, useState } from "react"
import TransferDonutChart from "./components/TransferDonutChart"

type Log = {
  from: string
  to: string
  value: number
  blockNumber: number
  txHash: string
}

export default function EthTransfers() {
  const [logs, setLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchLogs = async () => {
    console.log("[client] Fetching logs from /api/mcp/eth-logs...")
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/mcp/eth-logs")

      console.log("[client] Raw fetch response:", res)

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`)
      }

      const data = await res.json()
      console.log("[client] Parsed logs:", data)

      setLogs(data.logs)
    } catch (err: any) {
      console.error("[client] Error fetching logs:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  return (
    <div className="flex flex-col lg:flex-row gap-6">
  {/* Left: Transfers list */}
  <div className="flex-1 bg-zinc-900 rounded-2xl p-4 shadow-sm">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold">Latest ERC20 Transfers</h2>
      <span className="text-sm text-white/50 font-normal">
        Powered by Nodit MCP
      </span>
    </div>

    {loading && <p className="text-white/60">Loading logs...</p>}
    {error && <p className="text-red-500">Error: {error}</p>}

    <div className="space-y-3">
      {logs.map((log, index) => {
        const isBigTx = Number(log.value) > 100000

        return (
          <div
            key={log.txHash + index}
            className={`bg-black rounded-xl p-6 space-y-2 ${
              isBigTx ? "border-yellow-400" : "border-zinc-800"
            } border`}
          >
            {isBigTx && (
              <div className="text-yellow-400 text-xs font-bold uppercase">
                ⚡ Big Transaction
              </div>
            )}
            <div>
              <span className="text-zinc-400">From:</span>{" "}
              <span className="text-white">{log.from}</span>
            </div>
            <div>
              <span className="text-zinc-400">To:</span>{" "}
              <span className="text-white">{log.to}</span>
            </div>
            <div>
              <span className="text-zinc-400">Value:</span>{" "}
              <span className="text-primary font-semibold">{log.value}</span>
            </div>
            <div className="text-zinc-500 text-xs">
              Tx: {log.txHash} | Block: {log.blockNumber}
            </div>
          </div>
        )
      })}
    </div>
  </div>

  {/* Right: Donut chart */}
  <div className="w-full lg:w-[400px] bg-zinc-900 rounded-2xl p-4 shadow-sm h-fit">
    <h2 className="text-lg font-bold mb-4">Transfer Distribution</h2>
    {logs.length > 0 && <TransferDonutChart logs={logs} />}
  </div>
</div>

  )
}
