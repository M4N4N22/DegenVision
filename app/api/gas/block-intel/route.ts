type TxItem = {
    gasUsed?: string
    maxPriorityFeePerGas?: string
    functionSelector?: string
    blockNumber: number
  }
  
  let lastBlockSeen: number | null = null
  
  export async function GET() {
    const headers = {
      accept: "application/json",
      "content-type": "application/json",
      "X-API-KEY": process.env.NODIT_API_KEY!,
    }
  
    const txRes = await fetch("https://web3.nodit.io/v1/ethereum/mainnet/blockchain/getTransactionsInBlock", {
      method: "POST",
      headers,
      body: JSON.stringify({
        block: "latest",
        withCount: false,
        withLogs: false,
        withDecode: false,
      }),
    })
  
    const txData = await txRes.json()
    const txs = (txData.items ?? []) as TxItem[]
  
    const currentBlock = txs[0]?.blockNumber
    if (!currentBlock || currentBlock === lastBlockSeen) {
      return Response.json({
        message: "No new block yet",
        latestBlock: currentBlock,
      })
    }
  
    const txCount = txs.length
    const totalGasUsed = txs.reduce((acc, tx) => acc + Number(tx.gasUsed || 0), 0)
    const avgPriorityFee =
      txs.reduce((acc, tx) => acc + Number(tx.maxPriorityFeePerGas || 0), 0) / txCount || 0
    const contractTxRatio =
      Number(
        (
          txs.filter((tx) => tx.functionSelector !== "0x").length / txCount
        ).toFixed(2)
      ) || 0
  
    lastBlockSeen = currentBlock
  
    return Response.json({
      latestBlock: currentBlock,
      txCount,
      totalGasUsed,
      avgPriorityFee,
      contractTxRatio,
      timestamp: Date.now(),
    })
  }
  