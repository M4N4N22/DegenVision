import { useMemo, useState } from "react"
import { format } from "date-fns"

import { shorten } from "@/lib/utils" // or your own helper for shortening hashes

export default function EthMinedTxsPanel({ logs }: { logs: any[] }) {
  const [expanded, setExpanded] = useState(false)

  const minedLogs = useMemo(() => {
    const flatLogs = Array.isArray(logs[0]) ? logs.flat() : logs
    console.log("🧠 Flattened logs:", flatLogs)
  
    const filteredLogs = flatLogs.filter(
      (log) =>
        log.source === "webhook" &&
      log.raw?.eventType === "MINED_TRANSACTION" &&
        Array.isArray(log.raw?.event?.messages)
    )
  
    const parsed = filteredLogs.flatMap((log) =>
      log.raw.event.messages.map((msg: any) => ({
        from: msg.from_address,
        to: msg.to_address,
        hash: msg.hash,
        block: msg.block_number,
        timestamp: new Date(msg.block_timestamp * 1000).toLocaleString(),
        value: parseInt(msg.value, 16) / 1e18,
        gasUsed: msg.receipt_gas_used,
        status: msg.receipt_status === 1 ? "Success" : "Failed",
      }))
    )
  
    console.log("✅ Parsed mined logs:", parsed)
    return parsed.slice(-10).reverse()
  }, [logs])
  

  const visibleLogs = expanded ? minedLogs : minedLogs.slice(-1)

  return (
    <div className="bg-zinc-900 rounded-2xl p-2  shadow-sm">
     <div className="flex justify-between p-4">
        <div className="text-lg font-bold  ">Mined Transactions</div>

        <button
          className="text-sm bg-primary text-black font-semibold px-3 py-0.5 rounded-full transition-all"
          onClick={() => setExpanded((e) => !e)}
        >
          {expanded ? "Hide Last 10" : "Show Last 10"}
        </button>
      </div>

      <div className="space-y-3">
        {visibleLogs.map((msg: any, idx: number) => (
          <div
            key={msg.hash + idx}
            className="bg-black rounded-xl p-6  space-y-2 "
          >
            <div className="text-primary font-semibold">
            Mined Transaction
            </div>
            <div>
              <span className="text-zinc-400">From:</span> {shorten(msg.from)}
            </div>
            <div>
              <span className="text-zinc-400">To:</span> {shorten(msg.to)}
            </div>
            <div>
              <span className="text-zinc-400">Value:</span> {msg.value} ETH
            </div>
            <div>
              <span className="text-zinc-400">Gas Used:</span> {msg.gasUsed}
            </div>
            <div>
              <span className="text-zinc-400">Status:</span> {msg.status}
            </div>
            <div className="text-zinc-500 text-xs">
              Tx: {shorten(msg.hash)} | Block: {msg.block}
              <br />
              {msg.timestamp}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
