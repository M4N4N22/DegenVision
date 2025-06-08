'use client'

import { useTokenPrice } from '@/hooks/useEthPrice'

export default function EthPriceCard() {
  const { data, loading, fetchPrice } = useTokenPrice("eth","usd")

  return (
    <div className="flex-1 glass-card hidden">
      <div className="p-6">
        {!data ? (
          <p className="text-white">Click refresh to fetch ETH price</p>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  ${data.currentPrice.toFixed(2)}
                </h3>
                <p className="text-sm text-white/50">ETH/USD</p>
              </div>
              <div
                className={`flex items-center gap-1 ${
                  data.priceChange >= 0 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                <span className="text-lg font-semibold">
                  {data.priceChange >= 0 ? '+' : ''}
                  ${data.priceChange.toFixed(2)}
                </span>
                <span className="text-sm">
                  ({data.priceChange >= 0 ? '+' : ''}
                  {data.priceChangePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
            <div className="text-xs text-white/50">
              Last updated: {data.lastUpdated}
            </div>
          </div>
        )}

        <div className="mt-4">
          <button
            onClick={fetchPrice}
            disabled={loading}
            className="px-4 py-2 text-sm font-semibold text-white glass rounded-md transition"
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>
    </div>
  )
}
