"use client"

import { useMemo, useState } from "react"
import { format } from "date-fns"

import { shorten } from "@/lib/utils"

export default function EthAddressActivityPanel({ logs }: { logs: any[] }) {
  const [expanded, setExpanded] = useState(false)

  const activityLogs = useMemo(() => {
    return logs
      .filter((log) => log.type === "address_activity" && log.formatted?.length)
      .flatMap((log) => log.formatted)
      .slice(-10)
      .reverse()
  }, [logs])

  const visibleLogs = expanded ? activityLogs : activityLogs.slice(-1)

  const isBigTransaction = (value: string | number) => {
    const numValue = typeof value === "string" ? parseFloat(value.replace(/[^0-9.]/g, "")) : value
    return numValue > 10 
  }

  return (
    <div className="bg-zinc-900 rounded-2xl p-2  shadow-sm">
      <div className="flex justify-between p-4">
        <div className="text-lg font-bold  ">Address Activity</div>

        <button
          className="text-sm bg-primary text-black font-semibold px-3 py-0.5 rounded-full transition-all"
          onClick={() => setExpanded((e) => !e)}
        >
          {expanded ? "Hide Last 10" : "Show Last 10"}
        </button>
      </div>
      <div className="space-y-3">
      {visibleLogs.map((msg: any, idx: number) => {
          const bigTx = isBigTransaction(msg.value)
          return (
            <div
              key={msg.txHash + idx}
              className={`bg-black rounded-xl p-6  space-y-2  ${
                bigTx ? "border-yellow-400" : "border-zinc-800"
              }`}
            >
              {bigTx && (
                <div className="text-yellow-400 text-xs font-bold uppercase">
                  ⚡ Big Transaction
                </div>
              )}
              <div>
                <span className="text-zinc-400">Token:</span>{" "}
                <span className="text-primary font-semibold">{msg.token || "UNKNOWN"}</span>
              </div>
              <div>
                <span className="text-zinc-400">From:</span> {msg.from}
              </div>
              <div>
                <span className="text-zinc-400">To:</span> {msg.to}
              </div>
              <div>
                <span className="text-zinc-400">Value:</span> {msg.value}
              </div>
              <div className="text-zinc-500 text-xs">
                Tx: {msg.txHash} | Block: {msg.block}
                <br />
                {msg.timestamp}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
