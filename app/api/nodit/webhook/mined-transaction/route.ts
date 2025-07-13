import { NextRequest } from "next/server"
import { trackNerdLog } from "@/shared/nerdlog.mjs"
import { format } from "date-fns"

function shorten(addr: string) {
  return `${addr?.slice(0, 6)}...${addr?.slice(-4)}`
}

function formatMinedTransaction(body: any) {
  const msg = body.event?.message
  if (!msg) return []

  return [
    {
      hash: shorten(msg.hash),
      from: shorten(msg.from_address),
      to: msg.to_address ? shorten(msg.to_address) : "Contract Creation",
      value: (
        BigInt(msg.value || "0") / BigInt(10 ** 18)
      ).toString(),
      gasUsed: msg.receipt_gas_used || "N/A",
      status: msg.receipt_status === 1 ? "Success" : "Fail",
      timestamp: format(
        new Date((msg.block_timestamp || 0) * 1000),
        "yyyy-MM-dd HH:mm:ss"
      ),
      block: msg.block_number,
    }
  ]
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const formatted = formatMinedTransaction(body)

    trackNerdLog({
      source: "webhook",
      type: "mined_transaction",
      ts: Date.now(),
      raw: body,
      formatted,
    })

    console.log("✅ Mined Transaction Webhook received:", JSON.stringify(body, null, 2))
    return new Response("ok", { status: 200 })
  } catch (err) {
    console.error("❌ Error parsing mined transaction webhook:", err)
    return new Response("bad request", { status: 400 })
  }
}
