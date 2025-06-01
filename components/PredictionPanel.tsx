"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Timer, Target } from "lucide-react";

interface PredictionOption {
  id: string;
  label: string;
  icon: any;
  color: string;
  gradient: string;
}

const PredictionPanel = () => {
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(583); // 9:43 in seconds
  const [currentRound, setCurrentRound] = useState(47);
  const [tokensStaked, setTokensStaked] = useState(0);

  const predictionOptions: PredictionOption[] = [
    {
      id: 'buy',
      label: 'Will Buy',
      icon: TrendingUp,
      color: 'text-green-400',
      gradient: 'from-green-600 to-emerald-600'
    },
    {
      id: 'sell',
      label: 'Will Sell',
      icon: TrendingDown,
      color: 'text-red-400',
      gradient: 'from-red-600 to-rose-600'
    },
    {
      id: 'hold',
      label: 'Will Hold',
      icon: Minus,
      color: 'text-yellow-400',
      gradient: 'from-yellow-600 to-orange-600'
    }
  ];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePrediction = (predictionId: string) => {
    setSelectedPrediction(predictionId);
    setTokensStaked(100); // Mock staking amount
  };

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Make Your Prediction</h2>
          <p className="text-sm text-gray-400">Wallet: 0x742d...8e3a • ETH Holdings</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Round #{currentRound}</span>
          </div>
          <Badge variant="outline" className="border-purple-500/20 bg-purple-500/10 text-purple-400">
            Active
          </Badge>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="glass p-4 rounded-xl mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Timer className="w-5 h-5 text-blue-400" />
          <span className="text-lg font-bold gradient-text">Time Remaining</span>
        </div>
        <div className="text-3xl font-mono font-bold text-white neon-glow">
          {formatTime(timeRemaining)}
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${(timeRemaining / 600) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Prediction Options */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        {predictionOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedPrediction === option.id;
          
          return (
            <Button
              key={option.id}
              variant="outline"
              className={`glass h-16 border-2 transition-all duration-300 hover:scale-105 ${
                isSelected 
                  ? `border-white/40 bg-gradient-to-r ${option.gradient} neon-glow` 
                  : 'border-white/20 hover:border-white/30'
              }`}
              onClick={() => handlePrediction(option.id)}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : option.color}`} />
                <span className={`font-semibold text-lg ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                  {option.label}
                </span>
                {isSelected && (
                  <Badge className="ml-auto bg-white/20 text-white">
                    Selected
                  </Badge>
                )}
              </div>
            </Button>
          );
        })}
      </div>

      {/* Prediction Summary */}
      {selectedPrediction && (
        <div className="glass p-4 rounded-xl animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400">Your Prediction</span>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/20">
              Confirmed
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-white">
                {predictionOptions.find(p => p.id === selectedPrediction)?.label}
              </div>
              <div className="text-sm text-gray-400">Tokens Staked: {tokensStaked}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Potential Reward</div>
              <div className="font-bold text-green-400">+{tokensStaked * 1.8} tokens</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionPanel;
