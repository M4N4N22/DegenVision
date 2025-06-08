"use client"

import { useCallback, useEffect, useState } from "react"

export interface WhaleTx {
  from: string
  to: string
  value: number // assuming value is in USDT units already
  blockNumber: number
  txHash: string
  timestamp: number
}

export function useWhaleStream(connected: boolean, pollInterval = 5000) {
  const [whales, setWhales] = useState<WhaleTx[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchWhaleTxs = useCallback(async () => {
    if (!connected) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/nodit/whales")
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

      const data = await res.json()

      if (Array.isArray(data.whales)) {
        const mapped = data.whales.map((tx: any): WhaleTx => ({
          from: tx.from,
          to: tx.to,
          value: Number(tx.value),
          blockNumber: Number(tx.blockNumber),
          txHash: tx.txHash,
          timestamp: Number(tx.timestamp),
        }))

        // Deduplicate by txHash
        const unique = Array.from(
          new Map<string, WhaleTx>(mapped.map((tx:WhaleTx) => [tx.txHash, tx])).values()
        )

        setWhales(unique)
      } else {
        setWhales([])
        console.warn("No whale txs or invalid format in API response")
      }
    } catch (err) {
      setError(err as Error)
      console.error("Failed to fetch whale transfers", err)
    } finally {
      setLoading(false)
    }
  }, [connected])

  useEffect(() => {
    if (!connected) {
      setWhales([]) // clear on disconnect
      return
    }

    fetchWhaleTxs()
    const interval = setInterval(fetchWhaleTxs, pollInterval)
    return () => clearInterval(interval)
  }, [fetchWhaleTxs, pollInterval, connected])

  return {
    whales,
    loading,
    error,
  }
}
