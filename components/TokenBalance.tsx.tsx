

import { Coins, TrendingUp, Award, DollarSign, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TokenBalance = () => {
  // Updated to show USDC balance and Alpha tokens separately
  const usdcBalance = 1247.63;
  const alphaTokens = 2847;
  const todayEarnings = 156.75;
  const rank = 23;
  const winRate = 72;
  const totalProfit = 423.45;

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Balance & Rewards</h2>
        <Badge variant="outline" className="border-gold-500/20 bg-yellow-500/10 text-yellow-400">
          Elite Trader
        </Badge>
      </div>

      {/* USDC Balance */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <DollarSign className="w-8 h-8 text-green-400" />
          <span className="text-4xl font-bold text-green-400">${usdcBalance.toFixed(2)}</span>
        </div>
        <p className="text-white/50">Available USDC</p>
      </div>

      {/* Alpha Tokens */}
      <div className="glass p-4 rounded-xl mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Coins className="w-6 h-6 text-yellow-400" />
          <span className="text-2xl font-bold text-emerald-500">{alphaTokens.toLocaleString()}</span>
        </div>
        <p className="text-sm text-white/50">Alpha Tokens</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6 ">
        <div className="glass p-4 rounded-xl text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-lg font-bold text-green-400">+${todayEarnings.toFixed(2)}</span>
          </div>
          <p className="text-xs text-white/50">Today's Profit</p>
        </div>
        
        <div className="glass p-4 rounded-xl text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Award className="w-4 h-4 text-purple-400" />
            <span className="text-lg font-bold text-purple-400">#{rank}</span>
          </div>
          <p className="text-xs text-white/50">Global Rank</p>
        </div>
      </div>

      {/* Total Profit */}
      <div className="glass p-4 rounded-xl mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-white/50">Total Profit</span>
          <span className="font-bold text-green-400 text-lg">+${totalProfit.toFixed(2)}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full neon-glow-green"
            style={{ width: '75%' }}
          ></div>
        </div>
      </div>

      {/* Win Rate */}
      <div className="glass p-4 rounded-xl mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-white/50">Prediction Accuracy</span>
          <span className="font-bold text-green-400">{winRate}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full neon-glow-green"
            style={{ width: `${winRate}%` }}
          ></div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="pt-4 border-t border-white/10">
        <p className="text-sm text-white/50 mb-3">Recent Achievements</p>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/20">
            Streak Master
          </Badge>
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/20">
            ETH Prophet
          </Badge>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/20">
            Big Winner
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default TokenBalance;
