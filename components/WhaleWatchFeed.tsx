"use client"

import React, { useEffect, useState } from "react"
import { Plug, PlugZap } from "lucide-react"

import { useNoditConnection } from "@/hooks/useNoditConnection"
import { useWhaleStream } from "@/hooks/useWhaleStream"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface WhaleTx {
  txHash: string
  from: string
  to: string
  value: number
  blockNumber: number
  timestamp?: number
}

interface Props {
  whales: WhaleTx[]
  connected: boolean
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  loading: boolean
  connectionError?: Error
  whalesError?: Error
}

function truncateAddress(address: string, length = 8) {
  if (!address) return ""
  return `${address.slice(0, length)}...${address.slice(-4)}`
}

function getAmountTag(value: number) {
  if (value >= 5000) return { label: "Large", color: "red" }
  if (value >= 1000) return { label: "Medium", color: "yellow" }
  return { label: "Small", color: "green" }
}

export default function WhaleWatchFeed({
  whales,
  connected,
  connect,
  disconnect,
  loading,
  connectionError,
  whalesError,
}: Props) {
  const isProduction = process.env.NEXT_PUBLIC_IS_PROD === "true"

  const handleToggle = async () => {
    if (connected) {
      await disconnect()
    } else {
      if (!isProduction) {
        await connect()
      } else {
        console.log("Subscribe disabled in production - mock data only.")
      }
    }
  }

  const [formattedTimestamps, setFormattedTimestamps] = useState<
    Record<string, string>
  >({})

  useEffect(() => {
    const map: Record<string, string> = {}
    whales.forEach((tx) => {
      if (tx.timestamp) {
        map[tx.txHash] = new Date(tx.timestamp).toLocaleString()
      }
    })
    setFormattedTimestamps(map)
  }, [whales])

  return (
    <div className="p-">
      <div className=" flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          <div
            className={`h-3 w-3 rounded-full ${
              connected ? "bg-green-500 animate-pulse" : "bg-red-400"
            }`}
          />
          <h2 className="text-xl font-bold text-white">
            Recent USDT Transfers
          </h2>
        </div>
        <p className="text-sm text-yellow-400 italic">
          Mock Data — Under Production
        </p>
        <div className="flex items-center gap-4">
          <Badge
            variant="outline"
            className={`border-green-500/20 ${
              connected
                ? "bg-green-500/10 text-green-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {connected ? "Streaming" : "Paused"}
          </Badge>

          {!isProduction && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleToggle}
              className="flex items-center gap-2 rounded-3xl"
            >
              {connected ? (
                <>
                  <Plug className="h-4 w-4" />
                  Unsubscribe
                </>
              ) : (
                <>
                  <PlugZap className="h-4 w-4" />
                  Subscribe
                </>
              )}
            </Button>
          )}
        </div>
      </div>
      {isProduction && (
        <p className="text-sm text-white/70 mt-2 max-w-md mb-6">
          To see real transfers and live action, check the demo video on{" "}
          <a
            href="https://github.com/M4N4N22/degenvision"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            GitHub
          </a>
          .
        </p>
      )}
      {loading && (
        <div className="text-white p-6">Loading whale transfers...</div>
      )}

      {(whalesError || connectionError) && (
        <div className="text-red-400 p-6">
          Error loading transfers: {(whalesError || connectionError)?.message}
        </div>
      )}

      {!loading && !whales.length && connected && (
        <div className="text-white p-6">
          No whale transfers detected at the moment.
        </div>
      )}

      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {whales.slice(0, 20).map((tx, index) => {
          const { label, color } = getAmountTag(tx.value)

          return (
            <div
              key={tx.txHash}
              className="rounded-3xl bg-white/5"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center sm:flex-row h-full sm:justify-between gap-4">
                {/* Left: Amount + Badge */}
                <div className="flex justify-between flex-col items-start gap-5 min-w-[240px] p-6">
                  <Badge
                    variant="secondary"
                    className={`mb-2 border-${color}-500 text-${color}-400`}
                  >
                    {label}
                  </Badge>
                  <div className="text-3xl sm:text-4xl font-bold text-primary leading-tight">
                    {tx.value.toLocaleString()}{" "}
                    <span className="text-base font-normal text-white/70">
                      USDT
                    </span>
                  </div>
                </div>

                {/* Right: Tx Info */}
                <div className="flex-1 space-y-1 bg-white/5 rounded-r-3xl border-l-0 p-4">
                  <div className="flex gap-4">
                    <span className="text-white/60 text-sm min-w-[70px]">
                      From
                    </span>
                    <span className="text-emerald-300 font-mono text-base">
                      {truncateAddress(tx.from)}
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-white/60 text-sm min-w-[70px]">
                      To
                    </span>
                    <span className="text-white/80 font-mono text-base">
                      {truncateAddress(tx.to)}
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-white/60 text-sm min-w-[70px]">
                      Block
                    </span>
                    <span className="text-white text-base">
                      {tx.blockNumber}
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-white/60 text-sm min-w-[70px]">
                      Time
                    </span>
                    <span className="text-white text-base">
                      {formattedTimestamps[tx.txHash] ?? "-"}
                    </span>
                  </div>

                  <div className="flex gap-4 items-center">
                    <span className="text-white/60 text-sm min-w-[70px]">
                      Tx Hash
                    </span>
                    <a
                      href={`https://etherscan.io/tx/${tx.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm truncate"
                      style={{ maxWidth: "calc(100% - 80px)" }}
                    >
                      {truncateAddress(tx.txHash, 12)}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
