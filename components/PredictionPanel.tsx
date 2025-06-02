"use client"

import { useState } from "react"
import { Minus, Target, Timer, TrendingDown, TrendingUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface PredictionOption {
  id: string
  label: string
  icon: any
  color: string
  gradient: string
}

const PredictionPanel = () => {
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(
    null
  )
  const [timeRemaining, setTimeRemaining] = useState(583) // 9:43 in seconds
  const [currentRound, setCurrentRound] = useState(47)
  const [tokensStaked, setTokensStaked] = useState(0)

  const predictionOptions: PredictionOption[] = [
    {
      id: "up",
      label: "Will Go Up",
      icon: TrendingUp,
      color: "text-green-400",
      gradient: "from-green-600 to-emerald-600",
    },
    {
      id: "down",
      label: "Will Go Down",
      icon: TrendingDown,
      color: "text-red-400",
      gradient: "from-red-600 to-rose-600",
    },
  ]

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handlePrediction = (predictionId: string) => {
    setSelectedPrediction(predictionId)
    setTokensStaked(100) // Mock staking amount
  }

  return (
    <div className="bg-gradient-to-t from-black via-sky-700/30 to-green-400/30 rounded-3xl   p-6">
      <div className="mb-6 flex flex-col ">
        <div>
          <h2 className="mb-1 text-xl font-bold text-white">
            Make Your Prediction
          </h2>
          <p className="text-sm text-gray-400">
            Wallet: 0x742d...8e3a • ETH Holdings
          </p>
        </div>
        <div className="text-left">
          <div className="mb-1 flex items-center gap-2 mt-1">
            <Target className="size-4 text-blue-400" />
            <span className="text-sm text-gray-400 flex">
              Round #{currentRound}
            </span>
          </div>
          <Badge
            variant="outline"
            className="border-purple-500/20 bg-purple-500/10 text-purple-400"
          >
            Active
          </Badge>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className=" mb-6 rounded-xl p-4 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <Timer className="size-5 text-blue-400" />
          <span className=" text-lg font-bold">Time Remaining</span>
        </div>
        <div className=" font-mono text-3xl font-bold text-white">
          {formatTime(timeRemaining)}
        </div>
        <div className="mt-3 h-2 w-full rounded-full bg-gray-700 neon-glow">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-green-500 to-sky-500 transition-all duration-1000"
            style={{ width: `${(timeRemaining / 600) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Prediction Options */}
      <div className="mb-6 grid grid-cols-1 gap-3">
        {predictionOptions.map((option) => {
          const Icon = option.icon
          const isSelected = selectedPrediction === option.id

          return (
            <Button
              key={option.id}
              variant="outline"
              className={` rounded-3xl h-16 border-2 transition-all duration-300 hover:scale-105 bg-white/5 ${
                isSelected
                  ? `border-white/40 bg-gradient-to-r ${option.gradient} neon-glow`
                  : "border-white/20 hover:border-white/30"
              }`}
              onClick={() => handlePrediction(option.id)}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`size-6 ${isSelected ? "text-white" : option.color}`}
                />
                <span
                  className={`text-lg font-semibold ${isSelected ? "text-white" : "text-gray-300"}`}
                >
                  {option.label}
                </span>
                {isSelected && (
                  <Badge className="ml-auto bg-white/20 text-white">
                    Selected
                  </Badge>
                )}
              </div>
            </Button>
          )
        })}
      </div>

      {/* Prediction Summary */}
      {selectedPrediction && (
        <div className="glass animate-fade-in rounded-xl p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-gray-400">Your Prediction</span>
            <Badge className="border-green-500/20 bg-green-500/20 text-green-400">
              Confirmed
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-white">
                {
                  predictionOptions.find((p) => p.id === selectedPrediction)
                    ?.label
                }
              </div>
              <div className="text-sm text-gray-400">
                Tokens Staked: {tokensStaked}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Potential Reward</div>
              <div className="font-bold text-green-400">
                +{tokensStaked * 1.8} tokens
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PredictionPanel
