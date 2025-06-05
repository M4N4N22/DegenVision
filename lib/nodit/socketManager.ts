import { EventEmitter } from "events"
import { io, Socket } from "socket.io-client"

const WS_URL = "wss://web3.nodit.io/v1/websocket"
const API_KEY = process.env.NODIT_API_KEY!

const SUBSCRIPTION_IDS = {
  blockPeriod: "block_period_sub",
} as const

const blockPeriodParams = {
  description: "ETH block monitoring",
  condition: {
    period: 1, // every block
  },
}

let socket: Socket | null = null
let recentBlocks: any[] = []
const emitter = new EventEmitter()

let actualBlockPeriodSubId: number | null = null
let connected = false

function handleEvent(raw: any) {
  try {
    let parsedRaw = raw

    if (typeof raw === "string") {
      const eventJsonMatch = raw.match(/event:\s*({.*})/s)
      if (eventJsonMatch && eventJsonMatch[1]) {
        parsedRaw = JSON.parse(eventJsonMatch[1])
      } else {
        console.warn("⚠️ Could not extract JSON from raw string event")
        return
      }
    }

    const blockData =
      parsedRaw?.message ??
      parsedRaw?.event?.message ??
      parsedRaw?.event ??
      parsedRaw

    const blockInsight = {
      blockNumber: blockData.block_number ?? blockData.number ?? "N/A",
      hash: blockData.hash ?? "N/A",
      timestamp: blockData.block_timestamp ?? blockData.timestamp ?? "N/A",
      txCount: Array.isArray(blockData.transactions)
        ? blockData.transactions.length
        : blockData.transaction_count ?? 0,
      gasUsed: blockData.gas_used ?? "N/A",
      miner: blockData.miner ?? "N/A",

      // 🔥 Extra fields
      baseFeePerGas: blockData.base_fee_per_gas ?? "N/A",
      withdrawalCount: blockData.withdrawal_count ?? 0,
      logCount: blockData.log_count ?? 0,
      size: blockData.size ?? "N/A",
      extraData: blockData.extra_data ?? "N/A",
      blobGasUsed: blockData.blob_gas_used ?? "0x0",
      excessBlobGas: blockData.excess_blob_gas ?? "0x0",
    }

    console.log("🧠 Extracted blockInsight:", blockInsight)

    recentBlocks.push(blockInsight)
    if (recentBlocks.length > 20) recentBlocks.shift()
    emitter.emit("update", recentBlocks)
  } catch (error) {
    console.error("❌ Failed to parse or handle block event:", error)
  }
}

// ✅ Manual connect
export async function connectToNoditStream(): Promise<void> {
  if (connected || (socket && socket.connected)) {
    console.log("ℹ️ Already connected to Nodit stream")
    return
  }

  socket = io(WS_URL, {
    path: "/v1/websocket/",
    transports: ["websocket"],
    auth: { apiKey: API_KEY },
    reconnectionAttempts: 5,
    timeout: 10000,
    reconnection: false,
    query: {
      protocol: "ethereum",
      network: "mainnet",
    },
  })

  socket.on("connect", () => {
    console.log("✅ Connected to Nodit")

    socket!.emit(
      "subscription",
      SUBSCRIPTION_IDS.blockPeriod,
      "BLOCK_PERIOD",
      JSON.stringify(blockPeriodParams),
      (response: { subscriptionId: number }) => {
        actualBlockPeriodSubId = response.subscriptionId
        console.log("📡 Subscribed with id:", actualBlockPeriodSubId)
      }
    )

    socket!.on("subscription_event", handleEvent)
    connected = true
  })

  socket.on("connect_error", (err) => {
    console.error("Connection error:", err)
  })

  socket.on("disconnect", (reason) => {
    console.warn("⚠️ Disconnected from Nodit:", reason)
    connected = false
  })

  socket.on("error", (err) => {
    console.error("Socket error:", err)
  })
}

// ✅ Manual disconnect
export function disconnectFromNoditStream(): void {
  if (socket) {
    console.log("🔌 Disconnecting from Nodit stream...")

    // Remove the subscription event listener before disconnecting
    socket.off("subscription_event", handleEvent)

    // Actually disconnect
    socket.disconnect()

    socket = null
    actualBlockPeriodSubId = null
    connected = false

    // Optional: clear recent blocks data to avoid stale data
    recentBlocks = []
  }
}


// Block update subscriptions
export function onBlockInsightUpdate(callback: (blocks: any[]) => void) {
  emitter.on("update", callback)
  return () => emitter.off("update", callback)
}

// Read recent blocks
export function getRecentBlockInsights() {
  return recentBlocks
}
