// app/api/nerds/logs/route.ts
import { NextRequest } from "next/server"
import { getNerdBuffer, registerNerdListener } from "@/shared/nerdlog.mjs"

export async function GET(req: NextRequest) {
  console.log("🔌 [SSE] /api/nerds/logs connection received")

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      try {
        const send = (log: any) => {
          const encoded = encoder.encode(`data: ${JSON.stringify(log)}\n\n`)
          controller.enqueue(encoded)
          console.log("📤 [SSE] Sent log:", log)
        }

        // Send recent logs
        const buffer = getNerdBuffer()
        console.log(`📦 [SSE] Sending ${buffer.length} buffered logs`)
        buffer.forEach(send)

        // Subscribe to live logs
        const unsubscribe = registerNerdListener(send)
        console.log("👂 [SSE] Subscribed to nerd logs")

        req.signal.addEventListener("abort", () => {
          console.log("❌ [SSE] Client disconnected")
          unsubscribe()
          controller.close()
        })
      } catch (err) {
        console.error("💥 [SSE] Stream error:", err)
        controller.error(err)
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
