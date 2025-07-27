export function callEthGetLogs(send: any, fromBlock: number, toBlock: number) {

  send({
    jsonrpc: "2.0",
    id: 4,
    method: "tools/call",
    params: {
      name: "get_transfer_logs",
      arguments: {
        api: "ethereum/eth_getLogs",
        protocol: "ethereum",
        network: "mainnet",
        operationId: "eth_getLogs",
        requestBody: {
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getLogs",
          params: [
            {
              fromBlock: "0x" + fromBlock.toString(16),
              toBlock: "0x" + toBlock.toString(16),
              topics: [
                "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", // Transfer
              ],
            },
          ],
        },
      },
    },
  })
}
