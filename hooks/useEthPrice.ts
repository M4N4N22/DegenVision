import { useState, useRef } from 'react'

export interface TokenPriceData {
  currentPrice: number
  priceChange: number
  priceChangePercent: number
  lastUpdated: string
}

// You can keep this map if you want for other purposes, but it's not used in the fetch anymore
const tokenIdMap: Record<string, string> = {
  eth: "ethereum",
  usdt: "tether",
  btc: "bitcoin",
  sol: "solana",
  matic: "matic-network",
  // Add more as needed
}

export function useTokenPrice(token: string, currency: string) {
  const [data, setData] = useState<TokenPriceData | null>(null)
  const [loading, setLoading] = useState(false)
  const prevPriceRef = useRef<number | null>(null)

  const fetchPrice = async () => {
    try {
      setLoading(true)

      // Pass token symbol directly to backend, e.g., "usdt", "eth"
      const tokenSymbol = token.toLowerCase()

      const res = await fetch(
        `/api/token-price?token=${encodeURIComponent(tokenSymbol)}&currency=${encodeURIComponent(currency)}`,
        { cache: 'no-store' }
      )
      const json = await res.json()
      const current = Number(json.price)

      const prevPrice = prevPriceRef.current
      const change = prevPrice !== null ? current - prevPrice : 0
      const changePercent = prevPrice ? (change / prevPrice) * 100 : 0

      setData({
        currentPrice: current,
        priceChange: change,
        priceChangePercent: changePercent,
        lastUpdated: new Date().toLocaleTimeString(),
      })

      prevPriceRef.current = current
    } catch (err) {
      console.error(`Error fetching ${token.toUpperCase()} price:`, err)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, fetchPrice }
}
