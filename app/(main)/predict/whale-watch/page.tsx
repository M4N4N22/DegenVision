'use client'

import { useEffect, useState } from 'react'
import { useNoditConnection } from '@/hooks/useNoditConnection'
import { useWhaleStream } from '@/hooks/useWhaleStream'
import WhalePredictionPanel from '@/components/WhalePredictionPanel'
import WhaleWatchFeed from '@/components/WhaleWatchFeed'

interface WhaleTx {
  txHash: string
  from: string
  to: string
  value: number
  blockNumber: number
  timestamp: number
}

function generateRandomTx(): WhaleTx {
  const randHex = () => crypto.randomUUID().replace(/-/g, '').slice(0, 40)
  return {
    txHash: `0x${crypto.randomUUID().replace(/-/g, '')}`,
    from: `0x${randHex()}`,
    to: `0x${randHex()}`,
    value: Math.floor(1000 + Math.random() * 10000), // 1k - 11k
    blockNumber: 20000000 + Math.floor(Math.random() * 1000),
    timestamp: Date.now(),
  }
}

export default function WhaleWatchPage() {
  const {
    connected,
    connect,
    disconnect,
    error: connectionError,
  } = useNoditConnection()

  const {
    whales: realWhales,
    loading,
    error: whalesError,
  } = useWhaleStream(connected)

  const [mockWhales, setMockWhales] = useState<WhaleTx[]>([
    {
      txHash: '0xabc123456789def0123456789abcdef0123456789',
      from: '0xF98A3A1b7C4E9248d4F82cE1a5f51238f47D8A60',
      to: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
      value: 12450,
      blockNumber: 18456321,
      timestamp: Date.now() - 1000 * 60 * 2,
    },
    {
      txHash: '0xbcd0987654321def0987654321abcdef012345678',
      from: '0xAcbd1234Ef567890ABcdef1234567890Ef123456',
      to: '0x1234abcd5678ef90123456789abcdef0123456ef',
      value: 3200,
      blockNumber: 18456318,
      timestamp: Date.now() - 1000 * 60 * 10,
    },
    {
      txHash: '0xdef123456789abcdef1234567890abcdef098765',
      from: '0x9876abcd5432ef10987654321abcdef098765432',
      to: '0x76543210fedcba0987654321abcdef0987654321',
      value: 740,
      blockNumber: 18456316,
      timestamp: Date.now() - 1000 * 60 * 30,
    },
  ])

  // Simulate a new whale tx every 5 seconds
  useEffect(() => {
    if (connected) return

    const interval = setInterval(() => {
      setMockWhales((prev) => [generateRandomTx(), ...prev.slice(0, 19)]) // keep last 20
    }, 5000)

    return () => clearInterval(interval)
  }, [connected])

  const whales = connected ? realWhales : mockWhales

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Left: Whale Watch Feed */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">🐳 Whale Watch</h1>
          <WhaleWatchFeed
            whales={whales}
            connected={connected}
            connect={connect}
            disconnect={disconnect}
            loading={loading}
            connectionError={connectionError ?? undefined}
            whalesError={whalesError ?? undefined}
          />
        </div>

        {/* Right: Prediction Panel */}
        <div className="space-y-2">
          <WhalePredictionPanel whales={whales} />
        </div>
      </div>
    </div>
  )
}
