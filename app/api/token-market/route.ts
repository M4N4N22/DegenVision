import { NextResponse } from "next/server"

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

const API_URL =
  "https://web3.nodit.io/v1/ethereum/mainnet/token/getTokenPricesByContracts"
const API_KEY = process.env.NODIT_API_KEY || "nodit-demo"

async function fetchBatch(contractAddresses: string[]) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "X-API-KEY": API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      contractAddresses,
      currency: "USD",
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    console.error("Nodit API error", error)
    throw new Error(`Failed batch: ${response.status}`)
  }

  return response.json()
}

async function fetchFromCoinGecko() {
  const tokenEntries = Object.entries(TOKEN_CONTRACTS)
  const results: any[] = []

  console.log(
    `🛰️ Starting CoinGecko fallback for ${tokenEntries.length} tokens...`
  )

  for (const [symbol, address] of tokenEntries) {
    const url = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${address}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`

    console.log(`🔍 Fetching ${symbol} from CoinGecko...`)

    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "DegenVision/1.0 (+https://degenvision.com)",
          Accept: "application/json",
        },
      })

      if (res.status === 429) {
        console.warn(`⚠️ Rate limit hit for ${symbol}, skipping.`)
        continue
      }

      if (!res.ok) {
        const err = await res.text()
        console.error(`❌ CoinGecko error for ${symbol}:`, err)
        continue
      }

      const json = await res.json()
      const data = json[address.toLowerCase()]
      if (!data) {
        console.warn(`❓ No data returned for ${symbol} (${address})`)
        continue
      }

      results.push({
        symbol,
        price: data.usd ?? 0,
        percentChangeFor1h: 0, // Not available via this endpoint
        percentChangeFor24h: data.usd_24h_change ?? 0,
        percentChangeFor7d: 0, // Not available
        marketCap: data.usd_market_cap ?? 0,
        volumeFor24h: data.usd_24h_vol ?? 0,
        logoUrl: `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`,
      })

      console.log(`✅ Loaded ${symbol}: $${data.usd?.toFixed(4)}`)

      // Wait 7 seconds before next request to avoid rate limit
      await new Promise((res) => setTimeout(res, 7000))
    } catch (err) {
      console.error(`🔥 Unexpected error for ${symbol}:`, err)
    }
  }

  console.log(
    `✅ CoinGecko fallback completed. Loaded ${results.length} tokens.`
  )

  return results
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function GET() {
  try {
    const contracts = Object.values(TOKEN_CONTRACTS)
    const batchSize = 3
    const batches = Array.from(
      { length: Math.ceil(contracts.length / batchSize) },
      (_, i) => contracts.slice(i * batchSize, i * batchSize + batchSize)
    )

    const results: any[] = []

    for (const batch of batches) {
      try {
        const data = await fetchBatch(batch)
        results.push(...data)
        await sleep(200)
      } catch (err) {
        console.warn("Nodit batch failed, switching to fallback")
        const fallback = await fetchFromCoinGecko()
        return NextResponse.json(fallback)
      }
    }

    // 🧠 Nodit response format handling
    const final = results.map((token: any) => {
      const matched = Object.entries(TOKEN_CONTRACTS).find(
        ([, addr]) =>
          addr.toLowerCase() === token.contract.address.toLowerCase()
      )
      return {
        symbol: matched?.[0] ?? "UNKNOWN",
        price: parseFloat(token.price),
        percentChangeFor1h: parseFloat(token.percentChangeFor1h),
        percentChangeFor24h: parseFloat(token.percentChangeFor24h),
        percentChangeFor7d: parseFloat(token.percentChangeFor7d),
        marketCap: parseFloat(token.marketCap),
        volumeFor24h: parseFloat(token.volumeFor24h),
        logoUrl: token.contract.logoUrl,
      }
    })

    return NextResponse.json(final)
  } catch (err: any) {
    console.error("[TokenMarket API Error]", err)

    // fallback logic
    try {
      const fallback = await fetchFromCoinGecko()
      return NextResponse.json(fallback)
    } catch (err) {
      console.error("Fallback failed too", err)
      return NextResponse.json(
        { error: "Both primary and fallback failed" },
        { status: 500 }
      )
    }
  }
}
