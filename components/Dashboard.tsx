import ETHChart from "./ETHChart";
import PredictionBarChart from "./PredictionBarChart";
import PredictionPanel from "./PredictionPanel";
import EarningsDisplay from "./EarningDisplay";
import RoundHistory from "./RoundHistory";
import TokenBalance from "./TokenBalance.tsx";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen bg-background text-white">
      <div className="container mx-auto py-6 space-y-4">



        {/* Core Interaction Area */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Left: ETH Chart + Social Signals */}
          <div className="space-y-4">
          <div><h1 className="text-4xl font-bold tracking-tight gradient-text">
            ETH Prediction Arena
          </h1>
          <p className="text-gray-300 text-base max-w-prose">
            Predict real-time ETH price movement — powered by{" "}
            <span className="font-semibold text-white">Nodit</span>
          </p></div>
            <ETHChart />
            <PredictionBarChart />
          </div>

          {/* Right: Sticky Prediction Panel */}
          <aside className="sticky top-24 self-start ">
            <PredictionPanel />
          </aside>
        </div>

        {/* Divider */}
        <hr className="border-white/10" />
        <EarningsDisplay />
        {/* Secondary Info: Earnings + Token */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       
          <RoundHistory />
          <TokenBalance />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
