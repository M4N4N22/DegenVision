import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { tokens } = await req.json()

  const prompt = `
You are a crypto degen summarizer bot. Given token data, summarize in a short, punchy, hype tone which tokens are surging, bleeding, or stable. Be fun but accurate.

Tokens:
${tokens.map((t: any) =>
  `${t.symbol}: price $${t.price}, 24h change ${t.percentChangeFor24h.toFixed(2)}%, volume $${t.volumeFor24h}, market cap $${t.marketCap}`
).join("\n")}
`

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    }),
  })

  const json = await res.json()
  const summary = json?.choices?.[0]?.message?.content ?? "No intel generated."

  return NextResponse.json({ summary })
}
