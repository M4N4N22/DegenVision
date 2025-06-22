export async function GET() {
    const res = await fetch("https://web3.nodit.io/v1/ethereum/mainnet/blockchain/getGasPrice", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "X-API-KEY": process.env.NODIT_API_KEY!,
      },
    });
  
    const data = await res.json();
    console.log("[Nodit Gas Price API Response]", data);
    return Response.json({
      high: data.high,
      average: data.average,
      low: data.low,
      baseFee: data.baseFee,
      latestBlock: data.latestBlock,
      timestamp: Date.now(),
    });
  }
  