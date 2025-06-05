import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Trophy, Target, DollarSign } from "lucide-react";

interface RoundResult {
  id: number;
  startPrice: number;
  endPrice: number;
  prediction: 'up' | 'down';
  result: 'won' | 'lost' | 'tie';
  duration: string;
  timestamp: string;
  stakeAmount: number;
  payout?: number;
  multiplier: number;
}

const RoundHistory = () => {
  // Updated mock round history data with stake amounts and payouts
  const roundHistory: RoundResult[] = [
    {
      id: 46,
      startPrice: 3425.50,
      endPrice: 3441.20,
      prediction: 'up',
      result: 'won',
      duration: '5 minutes',
      timestamp: '14:25',
      stakeAmount: 5.00,
      payout: 9.50,
      multiplier: 1.9
    },
    {
      id: 45,
      startPrice: 3410.75,
      endPrice: 3398.30,
      prediction: 'up',
      result: 'lost',
      duration: '1 minute',
      timestamp: '14:20',
      stakeAmount: 2.00,
      multiplier: 1.9
    },
    {
      id: 44,
      startPrice: 3415.00,
      endPrice: 3415.05,
      prediction: 'down',
      result: 'tie',
      duration: '30 seconds',
      timestamp: '14:15',
      stakeAmount: 1.00,
      multiplier: 1.9
    },
    {
      id: 43,
      startPrice: 3405.25,
      endPrice: 3392.80,
      prediction: 'down',
      result: 'won',
      duration: '15 minutes',
      timestamp: '14:00',
      stakeAmount: 10.00,
      payout: 19.00,
      multiplier: 1.9
    },
    {
      id: 42,
      startPrice: 3398.40,
      endPrice: 3405.75,
      prediction: 'down',
      result: 'lost',
      duration: '5 minutes',
      timestamp: '13:45',
      stakeAmount: 3.00,
      multiplier: 1.9
    }
  ];

  const getResultBadge = (result: 'won' | 'lost' | 'tie') => {
    const styles = {
      won: 'bg-green-500/20 text-green-400 border-green-500/20',
      lost: 'bg-red-500/20 text-red-400 border-red-500/20',
      tie: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20'
    };
    
    const labels = {
      won: 'Won',
      lost: 'Lost',
      tie: 'Tie'
    };

    return (
      <Badge className={styles[result]}>
        {labels[result]}
      </Badge>
    );
  };

  const getPredictionIcon = (prediction: 'up' | 'down') => {
    return prediction === 'up' ? 
      <TrendingUp className="w-4 h-4 text-green-400" /> : 
      <TrendingDown className="w-4 h-4 text-red-400" />;
  };

  const wonRounds = roundHistory.filter(r => r.result === 'won').length;
  const totalRounds = roundHistory.length;
  const winRate = ((wonRounds / totalRounds) * 100).toFixed(1);
  const totalStaked = roundHistory.reduce((sum, round) => sum + round.stakeAmount, 0);
  const totalWon = roundHistory.reduce((sum, round) => sum + (round.payout || 0), 0);
  const netProfit = totalWon - totalStaked;

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Round History</h2>
          <p className="text-sm text-gray-400">Your recent predictions</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-400">Win Rate</span>
          </div>
          <div className="text-lg font-bold gradient-text">{winRate}%</div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="glass p-3 rounded-xl text-center">
          <div className="text-sm text-gray-400">Staked</div>
          <div className="text-lg font-bold text-purple-400">${totalStaked.toFixed(2)}</div>
        </div>
        <div className="glass p-3 rounded-xl text-center">
          <div className="text-sm text-gray-400">Won</div>
          <div className="text-lg font-bold text-green-400">${totalWon.toFixed(2)}</div>
        </div>
        <div className="glass p-3 rounded-xl text-center">
          <div className="text-sm text-gray-400">Net P&L</div>
          <div className={`text-lg font-bold ${netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {netProfit >= 0 ? '+' : ''}${netProfit.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {roundHistory.map((round) => (
          <div key={round.id} className="glass p-4 rounded-xl hover:bg-white/5 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-white">Round #{round.id}</span>
                <span className="text-xs text-gray-400">{round.timestamp}</span>
              </div>
              {getResultBadge(round.result)}
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-xs mb-3">
              <div>
                <div className="text-gray-400">Prediction</div>
                <div className="flex items-center gap-1 text-white">
                  {getPredictionIcon(round.prediction)}
                  {round.prediction.toUpperCase()}
                </div>
              </div>
              <div>
                <div className="text-gray-400">Duration</div>
                <div className="text-white">{round.duration}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs mb-3">
              <div>
                <div className="text-gray-400">Price Movement</div>
                <div className={`font-medium ${
                  round.endPrice > round.startPrice ? 'text-green-400' : 
                  round.endPrice < round.startPrice ? 'text-red-400' : 'text-gray-400'
                }`}>
                  ${round.startPrice.toFixed(2)} → ${round.endPrice.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-gray-400">Change</div>
                <div className={`font-medium ${
                  round.endPrice > round.startPrice ? 'text-green-400' : 
                  round.endPrice < round.startPrice ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {round.endPrice > round.startPrice ? '+' : ''}
                  ${(round.endPrice - round.startPrice).toFixed(2)}
                </div>
              </div>
            </div>
            
            {/* Financial Summary */}
            <div className="pt-3 border-t border-white/10">
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div>
                  <div className="text-gray-400">Stake</div>
                  <div className="text-purple-400 font-medium">${round.stakeAmount.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-gray-400">Multiplier</div>
                  <div className="text-blue-400 font-medium">x{round.multiplier}</div>
                </div>
                <div>
                  <div className="text-gray-400">Result</div>
                  <div className={`font-medium ${
                    round.result === 'won' ? 'text-green-400' :
                    round.result === 'lost' ? 'text-red-400' : 'text-yellow-400'
                  }`}>
                    {round.result === 'won' && round.payout ? `+$${round.payout.toFixed(2)}` :
                     round.result === 'lost' ? `-$${round.stakeAmount.toFixed(2)}` :
                     '$0.00'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <div className="text-sm text-gray-400">
          {wonRounds} wins • {totalRounds - wonRounds} losses • {netProfit >= 0 ? 'Profitable' : 'Loss'} session
        </div>
      </div>
    </div>
  );
};

export default RoundHistory;
