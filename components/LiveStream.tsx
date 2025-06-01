"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Wallet, Clock } from "lucide-react";

interface WalletActivity {
  id: string;
  wallet: string;
  action: 'buy' | 'sell' | 'transfer';
  token: string;
  amount: string;
  value: string;
  timestamp: Date;
  confidence: number;
}

const LiveStream = () => {
  const [activities, setActivities] = useState<WalletActivity[]>([]);

  // Mock data for demonstration
  const mockActivities: WalletActivity[] = [
    {
      id: '1',
      wallet: '0x742d...8e3a',
      action: 'buy',
      token: 'ETH',
      amount: '2.5',
      value: '$6,250',
      timestamp: new Date(),
      confidence: 94
    },
    {
      id: '2',
      wallet: '0x1a2b...4c5d',
      action: 'sell',
      token: 'USDC',
      amount: '10,000',
      value: '$10,000',
      timestamp: new Date(Date.now() - 30000),
      confidence: 87
    },
    {
      id: '3',
      wallet: '0x9f8e...2d1c',
      action: 'buy',
      token: 'BTC',
      amount: '0.15',
      value: '$6,750',
      timestamp: new Date(Date.now() - 60000),
      confidence: 91
    }
  ];

  useEffect(() => {
    setActivities(mockActivities);
    
    // Simulate live updates
    const interval = setInterval(() => {
      const newActivity: WalletActivity = {
        id: Math.random().toString(36).substr(2, 9),
        wallet: `0x${Math.random().toString(16).substr(2, 4)}...${Math.random().toString(16).substr(2, 4)}`,
        action: Math.random() > 0.5 ? 'buy' : 'sell',
        token: ['ETH', 'BTC', 'USDC', 'LINK'][Math.floor(Math.random() * 4)],
        amount: (Math.random() * 100).toFixed(2),
        value: `$${(Math.random() * 50000).toLocaleString()}`,
        timestamp: new Date(),
        confidence: Math.floor(Math.random() * 20) + 80
      };
      
      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getActionIcon = (action: string) => {
    return action === 'buy' ? (
      <TrendingUp className="w-4 h-4 text-green-400" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-400" />
    );
  };

  const getActionColor = (action: string) => {
    return action === 'buy' ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <h2 className="text-xl font-bold text-white">Live Wallet Activity</h2>
        </div>
        <Badge variant="outline" className="border-green-500/20 bg-green-500/10 text-green-400">
          Real-time
        </Badge>
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div 
            key={activity.id}
            className={`glass p-4 rounded-xl hover:bg-white/10 transition-all duration-300 animate-fade-in border-l-2 ${
              activity.action === 'buy' ? 'border-l-green-500' : 'border-l-red-500'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-gray-400" />
                  <span className="font-mono text-sm text-gray-300">{activity.wallet}</span>
                </div>
                <div className="flex items-center gap-1">
                  {getActionIcon(activity.action)}
                  <span className={`font-semibold text-sm uppercase ${getActionColor(activity.action)}`}>
                    {activity.action}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-white">
                  {activity.amount} {activity.token}
                </div>
                <div className="text-sm text-gray-400">{activity.value}</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                {activity.timestamp.toLocaleTimeString()}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Confidence:</span>
                <Badge variant="outline" className="border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs">
                  {activity.confidence}%
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveStream;
