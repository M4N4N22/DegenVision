import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, Crown, Medal, Award } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  wallet: string;
  username?: string;
  tokens: number;
  winRate: number;
  streak: number;
  badge?: string;
}

const Leaderboard = () => {
  const leaderboardData: LeaderboardEntry[] = [
    {
      rank: 1,
      wallet: "0x8f2a...1b3c",
      username: "AlphaWolf",
      tokens: 15847,
      winRate: 89,
      streak: 12,
      badge: "Legendary"
    },
    {
      rank: 2,
      wallet: "0x4d5e...8f9a",
      username: "CryptoSage",
      tokens: 12453,
      winRate: 84,
      streak: 8,
      badge: "Elite"
    },
    {
      rank: 3,
      wallet: "0x1a2b...6c7d",
      username: "BlockChaineer",
      tokens: 9876,
      winRate: 81,
      streak: 6,
      badge: "Expert"
    },
    {
      rank: 4,
      wallet: "0x3e4f...9a1b",
      username: "DegenKing",
      tokens: 8234,
      winRate: 77,
      streak: 4,
    },
    {
      rank: 5,
      wallet: "0x7g8h...2c3d",
      username: "PumpSeer",
      tokens: 7123,
      winRate: 74,
      streak: 3,
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-gray-400 font-bold text-lg">#{rank}</span>;
    }
  };

  const getRankGlow = (rank: number) => {
    switch (rank) {
      case 1:
        return "neon-glow border-yellow-500/30";
      case 2:
        return "neon-glow border-gray-300/30";
      case 3:
        return "neon-glow border-amber-600/30";
      default:
        return "border-white/10";
    }
  };

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case "Legendary":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/20";
      case "Elite":
        return "bg-purple-500/20 text-purple-400 border-purple-500/20";
      case "Expert":
        return "bg-blue-500/20 text-blue-400 border-blue-500/20";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-6">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-gray-300">Global Rankings</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Alpha Leaderboard</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Top strategic predictors ranked by accuracy and alpha tokens earned
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Top 3 Podium */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {leaderboardData.slice(0, 3).map((entry, index) => (
              <div key={entry.rank} className={`glass-card p-6 rounded-2xl ${getRankGlow(entry.rank)} order-${index === 0 ? '2' : index === 1 ? '1' : '3'} md:order-none`}>
                <div className="text-center">
                  <div className="mb-4">
                    {getRankIcon(entry.rank)}
                  </div>
                  <div className="mb-3">
                    <div className="font-bold text-white text-lg">{entry.username}</div>
                    <div className="font-mono text-sm text-gray-400">{entry.wallet}</div>
                  </div>
                  <div className="mb-4">
                    <div className="text-2xl font-bold gradient-text">{entry.tokens.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Alpha Tokens</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="glass p-2 rounded-lg">
                      <div className="text-green-400 font-bold">{entry.winRate}%</div>
                      <div className="text-xs text-gray-400">Win Rate</div>
                    </div>
                    <div className="glass p-2 rounded-lg">
                      <div className="text-yellow-400 font-bold">{entry.streak}</div>
                      <div className="text-xs text-gray-400">Streak</div>
                    </div>
                  </div>
                  {entry.badge && (
                    <Badge className={getBadgeColor(entry.badge)}>
                      {entry.badge}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Rest of leaderboard */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Complete Rankings
            </h3>
            
            <div className="space-y-3">
              {leaderboardData.map((entry) => (
                <div key={entry.rank} className="glass p-4 rounded-xl hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center">
                        {getRankIcon(entry.rank)}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{entry.username}</div>
                        <div className="font-mono text-sm text-gray-400">{entry.wallet}</div>
                      </div>
                      {entry.badge && (
                        <Badge className={getBadgeColor(entry.badge)}>
                          {entry.badge}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="font-bold text-white">{entry.tokens.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">Tokens</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-400">{entry.winRate}%</div>
                        <div className="text-sm text-gray-400">Win Rate</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-yellow-400">{entry.streak}</div>
                        <div className="text-sm text-gray-400">Streak</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
