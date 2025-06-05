import { useState, useRef } from 'react'

export interface EthPriceData {
  currentPrice: number
  priceChange: number
  priceChangePercent: number
  lastUpdated: string
}

export function useEthPrice() {
  const [data, setData] = useState<EthPriceData | null>(null)
  const [loading, setLoading] = useState(false)
  const prevPriceRef = useRef<number | null>(null)

  const fetchPrice = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/eth-price', { cache: 'no-store' })
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
      console.error('Error fetching ETH price:', err)
    } finally {
      setLoading(false)
    }
  }

  // No useEffect — this makes it manual only
  return { data, loading, fetchPrice }
}
