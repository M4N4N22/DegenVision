import { EventEmitter } from "events"
import { io, Socket } from "socket.io-client"

const WS_URL = "wss://web3.nodit.io/v1/websocket"
const API_KEY = process.env.NODIT_API_KEY!

const SUBSCRIPTION_IDS = {
  blockPeriod: "block_period_sub",
  whaleLog: "whale_log_sub",
} as const

const blockPeriodParams = {
  description: "ETH block monitoring",
  condition: {
    period: 1, // every block
  },
}

const whaleLogParams = {
  description: "Whale USDT transfers",
  condition: {
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT contract
    topics: [
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", // Transfer(address,address,uint256)
    ],
  },
}
function parseCustomString(data: string) {
  const [rawId, rawType, ...rest] = data.split(/,\s*(?=\w+:)/)
  const obj: any = {}

  const parseKV = (s: string) => {
    const [k, ...v] = s.split(":")
    return [k.trim(), v.join(":").trim()]
  }

  const [idKey, idVal] = parseKV(rawId)
  const [typeKey, typeVal] = parseKV(rawType)
  const [eventKey, eventVal] = parseKV(rest.join(","))

  obj[idKey] = /^\d+$/.test(idVal) ? Number(idVal) : idVal
  obj[typeKey] = typeVal
  try {
    obj[eventKey] = JSON.parse(eventVal)
  } catch {
    obj[eventKey] = eventVal
  }

  return obj
}
let socket: Socket | null = null
let recentBlocks: any[] = []
let recentWhales: any[] = []
const emitter = new EventEmitter()

let actualBlockPeriodSubId: number | null = null
let connected = false
const activeSubscriptions = new Map<string, number>()

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
        : (blockData.transaction_count ?? 0),
      gasUsed: blockData.gas_used ?? "N/A",
      miner: blockData.miner ?? "N/A",

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

function handleWhaleLogEvent(raw: any) {
  try {
    console.log("📥 Raw LOG event received:", JSON.stringify(raw, null, 2))

    const logs = raw?.event?.messages ?? raw?.messages ?? []

    if (!Array.isArray(logs) || logs.length === 0) {
      console.warn("⚠️ No logs found in LOG event")
    }

    logs.forEach((log: any, index: number) => {
      console.log(`🔍 Processing log #${index}:`, JSON.stringify(log, null, 2))

      const topic0 = log.topics?.[0]
      const fromTopic = log.topics?.[1]
      const toTopic = log.topics?.[2]

      if (!topic0 || !fromTopic || !toTopic || !log.data) {
        console.warn("⚠️ Log missing expected fields:", {
          topic0,
          fromTopic,
          toTopic,
          data: log.data,
        })
        return
      }

      const from = `0x${fromTopic.slice(-40)}`
      const to = `0x${toTopic.slice(-40)}`
      let value = 0

      try {
        const rawValue = BigInt(log.data)
        value = Number(rawValue) / 1e6 // USDT has 6 decimals
      } catch (e) {
        console.error("❌ Error parsing USDT value from data:", log.data, e)
        return
      }

      console.log(`💸 Transfer value: $${value} USDT from ${from} to ${to}`)

      if (value > 500) {
        const whaleTx = {
          token: log.address,
          from,
          to,
          value,
          txHash: log.transaction_hash,
          blockNumber: log.block_number,
          timestamp: log.block_timestamp * 1000,
        }

        console.log("🐋 Whale transfer detected:", whaleTx)

        recentWhales.push(whaleTx)
        if (recentWhales.length > 20) recentWhales.shift()
        emitter.emit("whale", whaleTx)
      } else {
        console.log("🔕 Transfer ignored (not a whale):", value)
      }
    })

    console.log("📤 Whale transfers being sent in response:", recentWhales)
  } catch (err) {
    console.error("❌ Error parsing whale log event:", err)
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

    /*socket!.emit(
      "subscription",
      SUBSCRIPTION_IDS.blockPeriod,
      "BLOCK_PERIOD",
      JSON.stringify(blockPeriodParams),
      (response: { subscriptionId: number }) => {
        activeSubscriptions.set(
          SUBSCRIPTION_IDS.blockPeriod,
          response.subscriptionId
        )
        console.log(
          "📡 Subscribed to Block Period with id:",
          response.subscriptionId
        )
      }
    )*/

    socket!.emit(
      "subscription",
      SUBSCRIPTION_IDS.whaleLog,
      "LOG",
      JSON.stringify(whaleLogParams),
      (response: { subscriptionId: number }) => {
        activeSubscriptions.set(
          SUBSCRIPTION_IDS.whaleLog,
          response.subscriptionId
        )
        console.log(
          "📡 Subscribed to Whale Logs with id:",
          response.subscriptionId
        )
      }
    )

    socket!.on("subscription_event", (data) => {
      // Check if data is string, then parse it
      let parsedData: any = data

      if (typeof data === "string") {
        try {
          parsedData = JSON.parse(data)
        } catch (err) {
          console.warn("Standard JSON.parse failed, trying custom parser...")
          try {
            parsedData = parseCustomString(data)
          } catch (customErr) {
            console.error("Both JSON and custom parsing failed:", customErr)
            return
          }
        }
      }

      console.log("🧾 Parsed subscription_event data:", parsedData)
      const type = parsedData?.eventType || parsedData?.event?.eventType

      if (type === "BLOCK_PERIOD") {
        const blockNumber =
          parsedData?.event?.message?.block_number ??
          parsedData?.message?.block_number ??
          "N/A"
        console.log(`📦 New block: #${blockNumber}`)
        handleEvent(parsedData)
      } else if (type === "LOG") {
        const logs = parsedData?.event?.messages ?? parsedData?.messages ?? []
        const logCount = logs.length
        const preview = logs.slice(0, 1).map((log: any) => ({
          from: `0x${log.topics[1]?.slice(-40)}`,
          to: `0x${log.topics[2]?.slice(-40)}`,
          value: `${Number(BigInt(log.data)) / 1e6} USDT`,
        }))
        console.log(`🐋 Received ${logCount} log(s), example:`, preview[0])
        handleWhaleLogEvent(parsedData)
      }
    })

    connected = true
  })

  socket.on("connect_error", (err) => {
    console.error("Connection error:", err)
  })

  socket.on("disconnect", (reason) => {
    console.warn("⚠️ Disconnected from Nodit:", reason)
    connected = false
    activeSubscriptions.clear()
  })

  socket.on("error", (err) => {
    console.error("Socket error:", err)
  })
}
//function unsubscribeAll() {
 // if (!socket) return

 // for (const [messageId] of activeSubscriptions.entries()) {
  //  console.log(`🚫 Unsubscribing from ${messageId}`)
  //  socket.emit("unsubscribe", messageId) // <- THIS IS WHAT THE DOCS IMPLY
  //}

 // activeSubscriptions.clear()
//}

// ✅ Manual disconnect
export function disconnectFromNoditStream(): void {
  if (socket) {
    console.log("🔌 Disconnecting from Nodit stream...");

    // Prevent reconnections
    socket.io.opts.reconnection = false;

    // Immediately clear subscriptions map — no unsubscribe event possible
    activeSubscriptions.clear();

    // Remove all listeners to avoid receiving any events after disconnect
    socket.removeAllListeners();

    // Disconnect the socket (closes connection)
    socket.disconnect();

    // Clean up local state and socket ref
    socket = null;
    connected = false;
    recentBlocks = [];
    recentWhales = [];

    console.log("✅ Fully disconnected from Nodit");
  }
}

// Listeners
export function onBlockInsightUpdate(callback: (blocks: any[]) => void) {
  emitter.on("update", callback)
  return () => emitter.off("update", callback)
}

export function onWhaleTransfer(callback: (tx: any) => void) {
  emitter.on("whale", callback)
  return () => emitter.off("whale", callback)
}

// Getters
export function getRecentBlockInsights() {
  return recentBlocks
}

export function getRecentWhaleTransfers() {
  return recentWhales
}
