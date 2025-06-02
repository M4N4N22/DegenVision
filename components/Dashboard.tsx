import LiveStream from "./LiveStream";
import PredictionPanel from "./PredictionPanel";
import TokenBalance from "./TokenBalance.tsx";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="animate-pulse-slow absolute left-1/4 top-1/4 size-96 rounded-full bg-green-500/5 blur-3xl"></div>
        <div className="animate-pulse-slow absolute bottom-1/4 right-1/4 size-96 rounded-full bg-cyan-500/5 blur-3xl" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold md:text-5xl">
            <span className="gradient-text">Live Trading Floor</span>
          </h1>
          <p className="text-lg text-gray-300">Make strategic predictions on real-time blockchain activity</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
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
