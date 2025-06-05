import { NextResponse } from "next/server"
import { getRecentBlockInsights } from "@/lib/nodit/socketManager"

export async function GET() {
  try {
    const blocks = getRecentBlockInsights()
    console.log(`Retrieved ${blocks.length} recent block insights`)
    return NextResponse.json({ blocks })
  } catch (err) {
    console.error("API error fetching block insights:", err)
    return NextResponse.json({ error: "Failed to fetch block insights" }, { status: 500 })
  }
}
