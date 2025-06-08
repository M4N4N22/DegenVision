"use client"

import { useEffect, useState } from "react"
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
import { FaEthereum } from "react-icons/fa"

import { useTokenPrice } from "@/hooks/useEthPrice"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface PredictionOption {
  id: string
  label: string
  icon: any
  color: string
  gradient: string
}

interface PredictionPanelProps {
  cryptoName: string
}
const PredictionPanel = ({ cryptoName }: PredictionPanelProps) => {
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(
    null
  )
  const [selectedDuration, setSelectedDuration] = useState<string>("60")
  const [stakeAmount, setStakeAmount] = useState<number>(1)
  const [customStake, setCustomStake] = useState<string>("")
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const [currentRound, setCurrentRound] = useState(47)
  const [roundActive, setRoundActive] = useState(false)
  const [startPrice, setStartPrice] = useState<number | null>(null)
  const [endPrice, setEndPrice] = useState<number | null>(null)
  const [result, setResult] = useState<"won" | "lost" | "tie" | null>(null)
  const [autoRoundMode, setAutoRoundMode] = useState(false)
  const [winStreak, setWinStreak] = useState(0)
  const [showRewardAnimation, setShowRewardAnimation] = useState(false)
  const [startingRound, setStartingRound] = useState(false)
  const [endingRound, setEndingRound] = useState(false)

  // Mock current ETH price and multipliers
  const { data, loading, fetchPrice } = useTokenPrice(
    cryptoName.toLowerCase(),
    "usd"
  )
  const currentEthPrice = data?.currentPrice ?? null

  const baseMultiplier = 1.9
  const estimatedReward = stakeAmount * baseMultiplier

  const predictionOptions: PredictionOption[] = [
    {
      id: "up",
      label: "Price will go UP",
      icon: TrendingUp,
      color: "text-green-400",
      gradient: "from-green-700 via-green-600 to-green-700",
    },
    {
      id: "down",
      label: "Price will go DOWN",
      icon: TrendingDown,
      color: "text-red-400",
      gradient: "from-red-700 via-red-600 to-red-700",
    },
  ]

  const durationOptions = [
    { value: "30", label: "30 seconds" },
    { value: "60", label: "1 minute" },
    { value: "300", label: "5 minutes" },
    { value: "900", label: "15 minutes" },
    { value: "3600", label: "1 hour" },
  ]

  const quickStakeAmounts = [0.5, 1, 5, 10, 25]

  // Countdown timer effect
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0) return

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          setRoundActive(false)
          handleRoundEnd()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timeRemaining])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const startRound = async () => {
    if (!selectedPrediction || stakeAmount <= 0) return

    setStartingRound(true)
    await fetchPrice()
    setStartingRound(false)

    if (!currentEthPrice) return // Just in case fetch fails

    setStartPrice(currentEthPrice)
    setTimeRemaining(parseInt(selectedDuration))
    setRoundActive(true)
    setEndPrice(null)
    setResult(null)
    setShowRewardAnimation(false)
    setCurrentRound((prev) => prev + 1)
  }

  const handleRoundEnd = async () => {
    setEndingRound(true)
    await fetchPrice()
    setEndingRound(false)
    const latestPrice = data?.currentPrice
    if (!latestPrice || !startPrice || !selectedPrediction) return

    setEndPrice(latestPrice)

    const priceChange = latestPrice - startPrice
    let roundResult: "won" | "lost" | "tie"

    if (Math.abs(priceChange) < 0.01) {
      roundResult = "tie"
    } else if (selectedPrediction === "up" && priceChange > 0) {
      roundResult = "won"
      setWinStreak((prev) => prev + 1)
    } else if (selectedPrediction === "down" && priceChange < 0) {
      roundResult = "won"
      setWinStreak((prev) => prev + 1)
    } else {
      roundResult = "lost"
      setWinStreak(0)
    }

    setResult(roundResult)
    setShowRewardAnimation(true)

    if (autoRoundMode && roundResult !== "tie") {
      setTimeout(resetRound, 3000)
    }
  }

  const checkResult = () => {
    if (timeRemaining === 0 && !endPrice) {
      handleRoundEnd()
    }
  }

  const resetRound = () => {
    setSelectedPrediction(null)
    setTimeRemaining(null)
    setRoundActive(false)
    setStartPrice(null)
    setEndPrice(null)
    setResult(null)
    setShowRewardAnimation(false)
  }

  const handleStakeAmountChange = (amount: number) => {
    setStakeAmount(amount)
    setCustomStake("")
  }

  const handleCustomStakeChange = (value: string) => {
    setCustomStake(value)
    const numValue = parseFloat(value)
    if (!isNaN(numValue) && numValue > 0) {
      setStakeAmount(numValue)
    }
  }

  return (
    <div className=" p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">
            {cryptoName} Price Prediction
          </h2>

          <p className="text-sm text-white/50 items-center gap-2 hidden">
            Current ETH:{" "}
            {loading ? (
              <span className="text-yellow-300 animate-pulse ml-1">
                Loading...
              </span>
            ) : currentEthPrice ? (
              <span className="text-green-400 ml-1">
                ${currentEthPrice.toFixed(2)}
              </span>
            ) : (
              <span className="text-red-400 ml-1">Unavailable</span>
            )}
          </p>
          <button
            onClick={fetchPrice}
            className="text-sm hidden text-yellow-300 border border-yellow-300 px-3 py-1 rounded hover:bg-yellow-300 hover:text-black transition"
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
        <div className="text-right flex items-center gap-2">
          <div className=" items-center gap-1 hidden">
            <Target className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-white/50">Round #{currentRound}</span>
          </div>
          <Badge
            variant="outline"
            className={`border-purple-500/20 ${roundActive ? "bg-green-500/10 text-green-400" : "bg-purple-500/10 text-purple-400"}`}
          >
            {roundActive ? "Active" : "Setup"}
          </Badge>
          {winStreak > 0 && (
            <div className="flex items-center gap-1 mt-1">
              <Trophy className="w-3 h-3 text-yellow-400" />
              <span className="text-xs text-yellow-400">
                Streak: {winStreak}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Auto-Round Toggle */}
      <div className="mb-4 glass-card p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-white text-sm font-semibold text-center md:text-left">
              Auto-Round Mode
            </span>
            <p className="text-xs text-white/50 mt-1">
              Automatically start next round after result
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRoundMode(!autoRoundMode)}
            className={`border-white/20 text-xs rounded-xl ${autoRoundMode ? "bg-purple-500/20 text-purple-400" : "text-white/50"}`}
          >
            {autoRoundMode ? "ON" : "OFF"}
          </Button>
        </div>
      </div>
      {(startingRound || endingRound) && (
        <div className="glass-card p-6 mt-4 text-center">
          <h3 className="text-white text-lg font-semibold">
            {startingRound ? "Starting round..." : "Calculating result..."}
          </h3>
          <p className="text-white/50 mt-2">Please wait a moment.</p>
        </div>
      )}

      {/* Round Setup */}
      {!roundActive && !result && !startingRound && !endingRound && (
        <div className="">
          <div className="glass-card p-4 flex flex-col justify-start h-fit mt-4">
            <div>
              {/* Heading about what prediction means */}
              <h3 className="text-white text-sm font-semibold mb-4 text-center md:text-left flex items-center">
                Predict {cryptoName} Price Direction
              </h3>

              {/* Side-by-side buttons for Up and Down */}
              <div className="flex gap-2 justify-center md:justify-start rounded-full">
                {predictionOptions.map((option) => {
                  const Icon = option.icon
                  const isSelected = selectedPrediction === option.id

                  return (
                    <Button
                      key={option.id}
                      variant="outline"
                      className={` rounded-xl flex-1 h-16 border-2 transition-all duration-300 flex items-center justify-center gap-2 text-lg font-semibold ${
                        isSelected
                          ? ` bg-gradient-to-br ${option.gradient}  text-white`
                          : "border-white/20 text-gray-300 hover:border-white/10 hover:text-white"
                      }`}
                      onClick={() => setSelectedPrediction(option.id)}
                    >
                      <Icon
                        className={`w-6 h-6 ${isSelected ? "text-white" : option.color}`}
                      />
                      {option.id === "up" ? "Buy UP" : "Buy DOWN"}
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Start Button */}
            <div className="mt-4 w-full mx-auto">
              <Button
                onClick={startRound}
                disabled={!selectedPrediction || stakeAmount <= 0}
                className="w-full  rounded-full bg-emerald-500 hover:bg-emerald-600 text-background h-14 text-base font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="w-full flex justify-between items-center px-4 ">
                  <span>Lock Prediction</span>
                  <span>${stakeAmount.toFixed(2)}</span>
                </div>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Left Column: Stake + Duration */}
            <div className="glass-card p-4  items-center flex w-full ">
              {/* Stake */}
              <div className="space-y-4 w-full">
                <label className="text-white text-sm font-semibold mb-4 text-center md:text-left">
                  Select Stake Amount
                </label>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  {quickStakeAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => handleStakeAmountChange(amount)}
                      className={`glass border-white/20 text-sm ${
                        stakeAmount === amount && !customStake
                          ? " bg-white text-black hover:text-black hover:bg-white/80"
                          : "text-white/70 hover:bg-white/10"
                      }`}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>

                <Input
                  type="number"
                  placeholder="Custom amount"
                  value={customStake}
                  onChange={(e) => handleCustomStakeChange(e.target.value)}
                  className="glass border-white/20 text-white  placeholder:text-white/50"
                  min="0.01"
                  step="0.01"
                />
              </div>

              {/* Duration */}

              {/* Reward Summary */}
            </div>

            {/* Right Column: Prediction + Start */}
            <div className="glass-card p-4 flex flex-col justify-start h-fit gap-4">
              <div className="space-y-4">
                <label className="text-white text-sm font-semibold mb-4 text-center md:text-left">
                  Select Round Duration
                </label>
                <Select
                  value={selectedDuration}
                  onValueChange={setSelectedDuration}
                >
                  <SelectTrigger className="glass border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass bg-black border-white/20 flex flex-col gap-1">
                    {durationOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="text-white rounded-full bg-transparent data-[state=checked]:bg-white/15 hover:bg-white/10 focus:bg-white/10 focus:text-white"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Reward Summary */}
              <div className="p-4 glass rounded-xl">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Stake Amount:</span>
                  <span className="text-white font-bold">
                    ${stakeAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-white/50">Multiplier:</span>
                  <span className="text-purple-400">x{baseMultiplier}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1 pt-2 border-t border-white/10">
                  <span className="text-white/70">Win Payout:</span>
                  <span className="text-green-400 font-bold">
                    ${estimatedReward.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Round */}
      {roundActive && timeRemaining !== null && (
        <div className="space-y-6">
          {/* Round Info */}
          <div className="glass p-4 rounded-xl">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm text-white/50">Start Price</div>
                <div className="text-lg font-bold text-white">
                  ${startPrice?.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-sm text-white/50">Your Prediction</div>
                <div
                  className={`text-lg font-bold ${selectedPrediction === "up" ? "text-green-400" : "text-red-400"}`}
                >
                  {selectedPrediction === "up" ? "UP" : "DOWN"}
                </div>
              </div>
              <div>
                <div className="text-sm text-white/50">Stake</div>
                <div className="text-lg font-bold text-primary">
                  ${stakeAmount.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className=" p-4 rounded-xl text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-lg font-bold">Time Remaining</span>
            </div>
            <div className="text-4xl font-mono font-bold text-white ">
              {formatTime(timeRemaining)}
            </div>
            <div className="w-full bg-white/30 rounded-full h-2 mt-3">
              <div
                className="bg-gradient-to-l neon-glow from-white to-emerald-500 h-2 rounded-full transition-all duration-1000"
                style={{
                  width: `${(timeRemaining / parseInt(selectedDuration)) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Round Results */}
      {result && endPrice && !endingRound && (
        <div className="space-y-6 animate-fade-in">
          {/* Result Badge */}
          <div className="glass p-4 rounded-xl text-center">
            <Badge
              className={`text-base px-4 py-2 mb-4 bg-transparent border-none hover:bg-transparent ${
                result === "won"
                  ? " text-green-400 "
                  : result === "lost"
                    ? " text-red-400 "
                    : " text-yellow-400 "
              }`}
            >
              {result === "won"
                ? "Nailed it! Your prediction was right."
                : result === "lost"
                  ? "Missed it! Your prediction was off."
                  : "It’s a tie — no significant price change."}
            </Badge>

            {/* Reward Calculation */}
            <div
              className={`p-4 rounded-3xl ${showRewardAnimation ? "" : ""} ${
                result === "won"
                  ? " border border-green-500/50"
                  : result === "lost"
                    ? " border border-red-500/50"
                    : "border border-yellow-500/50"
              }`}
            >
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Stake Amount:</span>
                  <span className="text-white">${stakeAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Multiplier:</span>
                  <span className="text-purple-400">x{baseMultiplier}</span>
                </div>
                <div className="border-t border-white/10 pt-2">
                  <div className="flex justify-between">
                    <span className="text-white/70">Result:</span>
                    <span
                      className={`font-bold text-lg ${
                        result === "won"
                          ? "text-green-400"
                          : result === "lost"
                            ? "text-red-400"
                            : "text-yellow-400"
                      }`}
                    >
                      {result === "won"
                        ? `+$${estimatedReward.toFixed(2)}`
                        : result === "lost"
                          ? `-$${stakeAmount.toFixed(2)}`
                          : "$0.00"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Price Movement */}
          <div className="glass p-4 rounded-xl">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm text-white/50">Start Price</div>
                <div className="text-lg font-bold text-white">
                  ${startPrice?.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-sm text-white/50">End Price</div>
                <div className="text-lg font-bold text-white">
                  ${endPrice.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-sm text-white/50">Change</div>
                <div
                  className={`text-lg font-bold ${
                    endPrice > (startPrice || 0)
                      ? "text-green-400"
                      : endPrice < (startPrice || 0)
                        ? "text-red-400"
                        : "text-white/50"
                  }`}
                >
                  {endPrice > (startPrice || 0) ? "+" : ""}$
                  {(endPrice - (startPrice || 0)).toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={resetRound}
              className="w-full  rounded-full bg-emerald-500 hover:bg-emerald-600 text-background h-14 text-base font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              New Round
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PredictionPanel
