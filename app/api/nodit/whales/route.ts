import { NextResponse } from "next/server"
import { getRecentWhaleTransfers } from "@/lib/nodit/socketManager"

export async function GET() {
  try {
    const whales = getRecentWhaleTransfers()

    console.log("📤 Whale transfers being sent in response:", JSON.stringify(whales, null, 2))

    return NextResponse.json({
      whales,
    })
  } catch (error) {
    console.error("❌ Failed to fetch whale transfers:", error)
    return NextResponse.json(
      { error: "Failed to fetch whale transfers" },
      { status: 500 }
    )
  }
}
