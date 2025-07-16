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
  //console.log("🔍 Incoming logs to panel:", logs)
  const ethLogs = useMemo(() => {
    //console.log("🧠 Raw logs:", logs)

    const filtered = logs
      .filter((log) => log.source === "webhook" && Array.isArray(log.formatted))
      .flatMap((log) =>
        log.formatted.filter((msg: any) => {
          const tokenKey = msg.tokenAddress?.toLowerCase()
          return tokenKey && tokenKey in TOKEN_MAP
        })
      )

    //console.log("✅ Filtered token logs:", filtered)

    const sliced = filtered.slice(-10).reverse()
    //console.log("🎯 Final visible logs:", sliced)

    return sliced
  }, [logs])

  const visibleLogs = expanded ? ethLogs : ethLogs.slice(-1)

  return (
    <div className="bg-zinc-900 rounded-2xl p-2  shadow-sm">
      <div className="flex justify-between p-4">
        <div className="text-lg font-bold  ">USDT & WETH Transfers</div>

        <button
          className="text-sm bg-primary text-black font-semibold px-3 py-0.5 rounded-full transition-all"
          onClick={() => setExpanded((e) => !e)}
        >
          {expanded ? "Hide Last 10" : "Show Last 10"}
        </button>
      </div>

      <div className="space-y-3 ">
        {visibleLogs.map((msg: any, idx: number) => {
          const tokenKey =
            msg.tokenAddress?.toLowerCase() as keyof typeof TOKEN_MAP

          const tokenInfo = TOKEN_MAP[tokenKey] ?? {
            symbol: "UNKNOWN",
            decimals: 18,
          }

          return (
            <div
              key={msg.txHash + idx}
              className="bg-black rounded-xl p-6  space-y-2 "
            >
              <div className="text-primary font-semibold">
                {tokenInfo.symbol} Transfer
              </div>
              <div>
                <span className="text-zinc-400">From:</span> {shorten(msg.from)}
              </div>
              <div>
                <span className="text-zinc-400">To:</span> {shorten(msg.to)}
              </div>
              <div>
                <span className="text-zinc-400">Value:</span> {msg.value}
              </div>
              <div className="text-zinc-500 text-xs">
                Tx: {shorten(msg.txHash)} | Block: {msg.block}
                <br />
                {msg.timestamp ?? "Unknown time"}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
