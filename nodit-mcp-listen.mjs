import { spawn } from "child_process"

const NODIT_API_KEY = "FWa1ZAsUaFNOvN3W6mbf3eQ8ISYM4QJ7"

async function runMCP() {
  const mcp = spawn("npx", ["@noditlabs/nodit-mcp-server@latest"], {
    env: {
      ...process.env,
      NODIT_API_KEY,
    },
    stdio: ["pipe", "pipe", "inherit"],
    shell: true,
  })

  let buffer = ""

  mcp.stdout.on("data", (chunk) => {
    buffer += chunk.toString()
    let lines = buffer.split("\n")
    buffer = lines.pop() || ""

    for (const line of lines) {
      if (!line.trim()) continue
      try {
        const json = JSON.parse(line)
        handleMCPMessage(json)
      } catch (err) {
        console.error("JSON parse error:", err)
      }
    }
  })

  mcp.on("error", (err) => {
    console.error("MCP process error:", err)
  })

  mcp.on("exit", (code) => {
    console.log(`MCP process exited with code ${code}`)
  })

  function send(req) {
    mcp.stdin.write(JSON.stringify(req) + "\n")
  }

  // Step 1: List all available API categories
  send({
    jsonrpc: "2.0",
    id: 1,
    method: "tools/call",
    params: {
      name: "list_nodit_api_categories",
      arguments: {},
    },
  })

  let state = 0

  function handleMCPMessage(msg) {
    if (msg.error) {
      console.error("MCP error:", msg.error)
      return
    }

    if (msg.id === 1 && msg.result) {
      console.log("✅ Available Categories:", msg.result)
      // Step 2: List APIs under 'ethereum'
      state = 1
      send({
        jsonrpc: "2.0",
        id: 2,
        method: "tools/call",
        params: {
          name: "list_nodit_node_apis",
          arguments: {
            category: "ethereum",
          },
        },
      })
    }

    if (msg.id === 2 && msg.result && state === 1) {
      console.log("✅ Ethereum APIs:", msg.result)
      // Step 3: Get spec for one API
      state = 2
      send({
        jsonrpc: "2.0",
        id: 3,
        method: "tools/call",
        params: {
          name: "get_nodit_api_spec",
          arguments: {
            operationId: "eth_getLogs",
          },
        },
      })
    }

    if (msg.id === 3 && msg.result && state === 2) {
      console.log("✅ API Spec for eth_getLogs:", msg.result)
      // Step 4: Call the actual API
      state = 3
      send({
        jsonrpc: "2.0",
        id: 4,
        method: "tools/call",
        params: {
          name: "call_nodit_api",
          arguments: {
            api: "ethereum/eth_getLogs",
            protocol: "ethereum",         // Required for JSON-RPC calls
            network: "mainnet", // Specify the network
            operationId: "eth_getLogs",  // This is the right operationId for eth_getLogs
            requestBody: {
              jsonrpc: "2.0",
              id: 1,
              method: "eth_getLogs",
              params: [
                {
                  fromBlock: "0x14D4F40",  // block 22000000
                  toBlock: "0x14D4F4A",  
                  address: [
                    "0xdAC17F958D2ee523a2206206994597C13D831ec7"  // USDT contract
                  ],
                  topics: [
                    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
                  ],
                },
              ],
            },
          },
        },
      })
    }
    

    if (msg.id === 4 && msg.result && state === 3) {
      console.log("🎯 API Call Result:", JSON.stringify(msg.result, null, 2))
    }
  }

  process.on("SIGINT", () => {
    console.log("Stopping MCP...")
    mcp.kill()
    process.exit()
  })
}

runMCP()
