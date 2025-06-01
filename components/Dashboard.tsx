import LiveStream from "./LiveStream";
import PredictionPanel from "./PredictionPanel";
import TokenBalance from "./TokenBalance.tsx";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="gradient-text">Live Trading Floor</span>
          </h1>
          <p className="text-gray-300 text-lg">Make strategic predictions on real-time blockchain activity</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Live Stream */}
          <div className="lg:col-span-2">
            <LiveStream />
          </div>

          {/* Right Column - Prediction & Balance */}
          <div className="space-y-6">
            <PredictionPanel />
            <TokenBalance />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
