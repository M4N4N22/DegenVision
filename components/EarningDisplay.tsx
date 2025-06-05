"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, Target, Trophy, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const EarningsDisplay = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Mock earnings data - in real app, this would come from context/state management
  const earningsData = {
    totalStaked: 47.50,
    totalWon: 89.30,
    totalLost: 23.75,
    netProfit: 65.55,
    winRate: 68.2,
    roundsPlayed: 15,
    winStreak: 3,
    bestStreak: 7,
    avgStake: 3.17,
    mostFrequentPrediction: 'UP',
    recentRounds: [
      { stake: 5, result: 'won', payout: 9.50 },
      { stake: 2, result: 'lost', payout: 0 },
      { stake: 1, result: 'won', payout: 1.90 },
      { stake: 10, result: 'won', payout: 19.00 },
      { stake: 3, result: 'lost', payout: 0 }
    ]
  };

  const profitMargin = ((earningsData.netProfit / earningsData.totalStaked) * 100);

  return (
    <div className="glass-card p-6 mb-6">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <BarChart3 className="w-5 h-5 text-blue-400" />
          <div>
            <h3 className="text-lg font-bold text-white">Earnings Summary</h3>
            <p className="text-sm text-gray-400">{earningsData.roundsPlayed} rounds played</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-xl font-bold ${earningsData.netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {earningsData.netProfit >= 0 ? '+' : ''}${earningsData.netProfit.toFixed(2)}
          </div>
          <div className="text-sm text-gray-400">Net P&L</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-3 mt-4">
        <div className="glass p-3 rounded-xl text-center">
          <div className="text-green-400 font-bold text-lg">${earningsData.totalWon.toFixed(2)}</div>
          <div className="text-xs text-gray-400">Total Won</div>
        </div>
        <div className="glass p-3 rounded-xl text-center">
          <div className="text-red-400 font-bold text-lg">${earningsData.totalLost.toFixed(2)}</div>
          <div className="text-xs text-gray-400">Total Lost</div>
        </div>
        <div className="glass p-3 rounded-xl text-center">
          <div className="text-purple-400 font-bold text-lg">{earningsData.winRate.toFixed(1)}%</div>
          <div className="text-xs text-gray-400">Win Rate</div>
        </div>
        <div className="glass p-3 rounded-xl text-center">
          <div className="text-yellow-400 font-bold text-lg">{earningsData.winStreak}</div>
          <div className="text-xs text-gray-400">Streak</div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-6 space-y-4 animate-fade-in">
          {/* Detailed Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Staked:</span>
                <span className="text-white font-medium">${earningsData.totalStaked.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Profit Margin:</span>
                <span className={`font-medium ${profitMargin >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {profitMargin >= 0 ? '+' : ''}{profitMargin.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Best Streak:</span>
                <span className="text-yellow-400 font-medium">{earningsData.bestStreak} wins</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Avg Stake:</span>
                <span className="text-white font-medium">${earningsData.avgStake.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Preferred:</span>
                <div className="flex items-center gap-1">
                  {earningsData.mostFrequentPrediction === 'UP' ? 
                    <TrendingUp className="w-4 h-4 text-green-400" /> :
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  }
                  <span className="text-white font-medium">{earningsData.mostFrequentPrediction}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Rounds:</span>
                <span className="text-white font-medium">{earningsData.roundsPlayed}</span>
              </div>
            </div>
          </div>

          {/* Recent Performance */}
          <div className="pt-4 border-t border-white/10">
            <h4 className="text-sm text-gray-400 mb-3 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Last 5 Rounds
            </h4>
            <div className="space-y-2">
              {earningsData.recentRounds.map((round, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${
                      round.result === 'won' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {round.result === 'won' ? 'W' : 'L'}
                    </Badge>
                    <span className="text-gray-400">Stake: ${round.stake.toFixed(2)}</span>
                  </div>
                  <span className={`font-medium ${
                    round.result === 'won' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {round.result === 'won' ? '+' : '-'}${round.result === 'won' ? round.payout.toFixed(2) : round.stake.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Indicators */}
          {earningsData.winStreak >= 3 && (
            <div className="glass p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-medium">Hot Streak Active!</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {earningsData.winStreak} consecutive wins. Keep it going!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EarningsDisplay;
