import { NextResponse } from "next/server"
import { connectToNoditStream, disconnectFromNoditStream } from "@/lib/nodit/socketManager"

export async function POST() {
  try {
    await connectToNoditStream()
    return NextResponse.json({ message: "✅ Connected to Nodit stream" })
  } catch (err) {
    console.error("❌ Error connecting to Nodit stream:", err)
    return NextResponse.json({ error: "Failed to connect to Nodit stream" }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    disconnectFromNoditStream()
    return NextResponse.json({ message: "🛑 Disconnected from Nodit stream" })
  } catch (err) {
    console.error("❌ Error disconnecting from Nodit stream:", err)
    return NextResponse.json({ error: "Failed to disconnect from Nodit stream" }, { status: 500 })
  }
}
