import { useState } from "react"
import Image from "next/image"
import { HiSparkles } from "react-icons/hi2"
import ReactMarkdown from "react-markdown"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

type TokenMarketData = {
  symbol: string
  price: number
  percentChangeFor1h?: number
  percentChangeFor24h: number
  percentChangeFor7d?: number
  marketCap: number
  volumeFor24h: number
  logoUrl?: string
}

const formatUSD = (num: number) =>
  `$${Intl.NumberFormat("en-US", { notation: "compact" }).format(num)}`

const ChangeCell = ({ value }: { value: number }) => {
  const isUp = value >= 0
  const color = isUp ? "text-green-400" : "text-red-400"
  const arrow = isUp ? "▲" : "▼"
  return (
    <span className={`text-xs font-semibold ${color}`}>
      {arrow} {Math.abs(value).toFixed(2)}%
    </span>
  )
}

export function TokenMarketPanel({ tokens }: { tokens: TokenMarketData[] }) {
  const [view, setView] = useState<"table" | "intel">("intel")
  const [page, setPage] = useState(0)
  const [summary, setSummary] = useState("")
  const [analyzing, setAnalyzing] = useState(false)

  const pageSize = 4
  const FALLBACK_IMAGE_URL =
    "https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
  const totalPages = Math.ceil(tokens.length / pageSize)
  const paginatedTokens = tokens.slice(
    page * pageSize,
    page * pageSize + pageSize
  )

  const show1h = tokens.some(
    (t) =>
      typeof t.percentChangeFor1h === "number" && t.percentChangeFor1h !== 0
  )
  const show7d = tokens.some(
    (t) =>
      typeof t.percentChangeFor7d === "number" && t.percentChangeFor7d !== 0
  )

  return (
    <div className="p-6 bg-background border rounded-xl ">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Token Intel</h3>

        <div className="flex gap-2">
          <Button
            className="rounded-xl"
            variant="outline"
            size="sm"
            onClick={() => setView(view === "table" ? "intel" : "table")}
          >
            {view === "table" ? "Narrative View" : "Table View"}
          </Button>

          <Button
            size="sm"
            onClick={async () => {
              setAnalyzing(true)
              try {
                const res = await fetch("/api/ai-analyze", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ tokens }),
                })
                const { summary } = await res.json()
                setSummary(summary)
              } catch (e) {
                setSummary("Failed to fetch intel.")
              } finally {
                setAnalyzing(false)
              }
            }}
            disabled={analyzing}
            className="px-4 bg-gradient-to-br from-blue-700 via-purple-700 to-rose-700  rounded-xl text-white hover:bg-primary/90 gap-2"
          >
            <HiSparkles /> {analyzing ? "Analyzing..." : "Let AI Analyze"}
          </Button>
        </div>
      </div>
      {summary && (
        <div className="mb-6 bg-gradient-to-br from-blue-600 via-purple-600 to-rose-600 p-1 rounded-xl text-white/80 text-sm">
          <div className="prose prose-invert text-white/90 text-sm max-w-none bg-background p-4 rounded-xl">
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
        </div>
      )}
      {view === "table" ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs text-left table-fixed">
            <thead className="text-muted-foreground border-b">
              <tr>
                <th className="w-28 font-medium py-2">Name</th>
                <th className="w-20 font-medium">Price</th>
                {show1h && <th className="w-16 font-medium">1h%</th>}
                <th className="w-16 font-medium">24h%</th>
                {show7d && <th className="w-16 font-medium">7d%</th>}
                <th className="w-28 font-medium">Market Cap</th>
                <th className="w-28 font-medium">Volume (24h)</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token) => (
                <tr key={token.symbol} className="border-b last:border-none">
                  <td className="py-3 flex items-center gap-2">
                    {token.logoUrl ? (
                      <Image
                        height={20}
                        width={20}
                        src={token.logoUrl}
                        alt={token.symbol}
                        className="w-5 h-5 rounded-full"
                      />
                    ) : (
                      <Skeleton className="w-5 h-5 rounded-full" />
                    )}
                    <span className="font-medium">{token.symbol}</span>
                  </td>
                  <td>{formatUSD(token.price)}</td>
                  {show1h && (
                    <td>
                      {token.percentChangeFor1h != null ? (
                        <ChangeCell value={token.percentChangeFor1h} />
                      ) : (
                        <span className="text-muted-foreground text-xs hidden">
                          —
                        </span>
                      )}
                    </td>
                  )}
                  <td>
                    <ChangeCell value={token.percentChangeFor24h} />
                  </td>
                  {show7d && (
                    <td>
                      {token.percentChangeFor7d != null ? (
                        <ChangeCell value={token.percentChangeFor7d} />
                      ) : (
                        <span className="text-muted-foreground text-xs hidden">
                          —
                        </span>
                      )}
                    </td>
                  )}
                  <td>{formatUSD(token.marketCap)}</td>
                  <td>{formatUSD(token.volumeFor24h)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/80">
            {paginatedTokens.map((t) => {
              const isZero = t.percentChangeFor24h === 0
              const up = t.percentChangeFor24h >= 0
              const delta = `${Math.abs(t.percentChangeFor24h).toFixed(2)}%`
              const movement = isZero
                ? "unchanged"
                : up
                  ? "moved up"
                  : "dropped"

              return (
                <li
                  key={t.symbol}
                  className={`border-2 rounded-xl px-5 py-4 space-y-2 transition ${
                    isZero
                      ? "border-white/40"
                      : up
                        ? "bg-green-900/20 border-green-700"
                        : "bg-red-900/20 border-red-700"
                  }`}
                >
                  <Image
                    height={20}
                    width={20}
                    src={t.logoUrl || FALLBACK_IMAGE_URL} // <-- use a default image if undefined
                    alt={t.symbol}
                    className="w-5 h-5 rounded-full"
                  />

                  <div className="font-semibold text-white text-base">
                    {t.symbol}
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-white/80">
                    <li>
                      Currently trading at{" "}
                      <span className="text-white">{formatUSD(t.price)}</span>
                    </li>
                    <li>
                      It has {movement}{" "}
                      <span className={up ? "text-green-400" : "text-red-400"}>
                        {delta}
                      </span>{" "}
                      in the past 24 hours
                    </li>
                    <li>
                      Around{" "}
                      <span className="text-white">
                        {formatUSD(t.volumeFor24h)}
                      </span>{" "}
                      in volume has been traded today
                    </li>
                    <li>
                      Market cap currently sits at{" "}
                      <span className="text-white">
                        {formatUSD(t.marketCap)}
                      </span>
                    </li>
                  </ul>
                </li>
              )
            })}
          </ul>

          {/* Pagination controls */}
          {tokens.length > pageSize && (
            <div className="flex justify-end mt-6 gap-4 ">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                disabled={page === 0}
                className="px-4 py-2 bg-muted text-white rounded-xl disabled:opacity-30"
              >
                Back
              </button>
              <span className="text-white/70 pt-2">
                Page {page + 1} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
                disabled={page === totalPages - 1}
                className="px-4 py-2 bg-muted text-white rounded-xl disabled:opacity-30"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
