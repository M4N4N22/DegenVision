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
        return <Crown className="size-6 text-yellow-400" />;
      case 2:
        return <Medal className="size-6 text-gray-300" />;
      case 3:
        return <Award className="size-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
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
    <div className="relative min-h-screen bg-background">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="animate-pulse-slow absolute left-1/4 top-1/4 size-96 rounded-full bg-green-500/10 blur-3xl"></div>
        <div className="animate-pulse-slow absolute bottom-1/4 right-1/4 size-96 rounded-full bg-sky-500/10 blur-3xl" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container relative z-10 mx-auto p-6">
        <div className="mb-12 text-center">
          <div className="glass-card mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2">
            <Trophy className="size-4 text-yellow-400" />
            <span className="text-sm font-medium text-gray-300">Global Rankings</span>
          </div>
          
          <h1 className="mb-4 text-5xl font-bold md:text-6xl">
            <span className="gradient-text">DegenVision <span className="text-white/50">Leaderboard</span></span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-300">
            Top strategic predictors ranked by accuracy and alpha tokens earned
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          {/* Top 3 Podium */}
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            {leaderboardData.slice(0, 3).map((entry, index) => (
              <div key={entry.rank} className={`glass-card  p-6 ${getRankGlow(entry.rank)} order-${index === 0 ? '2' : index === 1 ? '1' : '3'} md:order-none`}>
                <div className="text-center">
                  <div className="mb-4">
                    {getRankIcon(entry.rank)}
                  </div>
                  <div className="mb-3">
                    <div className="text-lg font-bold text-white">{entry.username}</div>
                    <div className="font-mono text-sm text-gray-400">{entry.wallet}</div>
                  </div>
                  <div className="mb-4">
                    <div className="gradient-text text-2xl font-bold">{entry.tokens.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Alpha Tokens</div>
                  </div>
                  <div className="mb-4 grid grid-cols-2 gap-3">
                    <div className="glass rounded-lg p-2">
                      <div className="font-bold text-green-400">{entry.winRate}%</div>
                      <div className="text-xs text-gray-400">Win Rate</div>
                    </div>
                    <div className="glass rounded-lg p-2">
                      <div className="font-bold text-yellow-400">{entry.streak}</div>
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
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
              <TrendingUp className="size-5 text-blue-400" />
              Complete Rankings
            </h3>
            
            <div className="space-y-3">
              {leaderboardData.map((entry) => (
                <div key={entry.rank} className="glass rounded-xl p-4 transition-all duration-300 hover:bg-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex size-12 items-center justify-center">
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
