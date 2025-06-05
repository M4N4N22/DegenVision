// lib/nodit/filter.ts

export type ETHTransaction = {
    hash: string;
    from: string;
    to: string;
    value: string; // in wei
    gasUsed?: string;
    gasPrice?: string;
  };
  
  export type LogEvent = {
    contractAddress: string;
    eventName: string;
    args: {
      from: string;
      to: string;
      value: string; // in raw token units
    };
  };
  
  const WHALE_THRESHOLD_ETH = 50;
  const HIGH_GAS_THRESHOLD_ETH = 0.05;
  const TOKEN_TRANSFER_THRESHOLD_USD = 100_000;
  
  // You can replace this with actual price API later
  const mockTokenPrices: Record<string, number> = {
    USDC: 1,
    USDT: 1,
    WETH: 3500,
  };
  
  export function isSignificantEthTx(tx: ETHTransaction): boolean {
    const ethTransferred = parseFloat(tx.value) / 1e18;
  
    const gasFeeETH =
      tx.gasUsed && tx.gasPrice
        ? (parseFloat(tx.gasUsed) * parseFloat(tx.gasPrice)) / 1e18
        : 0;
  
    return ethTransferred >= WHALE_THRESHOLD_ETH || gasFeeETH >= HIGH_GAS_THRESHOLD_ETH;
  }
  
  export function isSignificantTokenTransfer(event: LogEvent): boolean {
    const tokenSymbol = getTokenSymbol(event.contractAddress);
    const tokenPrice = mockTokenPrices[tokenSymbol] || 0;
  
    const rawValue = parseFloat(event.args.value || "0");
    const humanValue = rawValue / 1e18;
    const usdValue = humanValue * tokenPrice;
  
    return usdValue >= TOKEN_TRANSFER_THRESHOLD_USD;
  }
  
  // Replace this with actual token list/DB
  function getTokenSymbol(contractAddress: string): string {
    const lowercase = contractAddress.toLowerCase();
    if (lowercase === "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48") return "USDC"; // mainnet USDC
    if (lowercase === "0xdac17f958d2ee523a2206206994597c13d831ec7") return "USDT";
    if (lowercase === "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2".toLowerCase()) return "WETH";
    return "UNKNOWN";
  }
  