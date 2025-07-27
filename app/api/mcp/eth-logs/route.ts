import { NextResponse } from "next/server"
import { callEthGetLogs } from "@/nodit/mcp/calls/callEthGetLogs"
import { formatUnits, Interface } from "ethers"

import { initMCP } from "@/lib/nodit/startMcp"

const ERC20_INTERFACE = new Interface([
  "event Transfer(address indexed from, address indexed to, uint256 value)",
])

export async function GET() {
  console.log("[/api/mcp/eth-logs] GET handler invoked")

  try {
    console.log("[eth-logs] Initializing MCP connection...")

    const logs = await new Promise<any[]>((resolve, reject) => {
      const { send } = initMCP((msg) => {
        console.log("[eth-logs] MCP message received:", msg)

        if (msg.id === 4 && msg.result?.content) {
          const rawLogText = msg.result.content[0]?.text
          if (!rawLogText) {
            console.error("[eth-logs] Missing log text in MCP response")
            return resolve([])
          }

          try {
            const parsedContent = JSON.parse(rawLogText)
            const logs = parsedContent.result

            const parsedLogs = logs

              .map((log: any, index: number) => {
                try {
                  const parsedLog = ERC20_INTERFACE.parseLog({
                    data: log.data,
                    topics: log.topics,
                  })
                  if (!parsedLog) return null
                  return {
                    from: parsedLog.args?.from,
                    to: parsedLog.args?.to,
                    value: Number(formatUnits(parsedLog.args?.value || 0, 6)),
                    blockNumber: parseInt(log.blockNumber, 16),
                    txHash: log.transactionHash,
                  }
                } catch (err) {
                  console.error(`[eth-logs] Error decoding log ${index}:`, err)
                  return null
                }
              })
              .filter((log: any | null): log is any => log !== null)

            resolve(parsedLogs.slice(0, 15))
          } catch (err) {
            console.error("[eth-logs] Error parsing log content:", err)
            reject(err)
          }
        }
      })

      const fromBlock = 20100000
      const toBlock = 20100010

      console.log(
        `[eth-logs] Sending log request from block ${fromBlock} to ${toBlock}`
      )
      callEthGetLogs(send, fromBlock, toBlock)
    })

    return NextResponse.json({ logs })
  } catch (err) {
    console.error("[eth-logs] Unexpected server error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
