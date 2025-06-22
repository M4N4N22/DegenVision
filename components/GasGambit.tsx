"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { HiSparkles } from "react-icons/hi2";
import {
  GiPoisonGas,
  GiWhaleTail,
} from "react-icons/gi"
import {
  DollarSign,
  Play,
  RefreshCw,
  Target,
  Timer,
  TrendingDown,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react"


type GasData = {
  baseFee: string;
  average: string;
  timestamp: number;
};

type Prediction = "UP" | "DOWN" | null;

export default function GasGambit() {
  const [initialGas, setInitialGas] = useState<number | null>(null);
  const [finalGas, setFinalGas] = useState<number | null>(null);
  const [prediction, setPrediction] = useState<Prediction>(null);
  const [result, setResult] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Fetch current gas price from API
  const fetchGasPrice = async (): Promise<number> => {
    const res = await fetch("/api/gas/price");
    const data = await res.json();
    return parseInt(data.average); // can switch to baseFee
  };

  // Start round
  const startGame = async () => {
    const gas = await fetchGasPrice();
    setInitialGas(gas);
    setPrediction(null);
    setFinalGas(null);
    setResult(null);
    setTimer(120); // 2 min
    setIsRunning(true);
  };

  // Countdown timer
  useEffect(() => {
    if (!isRunning || timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          resolveGame();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timer]);

  // End round, fetch gas again, calculate result
  const resolveGame = async () => {
    const gas = await fetchGasPrice();
    setFinalGas(gas);
    setIsRunning(false);

    if (initialGas === null) return;

    if (gas > initialGas && prediction === "UP") setResult("✅ Correct!");
    else if (gas < initialGas && prediction === "DOWN") setResult("✅ Correct!");
    else if (gas === initialGas) setResult("😐 No change");
    else setResult("❌ Wrong prediction");
  };

  const formatGwei = (wei: number | null) =>
    wei ? `${(wei / 1e9).toFixed(2)} Gwei` : "--";

  return (
    <div className="w-full bg-white/5 text-foreground p-8 rounded-2xl shadow-md">
      <div className="space-y-8">
     

        {/* MCP Insight placeholder */}
        <div className="bg-white/5 w-full flex items-center text-white/80 text-xs px-1 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-rose-600">
          <span className="bg-black/90 p-3 rounded-full w-full flex gap-2 items-center"><HiSparkles/>Gas likely to increase due to recent USDT whale swap</span> {/* Replace with live MCP call */}
        </div>

        <div className="flex justify-between text-sm">
          <div>Start Gas: {formatGwei(initialGas)}</div>
          <div>End Gas: {formatGwei(finalGas)}</div>
        </div>

        <Progress value={(timer / 120) * 100} />
        <div className="text-center text-sm">⏱️ {timer}s left</div>

        <div className="flex gap-4 justify-center">
          <Button
            variant={prediction === "UP" ? "default" : "outline"}
            onClick={() => setPrediction("UP")}
            disabled={!isRunning}
            className="rounded-3xl flex items-center gap-2"
          >
            <TrendingUp/> Gas Up
          </Button>
          <Button
            variant={prediction === "DOWN" ? "default" : "outline"}
            onClick={() => setPrediction("DOWN")}
            disabled={!isRunning}
            className="rounded-3xl flex items-center gap-2"
          >
            <TrendingDown/> Gas Down
          </Button>
        </div>

        {!isRunning && (
          <Button onClick={startGame} className="w-full rounded-3xl font-medium text-base">
            Start New Prediction
          </Button>
        )}

        {result && (
          <div className="text-center text-lg font-bold mt-4">
            🎯 {result}
          </div>
        )}
      </div>
    </div>
  );
}
