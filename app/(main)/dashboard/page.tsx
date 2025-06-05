import EarningsDisplay from "@/components/EarningDisplay";
import TokenBalance from "@/components/TokenBalance.tsx";
import RoundHistory from "@/components/RoundHistory";
import { Badge } from "@/components/ui/badge";

const DashboardView = () => {
  return (
    <div className="space-y-6">
      {/* Earnings Summary */}
     

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
        {/* Balance & Rewards */}
        <div className="lg:col-span-1">
        <EarningsDisplay />
        <RoundHistory />
      
        </div>

        {/* Round History */}
        <aside className="sticky top-0 self-start ">
        <TokenBalance />
        </aside>
      </div>

      {/* Future-proof placeholders */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <div>
            <div className="text-lg flex items-center gap-2">
              Streaks
              <Badge variant="outline" className="text-xs">Coming Soon</Badge>
            </div>
          </div>
          <div>
            <div className="text-center py-8 text-gray-400">
              <div className="text-2xl font-bold">🔥</div>
              <p className="text-sm">Streak tracking coming soon</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div>
            <div className="text-lg flex items-center gap-2">
              Badges
              <Badge variant="outline" className="text-xs">Coming Soon</Badge>
            </div>
          </div>
          <div>
            <div className="text-center py-8 text-gray-400">
              <div className="text-2xl font-bold">🏆</div>
              <p className="text-sm">Achievement badges coming soon</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div>
            <div className="text-lg flex items-center gap-2">
              Leaderboard
              <Badge variant="outline" className="text-xs">Coming Soon</Badge>
            </div>
          </div>
          <div>
            <div className="text-center py-8 text-gray-400">
              <div className="text-2xl font-bold">📊</div>
              <p className="text-sm">Global rankings coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
