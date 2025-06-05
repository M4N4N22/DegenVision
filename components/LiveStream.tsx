"use client"

import React from "react"
import { Gauge, Plug, PlugZap, Timer, Zap } from "lucide-react"

import { useBlockStream } from "@/hooks/useBlockStream"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

function truncateHash(hash: string, length = 10) {
  if (!hash) return ""
  return `${hash.slice(0, length)}...${hash.slice(-4)}`
}

const LiveStream = () => {
  const { blocks, loading, error, connected, connect, disconnect } =
    useBlockStream()

  const handleToggle = async () => {
    if (connected) {
      await disconnect()
    } else {
      await connect()
    }
  }

  return (
    <div className="p-6 glass-card max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`h-3 w-3 rounded-full ${
              connected ? "bg-green-500 animate-pulse" : "bg-red-400"
            }`}
          />
          <h2 className="text-xl font-bold text-white">Live ETH Blocks</h2>
        </div>

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

          <Button
            variant="secondary"
            size="sm"
            onClick={handleToggle}
            className="flex items-center gap-2"
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
        </div>
      </div>

      {loading && (
        <div className="text-white p-6">Loading live block insights...</div>
      )}

      {error && (
        <div className="text-red-400 p-6">
          Error loading block insights: {error.message}
        </div>
      )}

      {!loading && !blocks.length && connected && (
        <div className="text-white p-6">
          No live block insights available at the moment.
        </div>
      )}

      <div className="space-y-4">
        {blocks.slice(0, 10).map((block, index) => (
          <div
            key={block.blockNumber}
            className=" rounded-3xl bg-gray-700/40 p-5 shadow-lg transition-colors hover:bg-gray-600/60"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 text-white">
              <div className="flex flex-col">
                <span className="text-sm text-gray-400">Block Number</span>
                <span className="font-mono font-bold text-lg">
                  #{block.blockNumber.toLocaleString()}
                </span>
              </div>

              <div className="flex flex-col min-w-[110px]">
                <span className="text-sm text-gray-400">Transactions</span>
                <span className="font-semibold">{block.txCount}</span>
              </div>

              <div className="flex flex-col min-w-[130px]">
                <span className="text-sm text-gray-400">Gas Used</span>
                <span>{block.gasUsed.toLocaleString()}</span>
              </div>

              <div className="flex flex-col min-w-[170px]">
                <span className="text-sm text-gray-400">Block Hash</span>
                <code
                  title={block.hash}
                  className="font-mono truncate cursor-pointer rounded bg-gray-800/70 p-1 text-yellow-400"
                  onClick={() => navigator.clipboard.writeText(block.hash)}
                >
                  {truncateHash(block.hash, 12)}
                </code>
              </div>

              <div className="flex flex-col min-w-[170px]">
                <span className="text-sm text-gray-400">Miner</span>
                <code
                  title={block.miner}
                  className="font-mono truncate cursor-pointer rounded bg-gray-800/70 p-1 text-blue-400"
                  onClick={() => navigator.clipboard.writeText(block.miner)}
                >
                  {truncateHash(block.miner, 12)}
                </code>
              </div>

              <div className="flex flex-col min-w-[130px]">
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <Timer className="size-4 text-gray-400" />
                  Timestamp
                </span>
                <span>
                  {new Date(block.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </span>
              </div>
            </div>
            {/* New Block Metadata */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white">
              <div>
                <span className="text-gray-400">Base Fee Per Gas:</span>{" "}
                <span className="font-mono text-green-400">
                  {block.baseFeePerGas}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Withdrawals:</span>{" "}
                <span className="font-semibold">{block.withdrawalCount}</span>
              </div>
              <div>
                <span className="text-gray-400">Logs:</span>{" "}
                <span className="font-semibold">{block.logCount}</span>
              </div>
              <div>
                <span className="text-gray-400">Size:</span>{" "}
                <span className="font-mono">{block.size}</span>
              </div>
              <div>
                <span className="text-gray-400">Extra Data:</span>{" "}
                <code className="font-mono bg-gray-800/70 px-1 rounded text-yellow-300">
                  {truncateHash(block.extraData, 16)}
                </code>
              </div>
              <div>
                <span className="text-gray-400">Blob Gas Used:</span>{" "}
                <span className="font-mono text-pink-300">
                  {block.blobGasUsed}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Excess Blob Gas:</span>{" "}
                <span className="font-mono text-pink-300">
                  {block.excessBlobGas}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LiveStream
