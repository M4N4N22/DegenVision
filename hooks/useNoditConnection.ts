// useNoditConnection.ts
"use client"

import { useState } from "react"

export function useNoditConnection(apiPath = "/api/nodit/stream") {
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const connect = async () => {
    try {
      const res = await fetch(apiPath, { method: "POST" })
      if (!res.ok) throw new Error("Failed to connect to Nodit stream")
      setConnected(true)
    } catch (err) {
      setError(err as Error)
    }
  }

  const disconnect = async () => {
    try {
      const res = await fetch(apiPath, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to disconnect from Nodit stream")
      setConnected(false)
    } catch (err) {
      setError(err as Error)
    }
  }

  return {
    connected,
    connect,
    disconnect,
    error,
  }
}
