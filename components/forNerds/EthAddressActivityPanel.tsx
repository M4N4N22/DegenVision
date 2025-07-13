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

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 shadow-sm">
      <div className="text-lg font-bold text-yellow-400 mb-2">
        Ethereum – Address Activity
      </div>

      <button
        className="text-sm text-blue-400 underline mb-3"
        onClick={() => setExpanded((e) => !e)}
      >
        {expanded ? "Hide Recent" : "Show Last 10"}
      </button>

      <div className="space-y-3">
        {visibleLogs.map((msg: any, idx: number) => (
          <div
            key={msg.txHash + idx}
            className="bg-black rounded-lg p-3 text-sm space-y-1"
          >
            <div className="text-green-400 font-semibold">📡 Activity</div>
            <div>
              <span className="text-zinc-400">Token:</span>{" "}
              {msg.token || "UNKNOWN"}
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
        ))}
      </div>
    </div>
  )
}
