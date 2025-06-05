"use client"

import { useCallback, useEffect, useState } from "react"

export interface BlockInsight {
  blockNumber: number
  gasUsed: number
  hash: string
  miner: string
  timestamp: number
  txCount: number
  baseFeePerGas: string
  withdrawalCount: number
  logCount: number
  size: string
  extraData: string
  blobGasUsed: string
  excessBlobGas: string
}

export function useBlockStream(pollInterval = 5000) {
  const [blocks, setBlocks] = useState<BlockInsight[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [connected, setConnected] = useState<boolean>(false)

  const fetchBlocks = useCallback(async () => {
    if (!connected) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/nodit/txs")
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const data = await res.json()

      if (data.blocks && Array.isArray(data.blocks)) {
        const mapped = data.blocks.map((b: any) => ({
          blockNumber: Number(b.blockNumber),
          gasUsed: Number(b.gasUsed),
          hash: b.hash,
          miner: b.miner,
          timestamp: Number(b.timestamp) * 1000, // convert to ms
          txCount: Number(b.txCount),

          // New fields below — converted and formatted as strings or numbers as needed
          baseFeePerGas:
            b.baseFeePerGas !== undefined
              ? Number(b.baseFeePerGas).toLocaleString()
              : "N/A",

          withdrawalCount:
            b.withdrawalCount !== undefined ? Number(b.withdrawalCount) : 0,

          logCount: b.logCount !== undefined ? Number(b.logCount) : 0,

          size: b.size !== undefined ? Number(b.size).toLocaleString() : "N/A",

          extraData: b.extraData ?? "N/A",
          blobGasUsed: b.blobGasUsed ?? "0x0",
          excessBlobGas: b.excessBlobGas ?? "0x0",
        }))

        const unique = Array.from(
          new Map<number, BlockInsight>(
            mapped.map((b: BlockInsight) => [b.blockNumber, b])
          ).values()
        )

        setBlocks(unique)
      } else {
        setBlocks([])
        console.warn("No blocks array or invalid format in API response")
      }
    } catch (err) {
      setError(err as Error)
      console.error("Failed to fetch block insights", err)
    } finally {
      setLoading(false)
    }
  }, [connected])

  // Polling
  useEffect(() => {
    if (!connected) return

    fetchBlocks()
    const intervalId = setInterval(fetchBlocks, pollInterval)

    return () => clearInterval(intervalId)
  }, [fetchBlocks, pollInterval, connected])

  // Stream controls
  const connect = async () => {
    try {
      const res = await fetch("/api/nodit/stream", { method: "POST" })
      if (!res.ok) throw new Error("Failed to connect to Nodit")
      setConnected(true)
    } catch (err) {
      setError(err as Error)
    }
  }

  const disconnect = async () => {
    try {
      const res = await fetch("/api/nodit/stream", { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to disconnect from Nodit")
      setConnected(false)
      setBlocks([]) // Optional: clear stale data
    } catch (err) {
      setError(err as Error)
    }
  }

  return {
    blocks,
    loading,
    error,
    connected,
    connect,
    disconnect,
  }
}
