import { NextResponse } from 'next/server'

console.log("NODIT_API_KEY:", process.env.NODIT_API_KEY)

export async function GET() {
  try {
    // Primary: CoinGecko
    const cgRes = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")

    if (!cgRes.ok) throw new Error("CoinGecko request failed")
    const cgData = await cgRes.json()
    const price = cgData?.ethereum?.usd ?? 0

    return NextResponse.json({ price })
  } catch (err) {
    console.warn("CoinGecko failed, falling back to Nodit...", err)
  }

  try {
    // Fallback: Nodit API
    const noditRes = await fetch("https://web3.nodit.io/v1/ethereum/mainnet/token/getTokenPricesByContracts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": process.env.NODIT_API_KEY!,
      },
      body: JSON.stringify({
        contractAddresses: ["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"], // WETH
      }),
    })

    if (!noditRes.ok) throw new Error("Nodit request failed")
    const noditData = await noditRes.json()
    const price = noditData?.data?.[0]?.price ?? 0

    return NextResponse.json({ price })
  } catch (err) {
    console.error("Both CoinGecko and Nodit failed:", err)
    return NextResponse.json(
      { error: "Failed to fetch ETH price from both sources" },
      { status: 500 }
    )
  }
}
