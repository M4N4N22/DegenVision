// nodit/index.mjs
import 'dotenv/config'
import { startMCP } from "./mcp/client.mjs"
import { listApiCategories } from "./mcp/calls/listApis.mjs"
import { getEthGetLogsSpec } from "./mcp/calls/getSpec.mjs"
import { callEthGetLogs } from "./mcp/calls/callEthGetLogs.js"
import { callEthCall } from "./mcp/calls/callEthCall.js"
import { trackNerdLog } from '../shared/nerdlog.mjs'

let state = 0

const { send } = startMCP((msg) => {
  if (msg.error) {
    console.error("MCP error:", msg.error)
    trackNerdLog({ source: "MCP", type: "error", error: msg.error, ts: Date.now() })
    return
  }

  trackNerdLog({ source: "MCP", type: "response", id: msg.id, payload: msg.result, ts: Date.now() })

  switch (msg.id) {
    case 1:
      console.log("\u2705 Available Categories:", msg.result)
      state = 1
      listApiCategories(send)
      break
    case 2:
      console.log("\u2705 Ethereum APIs:", msg.result)
      state = 2
      getEthGetLogsSpec(send)
      break
    case 3:
      console.log("\u2705 API Spec for eth_getLogs:", msg.result)
      state = 3
      callEthGetLogs(send)
      break
    case 4:
      console.log("\ud83c\udfaf eth_getLogs Result:", JSON.stringify(msg.result, null, 2))
      callEthCall(send)
      break
    case 5:
      console.log("\ud83d\udcca eth_call Result:", JSON.stringify(msg.result, null, 2))
      break
  }
})

// Kickstart the flow
send({
  jsonrpc: "2.0",
  id: 1,
  method: "tools/call",
  params: {
    name: "list_nodit_api_categories",
    arguments: {},
  },
})