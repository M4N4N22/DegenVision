// app/api/token-price/route.ts
import { NextResponse } from 'next/server'

// Mapping token to CoinGecko ID and Nodit contract address
const tokenConfig: Record<string, { coingeckoId: string; noditContract: string }> = {
  eth: {
    coingeckoId: "ethereum",
    noditContract: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
  },
  usdt: {
    coingeckoId: "tether",
    noditContract: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT
  },
  // add more tokens here
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get("token")?.toLowerCase() || "eth"
  const currency = searchParams.get("currency")?.toLowerCase() || "usd"

  const config = tokenConfig[token]
  if (!config) {
    return NextResponse.json({ error: "Unsupported token" }, { status: 400 })
  }

  // Try CoinGecko first
  try {
    const cgRes = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${config.coingeckoId}&vs_currencies=${currency}`
    )

    if (!cgRes.ok) throw new Error("CoinGecko request failed")

    const cgData = await cgRes.json()
    const price = cgData?.[config.coingeckoId]?.[currency] ?? 0

    return NextResponse.json({ price, source: "coingecko" })
  } catch (err) {
    console.warn("CoinGecko failed, falling back to Nodit...", err)
  }

  // Fallback to Nodit
  try {
    const noditRes = await fetch(
      "https://web3.nodit.io/v1/ethereum/mainnet/token/getTokenPricesByContracts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": process.env.NODIT_API_KEY!,
        },
        body: JSON.stringify({
          contractAddresses: [config.noditContract],
        }),
      }
    )

    if (!noditRes.ok) throw new Error("Nodit request failed")

    const noditData = await noditRes.json()
    const price = noditData?.data?.[0]?.price ?? 0

    return NextResponse.json({ price, source: "nodit" })
  } catch (err) {
    console.error("Both CoinGecko and Nodit failed:", err)
    return NextResponse.json(
      { error: `Failed to fetch ${token.toUpperCase()} price from both sources` },
      { status: 500 }
    )
  }
}
