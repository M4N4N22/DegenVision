import { padWallet } from "../utils/format.mjs"

export function callEthCall(send) {
  // 🔁 Using Binance hot wallet (USDT whale)
  const walletAddress = "0x28C6c06298d514Db089934071355E5743bf21d60"
  const padded = padWallet(walletAddress)

  send({
    jsonrpc: "2.0",
    id: 5,
    method: "tools/call",
    params: {
      name: "call_nodit_api",
      arguments: {
        api: "ethereum/eth_call",
        protocol: "ethereum",
        network: "mainnet",
        operationId: "eth_call",
        requestBody: {
          jsonrpc: "2.0",
          id: 1,
          method: "eth_call",
          params: [
            {
              to: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT contract
              data: `0x70a08231${padded}`, // balanceOf(address)
            },
            "latest",
          ],
        },
      },
    },
  })
}
