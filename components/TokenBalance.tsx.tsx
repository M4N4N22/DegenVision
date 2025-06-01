

import { Coins, TrendingUp, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TokenBalance = () => {
  const balance = 2847;
  const todayEarnings = 156;
  const rank = 23;
  const winRate = 72;

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Your Alpha Score</h2>
        <Badge variant="outline" className="border-gold-500/20 bg-yellow-500/10 text-yellow-400">
          Elite Trader
        </Badge>
      </div>

      {/* Main Balance */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Coins className="w-8 h-8 text-yellow-400" />
          <span className="text-4xl font-bold gradient-text">{balance.toLocaleString()}</span>
        </div>
        <p className="text-gray-400">Total Alpha Tokens</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="glass p-4 rounded-xl text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-lg font-bold text-green-400">+{todayEarnings}</span>
          </div>
          <p className="text-xs text-gray-400">Today's Earnings</p>
        </div>
        
        <div className="glass p-4 rounded-xl text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Award className="w-4 h-4 text-purple-400" />
            <span className="text-lg font-bold text-purple-400">#{rank}</span>
          </div>
          <p className="text-xs text-gray-400">Global Rank</p>
        </div>
      </div>

      {/* Win Rate */}
      <div className="glass p-4 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Prediction Accuracy</span>
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
      <div className="mt-6 pt-6 border-t border-white/10">
        <p className="text-sm text-gray-400 mb-3">Recent Achievements</p>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/20">
            Streak Master
          </Badge>
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/20">
            ETH Prophet
          </Badge>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/20">
            Quick Draw
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default TokenBalance;
