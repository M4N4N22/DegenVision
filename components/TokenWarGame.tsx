"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"


import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { TokenCard } from "@/components/TokenCard"

import { TokenSelectGrid } from "./TokenSelectGrid"

const TOKENS = [
  { symbol: "USDC", color: "#60A5FA" }, // blue-400
  { symbol: "DAI", color: "#FCD34D" }, // yellow-300
  { symbol: "WETH", color: "#A78BFA" }, // purple-500
  { symbol: "ARB", color: "#38BDF8" }, // sky-500
  { symbol: "UNI", color: "#F472B6" }, // pink-500
]

const GAME_MODES = {
  stablecoin: {
    label: "Stablecoin War",
    tokens: [
      { symbol: "USDC", color: "#60A5FA" },
      { symbol: "DAI", color: "#FCD34D" },
      { symbol: "USDT", color: "#26A17B" },
      { symbol: "FRAX", color: "#93C5FD" },
    ],
  },
  defi: {
    label: "DeFi Throwdown",
    tokens: [
      { symbol: "UNI", color: "#F472B6" },
      { symbol: "AAVE", color: "#7C3AED" },
      { symbol: "LDO", color: "#10B981" },
      { symbol: "CRV", color: "#3B82F6" },
    ],
  },
  meme: {
    label: "Meme Coin Match",
    tokens: [
      { symbol: "PEPE", color: "#84CC16" },
      { symbol: "SHIB", color: "#F87171" },
      { symbol: "FLOKI", color: "#EAB308" },
      { symbol: "TURBO", color: "#FBBF24" },
    ],
  },
} as const

export default function TokenWarGame() {
  const [phase, setPhase] = useState<
    "lobby" | "selecting" | "locked" | "results"
  >("lobby")
  const [selectedToken, setSelectedToken] = useState<string | null>(null)
  const [winningToken, setWinningToken] = useState<string>("USDC")
  const [leaderboard, setLeaderboard] = useState<
    { round: number; winner: string; picked: string | null }[]
  >([])
  const [round, setRound] = useState(1)
  const [timeLeft, setTimeLeft] = useState(10)
  const [gameMode, setGameMode] =
    useState<keyof typeof GAME_MODES>("stablecoin")
  const [tokenTrends, setTokenTrends] = useState<Record<string, number[]>>({})

  const TOKENS = GAME_MODES[gameMode].tokens
  const startGame = async () => {
    setSelectedToken(null)
    setPhase("selecting")
    setTimeLeft(10)

    try {
      const res = await fetch(`/api/token-war?mode=${gameMode}`)
      const json = await res.json()
      const data = json.data as Record<string, number[]>

      setTokenTrends(data)

      // Determine token with highest inflow (latest value)
      const winner = Object.entries(data).reduce(
        (max, [symbol, trend]) => {
          const latest = trend.at(-1) ?? 0
          const maxVal = max[1].at(-1) ?? 0
          return latest > maxVal ? [symbol, trend] : max
        },
        ["", [] as number[]]
      )[0]

      setWinningToken(winner)
    } catch (err) {
      console.error("Failed to fetch token trend data:", err)
    }
  }

  const lockChoice = (token: string) => {
    setSelectedToken(token)
    setPhase("locked")

    // Simulate async round resolution after timer
    setTimeout(() => {
      setPhase("results")
      setLeaderboard((prev) => [
        ...prev,
        { round, winner: winningToken, picked: token },
      ])
      setRound((r) => r + 1)
    }, 10000)
  }

  useEffect(() => {
    if (phase === "locked") {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [phase])

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Phase Explanation */}
      <div className="max-w-2xl text-center mb-8 text-white/50 text-sm sm:text-base">
        {phase === "lobby" && (
          <p className="text-xl font-medium text-white/60">
            Welcome to{" "}
            <span className="font-medium text-foreground">Token War</span> —
            predict the most active token on Ethereum! Click "Start Round" to
            begin.
          </p>
        )}
        {phase === "selecting" && (
          <p>
            Pick the token you believe had the{" "}
            <span className="font-medium text-foreground">highest inflow</span>{" "}
            in the last hour.
          </p>
        )}
        {phase === "locked" && (
          <p>Locked in! Analyzing the on-chain activity... Countdown below.</p>
        )}
        {phase === "results" && (
          <p>Round over! Here's the winner. Start a new round to continue.</p>
        )}
      </div>

      {/* Lobby Phase */}
      {phase === "lobby" && (
        <div className="flex flex-col items-center gap-6">
          {/* Mode Selector */}
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(GAME_MODES).map(([key, { label }]) => (
              <Button
                key={key}
                variant={key === gameMode ? "default" : "outline"}
                className={cn(
                  "rounded-xl text-sm px-5 font-medium",
                  key === gameMode ? "bg-primary text-black" : "text-white/70"
                )}
                onClick={() => setGameMode(key as keyof typeof GAME_MODES)}
              >
                {label}
              </Button>
            ))}
          </div>

          {/* Selected mode subtitle */}
          <p className="text-sm text-muted-foreground ">
            You’ve selected:{" "}
            <span className="text-primary">{GAME_MODES[gameMode].label}</span>
          </p>

          {/* Start Button */}
          <Button
            size="lg"
            className="text-lg px-10 py-6 text-black bg-primary rounded-xl font-medium"
            onClick={startGame}
          >
            Start Round
          </Button>
        </div>
      )}

      {/* Selecting Phase */}
      {phase === "selecting" && (
        <TokenSelectGrid
          tokens={[...TOKENS]} // This removes the readonly constraint
          selected={selectedToken}
          onSelect={lockChoice}
        />
      )}

      {/* Locked Phase */}
      {phase === "locked" && (
        <div className="flex flex-col items-center gap-4 mt-6">
          <div className="text-xl text-white">
            You picked:{" "}
            <span className="text-primary font-semibold">{selectedToken}</span>
          </div>
          {/* Animated Circular Timer */}
          <div className="relative w-24 h-24">
            <svg
              className="absolute top-0 left-0 transform -rotate-90"
              width="100"
              height="100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#333"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#10b981"
                strokeWidth="10"
                fill="none"
                strokeDasharray={283}
                strokeDashoffset={(283 * timeLeft) / 10}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white ">
              {timeLeft}s
            </div>
          </div>
        </div>
      )}

      {/* Results Phase */}
      {phase === "results" && (
        <div className="w-full flex flex-col items-center gap-8 mt-8">
          {/* Token result grid with sparkline */}
          <div className="grid grid-cols-2 gap-6 w-full max-w-xl">
            {TOKENS.map((token) => (
              <TokenCard
                key={token.symbol}
                symbol={token.symbol}
                color={token.color}
                trendData={tokenTrends[token.symbol] || []}
                selected={selectedToken === token.symbol}
              
              />
            ))}
          </div>

          {/* Result Summary */}
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white/90">
              <span className="text-white/50">Round {round - 1}</span> Result
            </h2>

            <p className="text-lg">
              Winning Token:{" "}
              <span className="font-semibold text-green-300">
                {winningToken}
              </span>
            </p>

            {/* Optional: Calculate delta between last 2 points */}
            {tokenTrends[winningToken]?.length >= 2 && (
              <p className="text-sm text-muted-foreground">
                (
                {(
                  ((tokenTrends[winningToken].at(-1)! -
                    tokenTrends[winningToken].at(-2)!) /
                    tokenTrends[winningToken].at(-2)!) *
                  100
                ).toFixed(2)}
                % tx delta)
              </p>
            )}

            <p className="text-sm text-muted-foreground">
              You picked:{" "}
              <span className="text-white font-medium">{selectedToken}</span>
            </p>

            <Button
              onClick={() => setPhase("lobby")}
              className="mt-2 rounded-xl font-medium"
            >
              Start Next Round
            </Button>
          </motion.div>
        </div>
      )}

      {leaderboard.length > 0 && (
        <div className="mt-12 w-full max-w-xl border p-4 rounded-xl shadow-inner">
          <h3 className="text-lg font-semibold mb-2">Leaderboard History</h3>

          <div className="max-h-64 overflow-y-auto pr-2">
            <ul className="space-y-1 text-sm text-white/70">
              {leaderboard.map((entry) => (
                <li key={entry.round} className="flex justify-between">
                  <span>Round {entry.round}</span>
                  <span>
                    Winner:{" "}
                    <span className="text-green-300">{entry.winner}</span> |
                    You:{" "}
                    <span
                      className={
                        entry.picked === entry.winner
                          ? "text-emerald-400"
                          : "text-red-400"
                      }
                    >
                      {entry.picked}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
