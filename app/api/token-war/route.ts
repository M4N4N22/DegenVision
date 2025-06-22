import { NextRequest } from "next/server"

type CacheEntry = {
  data: Record<string, number[]>
  timestamp: number
}

const CACHE: Record<string, CacheEntry> = {}
const TTL = 5 * 60 * 1000 // 5 minutes

const TOKEN_CONTRACTS = {
  USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  FRAX: "0x853d955aCEf822Db058eb8505911ED77F175b99e",
  UNI: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
  AAVE: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DdAE9",
  LDO: "0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32",
  CRV: "0xD533a949740bb3306d119CC777fa900bA034cd52",
  PEPE: "0x6982508145454Ce325dDbE47a25d4ec3d2311933",
  TURBO: "0xa0bEd124a09ac2Bd941b10349d8d224fe3c955eb",
  FLOKI: "0xB27ADAfFB9fEa1801459a1a81B17218288c097cc",
  SHIB: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
}

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get("mode") ?? "stablecoin"

  const cached = CACHE[mode]
  const nowTime = Date.now()
  if (cached && nowTime - cached.timestamp < TTL) {
    console.log(`[🧠 Cache Hit] Returning cached data for mode: ${mode}`)
    return Response.json({ mode, data: cached.data, cached: true })
  }

  const tokens = Object.entries(TOKEN_CONTRACTS).filter(([symbol]) =>
    mode === "stablecoin"
      ? ["USDC", "DAI", "USDT", "FRAX"].includes(symbol)
      : mode === "defi"
      ? ["UNI", "AAVE", "LDO", "CRV"].includes(symbol)
      : mode === "meme"
      ? ["PEPE", "TURBO", "FLOKI", "SHIB"].includes(symbol)
      : false
  )

  const now = new Date()
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours() - 1))
  const start = new Date(end)
  start.setHours(end.getHours() - 24)

  const startTime = start.toISOString().slice(0, 13).replace("T", "-")
  const endTime = end.toISOString().slice(0, 13).replace("T", "-")

  const trendData: Record<string, number[]> = {}

  for (const [symbol, address] of tokens) {
    console.log(`[📦 Fetching] ${symbol} (${address})`)
    try {
      const res = await fetch(
        "https://web3.nodit.io/v1/ethereum/mainnet/stats/getHourlyTransactionsStatsByContract",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            "X-API-KEY": process.env.NODIT_API_KEY!,
          },
          body: JSON.stringify({
            contractAddress: address,
            startDateTime: startTime,
            endDateTime: endTime,
          }),
        }
      )

      if (res.status === 429) {
        console.warn(`[⛔ Rate Limit] Skipping ${symbol} (429)`)
        continue
      }

      if (!res.ok) {
        const err = await res.text()
        console.error(`[💥 Nodit Error] ${symbol}: ${res.status} → ${err}`)
        continue
      }

      const json = await res.json()

      if (!json?.items || json.items.length === 0) {
        console.warn(`[⚠️ Empty] No tx data for ${symbol} during ${startTime} → ${endTime}`)
        continue
      }

      const trend = json.items
        .sort((a: any, b: any) => a.date.localeCompare(b.date)) // optional, but ensures order
        .map((d: any) => d.count || 0)

      trendData[symbol] = trend
      console.log(`[✅ Success] ${symbol}: ${trend.join(", ")}`)

      await sleep(1100) // throttle requests
    } catch (err) {
      console.error(`[🔥 Unexpected Error] ${symbol}:`, err)
    }
  }

  CACHE[mode] = {
    data: trendData,
    timestamp: nowTime,
  }

  return Response.json({ mode, data: trendData, cached: false })
}
