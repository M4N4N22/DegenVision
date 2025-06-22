// components/GasGambitEnhancements.tsx
"use client";

import { useEffect, useState } from "react";

// Dummy types — adapt as per actual structure
interface StatPoint {
  date: string;
  count: number;
}

interface GasSnapshot {
  high: string;
  average: string;
  low: string;
  baseFee: string;
  latestBlock: string;
}

export default function GasGambitEnhancements() {
  const [gas, setGas] = useState<GasSnapshot | null>(null);
  const [stats, setStats] = useState<{ txStats: StatPoint[]; accStats: StatPoint[] } | null>(null);
  const [blockDelta, setBlockDelta] = useState<number | null>(null);

  const fetchGas = async () => {
    const res = await fetch("/api/gas/price");
    const json = await res.json();
    setGas(json);
  };

  const fetchStats = async () => {
    const res = await fetch("/api/gas/network-stats");
    const json = await res.json();
    setStats({ txStats: json.txStats, accStats: json.accStats });
  };

  useEffect(() => {
    fetchGas();
    fetchStats();
    const interval = setInterval(() => {
      fetchGas();
      fetchStats();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const txNow = stats?.txStats.at(-1)?.count ?? 0;
  const txPrev = stats?.txStats.at(-2)?.count ?? 0;
  const accNow = stats?.accStats.at(-1)?.count ?? 0;
  const txDelta = txNow - txPrev;
  const isVolatile = txDelta > 50000;
  const multiplier = isVolatile ? 2 : 1;

  // Gas insights
  const high = gas?.high ? parseInt(gas.high) / 1e9 : 0;
  const avg = gas?.average ? parseInt(gas.average) / 1e9 : 0;
  const base = gas?.baseFee ? parseInt(gas.baseFee) / 1e9 : 0;
  const insight =
    high > avg * 1.2 ? "📈 Pressure Rising" : high < avg * 0.8 ? "📉 Pressure Cooling" : "🟢 Normal Activity";

  // Block delta tracking
  useEffect(() => {
    let prevBlock = 0;
    if (gas?.latestBlock) {
      const currentBlock = parseInt(gas.latestBlock);
      if (prevBlock && currentBlock > prevBlock) {
        setBlockDelta(currentBlock - prevBlock);
      }
      prevBlock = currentBlock;
    }
  }, [gas?.latestBlock]);

  return (
    <div className="w-full p-4 bg-muted rounded-xl space-y-4 text-sm">
      <div className="text-center font-semibold">🎮 Gas Gambit Live Metrics</div>

      <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
        <div className="flex justify-between">
          <span>🔥 High:</span>
          <span className="text-orange-400">{high.toFixed(2)} Gwei</span>
        </div>
        <div className="flex justify-between">
          <span>⚖️ Average:</span>
          <span className="text-emerald-400">{avg.toFixed(2)} Gwei</span>
        </div>
        <div className="flex justify-between">
          <span>📉 Base Fee:</span>
          <span className="text-yellow-400">{base.toFixed(2)} Gwei</span>
        </div>
        <div className="flex justify-between">
          <span>📦 Latest Block:</span>
          <span>#{gas?.latestBlock}</span>
        </div>
        {blockDelta && (
          <div className="flex justify-between col-span-2">
            <span>🔁 Block Δ:</span>
            <span className="text-muted-foreground">{blockDelta}</span>
          </div>
        )}
      </div>

      <div className="text-center font-medium text-primary">💡 Insight: {insight}</div>

      <div className="mt-4 space-y-1">
        <div className="flex justify-between">
          <span>📈 Tx (Last Hour):</span>
          <span>{txNow.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>👥 Active Accounts:</span>
          <span>{accNow.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>⚠️ Volatility:</span>
          <span className={isVolatile ? "text-red-500" : "text-green-500"}>{
            isVolatile ? "High" : "Stable"
          }</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>🎯 Reward Multiplier:</span>
          <span className="text-accent">{multiplier}x</span>
        </div>
      </div>
    </div>
  );
}
