"use client"

import { useEffect, useState, useRef } from "react"
import EthTransfersPanel from "./forNerds/EthTransfersPanel"
import EthAddressActivityPanel from "./forNerds/EthAddressActivityPanel"
import EthMinedTxsPanel from "./forNerds/EthMinedTxsPanel"

export default function NerdsPanel() {
  const [logs, setLogs] = useState<any[]>([])
  const MAX_LOGS = 50

  const logsRef = useRef<any[]>([])
  logsRef.current = logs

  useEffect(() => {
    const eventSource = new EventSource("/api/nerds/logs")

    eventSource.onmessage = (event) => {
      const parsed = JSON.parse(event.data)

      const msgHash =
        parsed.raw?.event?.messages?.[0]?.transaction_hash ??
        parsed.formatted?.[0]?.txHash

      const existing = logsRef.current.find((log) => {
        const hash =
          log.raw?.event?.messages?.[0]?.transaction_hash ??
          log.formatted?.[0]?.txHash
        return hash === msgHash
      })

      if (!existing) {
        setLogs((prev) => [...prev.slice(-MAX_LOGS + 1), parsed])
      }
    }

    return () => eventSource.close()
  }, [])

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-yellow-300">
        Nodit Dashboard – Live Webhook Events
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <EthTransfersPanel logs={logs} />
        <EthAddressActivityPanel logs={logs} />
        <EthMinedTxsPanel logs={logs} />
        {/* Add more components for other event types here */}
      </div>
    </div>
  )
}
