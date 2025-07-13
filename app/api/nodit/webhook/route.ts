import { NextRequest } from "next/server"
import { trackNerdLog } from "@/shared/nerdlog.mjs"
import { format } from "date-fns"

const tokenMap = {
  "0xdac17f958d2ee523a2206206994597c13d831ec7": { symbol: "USDT", decimals: 6 },
  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": {
    symbol: "WETH",
    decimals: 18,
  },
} as const

type TokenAddress = keyof typeof tokenMap

function shorten(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

function formatWebhookMessages(body: any) {
    const { messages = [] } = body.event || {}
  
    return messages.map((msg: any) => {
      const address = msg.token_address?.toLowerCase()
      const tokenInfo = (tokenMap as Record<string, { symbol: string; decimals: number }>)[address] || {
        symbol: "UNKNOWN",
        decimals: 18,
      }

    const valueReadable = (
      BigInt(msg.value || "0") / BigInt(10 ** tokenInfo.decimals)
    ).toString()

    return {
      token: tokenInfo.symbol,
      tokenAddress: msg.token_address,
      from: shorten(msg.from_address),
      to: shorten(msg.to_address),
      value: valueReadable,
      txHash: shorten(msg.transaction_hash),
      block: msg.block_number,
      timestamp: format(
        new Date((msg.block_timestamp || 0) * 1000),
        "yyyy-MM-dd HH:mm:ss"
      ),
    }
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const formattedTransfers = formatWebhookMessages(body)

    trackNerdLog({
      source: "webhook",
      type: "event",
      ts: Date.now(),
      raw: body,
      formatted: formattedTransfers,
    })

    console.log(
      "✅ Webhook received from Nodit:",
      JSON.stringify(body, null, 2)
    )

    return new Response("ok", { status: 200 })
  } catch (err) {
    console.error("❌ Error parsing webhook payload:", err)
    return new Response("bad request", { status: 400 })
  }
}
