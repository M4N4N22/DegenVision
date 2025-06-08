"use client"

import { useEffect, useRef, useState } from "react"

interface WhaleTx {
  txHash: string
  from: string
  to: string
  value: number
  blockNumber: number
  timestamp: number
}

interface WhalePredictionPanelProps {
  whales: WhaleTx[]
}

type Phase = "waiting" | "active" | "locked" | "revealing" | "result"

interface RangeOption {
  label: string
  min: number
  max: number
  multiplier: number
}

const ROUND_DURATION = 10 // seconds to place bets
const REVEAL_INTERVAL = 2000 // ms between revealing each tx
const RESULT_DISPLAY = 7 // seconds
const NUM_TXS_TO_SUM = 10
const LARGE_THRESHOLD = 2000 // min value to consider tx a whale

const RANGE_OPTIONS: RangeOption[] = [
  { label: "0 - 30,000", min: 0, max: 30_000, multiplier: 1.3 }, // widest, easiest to hit, lowest payout
  { label: "30,001 - 70,000", min: 30_001, max: 70_000, multiplier: 2.2 }, // medium range, moderate odds and payout
  { label: "70,001 - 120,000", min: 70_001, max: 120_000, multiplier: 4 }, // narrower, less likely, higher payout
  { label: "120,001+", min: 120_001, max: Infinity, multiplier: 7 }, // hardest to hit, highest payout
]

export default function WhalePredictionPanel({
  whales,
}: WhalePredictionPanelProps) {
  const [hydrated, setHydrated] = useState(false)
  const [phase, setPhase] = useState<Phase>("waiting")
  const [timeRemaining, setTimeRemaining] = useState(ROUND_DURATION)
  const [userRange, setUserRange] = useState<RangeOption | null>(null)
  const [roundWhales, setRoundWhales] = useState<WhaleTx[]>([])
  const [revealedTxs, setRevealedTxs] = useState<WhaleTx[]>([])
  const [currentSum, setCurrentSum] = useState(0)
  const [result, setResult] = useState<"win" | "lose" | null>(null)
  const [roundNumber, setRoundNumber] = useState(1)

  const revealIndex = useRef(0)
  const revealTimeout = useRef<NodeJS.Timeout | null>(null)
  const countdownInterval = useRef<ReturnType<typeof setInterval> | null>(null)
  const roundWhalesRef = useRef<WhaleTx[]>([])
  // On initial hydration, set hydrated flag (once)
  useEffect(() => {
    setHydrated(true)
  }, [])

  // Update roundWhalesRef only when whales change, but do NOT start new round here
  useEffect(() => {
    const filtered = whales
      .filter((tx) => tx.value >= LARGE_THRESHOLD)
      .sort((a, b) => a.timestamp - b.timestamp)
    roundWhalesRef.current = filtered
  }, [whales])

  // Start the first round manually after hydration
  useEffect(() => {
    if (hydrated && phase === "waiting") {
      startNewRound()
    }
  }, [hydrated, phase])

  // Countdown timer for placing bets
  useEffect(() => {
    if (!hydrated || phase !== "active") return
    setTimeRemaining(ROUND_DURATION)
    countdownInterval.current = setInterval(() => {
      setTimeRemaining((t) => {
        if (t <= 1) {
          clearInterval(countdownInterval.current!)
          setPhase("locked")
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => {
      if (countdownInterval.current) clearInterval(countdownInterval.current)
    }
  }, [phase, hydrated])

  // When phase switches to locked, start revealing txs one by one
  useEffect(() => {
    if (phase !== "locked") return
    if (!userRange) {
      // no bet placed
      setResult(null)
      setPhase("result")
      return
    }
    setRevealedTxs([])
    setCurrentSum(0)
    revealIndex.current = 0
    setPhase("revealing")
  }, [phase, userRange])

  // Reveal txs one by one every REVEAL_INTERVAL ms
  useEffect(() => {
    if (phase !== "revealing") return

    if (
      revealIndex.current >= NUM_TXS_TO_SUM ||
      revealIndex.current >= roundWhales.length
    ) {
      // finished revealing
      // Evaluate win/lose
      const sum = currentSum
      const win = userRange && sum >= userRange.min && sum <= userRange.max
      setResult(win ? "win" : "lose")
      setPhase("result")
      return
    }

    revealTimeout.current = setTimeout(() => {
      const nextTx = roundWhales[revealIndex.current]
      setRevealedTxs((prev) => [...prev, nextTx])
      setCurrentSum((prev) => prev + nextTx.value)
      revealIndex.current += 1
    }, REVEAL_INTERVAL)

    return () => {
      if (revealTimeout.current) clearTimeout(revealTimeout.current)
    }
  }, [phase, revealedTxs, currentSum, roundWhales, userRange])

  // After showing result, reset game after RESULT_DISPLAY seconds
  useEffect(() => {
    if (phase !== "result") return
    const timer = setTimeout(() => {
      startNewRound()
    }, RESULT_DISPLAY * 1000)
    return () => clearTimeout(timer)
  }, [phase])

  function startNewRound() {
    setUserRange(null)
    setResult(null)
    setRevealedTxs([])
    setCurrentSum(0)
    setRoundWhales(roundWhalesRef.current)
    setPhase("active")
    setTimeRemaining(ROUND_DURATION)
    setRoundNumber((r) => r + 1)
  }

  return (
    <div className="p-6 rounded-2xl glass-card  shadow-xl max-w-lg mx-auto space-y-6 transition-all duration-300">
      <h2 className="text-3xl font-extrabold text-primary">
        Whale Sum Prediction
      </h2>

      <p className="text-white/80 leading-relaxed">
        Predict the sum of the <b className="text-white">{NUM_TXS_TO_SUM}</b>{" "}
        next large USDT whale transactions (≥{" "}
        <span className="text-white">
          {LARGE_THRESHOLD.toLocaleString()} USDT
        </span>
        ).
        <br />
        Choose a range and if the actual sum falls inside it, you win
        multipliers!
      </p>

      {phase === "active" && (
        <>
          <p className="mb-2 text-white/70">Select your range to bet:</p>
          <div className="grid grid-cols-1 gap-3">
            {RANGE_OPTIONS.map((range) => {
              const isSelected = userRange?.label === range.label
              return (
                <button
                  key={range.label}
                  onClick={() => setUserRange(range)}
                  className={`flex items-center justify-between px-4 py-2 rounded-xl font-semibold border transition-all duration-200
            ${
              isSelected
                ? "bg-primary text-black border-primary shadow-lg"
                : "bg-white/5 text-white hover:bg-white/10 border-white/10"
            }`}
                >
                  <span>{range.label} USDT</span>
                  <span className={isSelected ? "text-black" : "text-white/60"}>
                    x{range.multiplier}
                  </span>
                </button>
              )
            })}
          </div>
          <p className="mt-4 text-sm text-white/50">
            ⏳ Time left to place bet:{" "}
            <span className="text-white">{timeRemaining}s</span>
          </p>
        </>
      )}

      {(phase === "locked" || phase === "revealing" || phase === "result") && (
        <>
          <p className="text-white/70">
            Your bet:{" "}
            <span className="font-semibold text-white">
              {userRange ? `${userRange.label} USDT` : "No bet placed"}
            </span>
          </p>
          <p className="text-white/70">
            Revealing next <b>{NUM_TXS_TO_SUM}</b> whale txs:
          </p>

          <ul className="max-h-48 overflow-y-auto border border-white/10 rounded-xl p-3 space-y-1 text-sm bg-white/5 backdrop-blur-md">
            {revealedTxs.map((tx) => (
              <li
                key={tx.txHash}
                className="flex justify-between text-white/90"
              >
                <span>
                  {tx.txHash.slice(0, 6)}...{tx.txHash.slice(-4)}
                </span>
                <span>{tx.value.toLocaleString()} USDT</span>
              </li>
            ))}
            {phase === "revealing" && revealedTxs.length < NUM_TXS_TO_SUM && (
              <li className="italic text-white/40">Waiting for next tx...</li>
            )}
          </ul>

          <p className="mt-2 text-lg text-white">
            Current Sum:{" "}
            <b className="text-primary">{currentSum.toLocaleString()} USDT</b>
          </p>
        </>
      )}

      {phase === "result" && (
        <>
          {userRange ? (
            <p
              className={`text-2xl font-bold ${
                result === "win" ? "text-green-400" : "text-red-500"
              }`}
            >
              {result === "win"
                ? `🎉 You won! Multiplier: x${userRange.multiplier}`
                : "❌ You lost!"}
            </p>
          ) : (
            <p className="italic text-white/50">
              Round ended without placing a bet.
            </p>
          )}
          <p className="text-white/40 text-sm">New round starting soon...</p>
        </>
      )}
    </div>
  )
}
