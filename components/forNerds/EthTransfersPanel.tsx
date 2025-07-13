"use client"

import { useMemo, useState } from "react"
import { format } from "date-fns"

import { shorten } from "@/lib/utils"

const TOKEN_MAP = {
  "0xdac17f958d2ee523a2206206994597c13d831ec7": { symbol: "USDT", decimals: 6 },
  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": {
    symbol: "WETH",
    decimals: 18,
  },
} as const

export default function EthTransfersPanel({ logs }: { logs: any[] }) {
  const [expanded, setExpanded] = useState(false)

  const ethLogs = useMemo(() => {
    const seenTxs = new Set<string>()

    return logs
      .filter(
        (log) =>
          log.source === "webhook" &&
          log.eventType === "TOKEN_TRANSFER" &&
          log.raw?.event?.messages?.some(
            (m: any) => m.token_address?.toLowerCase() in TOKEN_MAP
          )
      )
      .flatMap((log) => log.raw.event.messages)
      .filter((msg: any) => {
        const key = msg.transaction_hash + msg.token_address
        if (seenTxs.has(key)) return false
        seenTxs.add(key)
        return msg.token_address?.toLowerCase() in TOKEN_MAP
      })
      .slice(-10)
      .reverse()
  }, [logs])

  const visibleLogs = expanded ? ethLogs : ethLogs.slice(-1)

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 shadow-sm">
      <div className="text-lg font-bold text-yellow-400 mb-2">
        Ethereum Mainnet – USDT & WETH Transfers
      </div>

      <button
        className="text-sm text-blue-400 underline mb-3"
        onClick={() => setExpanded((e) => !e)}
      >
        {expanded ? "Hide Recent" : "Show Last 10"}
      </button>

      <div className="space-y-3">
        {visibleLogs.map((msg: any, idx: number) => {
          const tokenKey =
            msg.token_address?.toLowerCase() as keyof typeof TOKEN_MAP
          const tokenInfo = TOKEN_MAP[tokenKey] ?? {
            symbol: "UNKNOWN",
            decimals: 18,
          }

          const valueReadable = Number(msg.value) / 10 ** tokenInfo.decimals

          return (
            <div
              key={msg.transaction_hash + idx}
              className="bg-black rounded-lg p-3 text-sm space-y-1"
            >
              <div className="text-green-400 font-semibold">
                🔁 {tokenInfo.symbol} Transfer
              </div>
              <div>
                <span className="text-zinc-400">From:</span>{" "}
                {shorten(msg.from_address)}
              </div>
              <div>
                <span className="text-zinc-400">To:</span>{" "}
                {shorten(msg.to_address)}
              </div>
              <div>
                <span className="text-zinc-400">Value:</span> {valueReadable}
              </div>
              <div className="text-zinc-500 text-xs">
                Tx: {shorten(msg.transaction_hash)} | Block: {msg.block_number}
                <br />
                {format(
                  new Date(msg.block_timestamp * 1000),
                  "yyyy-MM-dd HH:mm:ss"
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
