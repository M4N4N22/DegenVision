"use client"

import { useEffect, useRef, useState } from "react"

import EthAddressActivityPanel from "./forNerds/EthAddressActivityPanel"
import EthMinedTxsPanel from "./forNerds/EthMinedTxsPanel"
import EthTransfersPanel from "./forNerds/EthTransfersPanel"

export default function NerdsPanel() {
  const [logs, setLogs] = useState<any[]>([])
  const MAX_LOGS = 50

  const logsRef = useRef<any[]>([])
  logsRef.current = logs

  useEffect(() => {
    const eventSource = new EventSource("/api/nerds/logs")

    eventSource.onmessage = (event) => {
      const parsed = JSON.parse(event.data)
      //console.log("🧩 Parsed data:", parsed)

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
      <span className="text-yellow-300">
        Events are paused in production to save credits
      </span>
      <div className="flex justify-between  items-end">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">
            <span className="text-primary">Nodit</span> Dashboard{" "}
            <span className="text-lg text-white/50 font-normal">Powered by Nodit Webhook</span>
            <br />
           
          </h1>
        </div>
        <div className="text-sm text-white/70 font-medium  text-right">
          Currently showing live <span className="text-white">Ethereum</span>{" "}
          Mainnet events. <br />
          <span className="text-white/60">
            Other chain support and AI insights coming soon.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
        <EthTransfersPanel logs={logs} />
        <EthAddressActivityPanel logs={logs} />
        <EthMinedTxsPanel logs={logs} />
        {/* Add more components for other event types here */}
      </div>
    </div>
  )
}
