

import { Coins, TrendingUp, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TokenBalance = () => {
  const balance = 2847;
  const todayEarnings = 156;
  const rank = 23;
  const winRate = 72;

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Your Alpha Score</h2>
        <Badge variant="outline" className="border-gold-500/20 bg-yellow-500/10 text-yellow-400">
          Elite Trader
        </Badge>
      </div>

      {/* Main Balance */}
      <div className="mb-8 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <Coins className="size-8 text-yellow-400" />
          <span className="gradient-text text-4xl font-bold">{balance.toLocaleString()}</span>
        </div>
        <p className="text-gray-400">Total Alpha Tokens</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-3 grid grid-cols-2 gap-3">
        <div className="glass rounded-xl p-4 text-center">
          <div className="mb-1 flex items-center justify-center gap-1">
            <TrendingUp className="size-4 text-green-400" />
            <span className="text-lg font-bold text-green-400">+{todayEarnings}</span>
          </div>
          <p className="text-xs text-gray-400">Today&apos;s Earnings</p>
        </div>
        
        <div className="glass rounded-xl p-4 text-center">
          <div className="mb-1 flex items-center justify-center gap-1">
            <Award className="size-4 text-purple-400" />
            <span className="text-lg font-bold text-purple-400">#{rank}</span>
          </div>
          <p className="text-xs text-gray-400">Global Rank</p>
        </div>
      </div>

      {/* Win Rate */}
      <div className="glass rounded-xl p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-gray-400">Prediction Accuracy</span>
          <span className="font-bold text-green-400">{winRate}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-700">
          <div 
            className="neon-glow-green h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
            style={{ width: `${winRate}%` }}
          ></div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="mt-6 border-t border-white/10 pt-6">
        <p className="mb-3 text-sm text-gray-400">Recent Achievements</p>
        <div className="flex flex-wrap gap-2">
          <Badge className="border-blue-500/20 bg-blue-500/20 text-blue-400">
            Streak Master
          </Badge>
          <Badge className="border-purple-500/20 bg-purple-500/20 text-purple-400">
            ETH Prophet
          </Badge>
          <Badge className="border-green-500/20 bg-green-500/20 text-green-400">
            Quick Draw
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default TokenBalance;
