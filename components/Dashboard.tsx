import LiveStream from "./LiveStream"
import PredictionPanel from "./PredictionPanel"
import PriceChart from "./PriceChart"
import PredictionBarChart from "./PredictionBarChart"
import TokenBalance from "./TokenBalance.tsx"

const Dashboard = () => {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="animate-pulse-slow absolute left-1/4 top-1/4 size-96 rounded-full bg-green-500/5 blur-3xl" />
        <div
          className="animate-pulse-slow absolute bottom-1/4 right-1/4 size-96 rounded-full bg-cyan-500/5 blur-3xl"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10  py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold md:text-5xl">
            <span className="">ETH Prediction Arena</span>
          </h1>
          <p className="text-lg text-gray-300">
            Predict whether ETH will go up or down in the next 5 minutes —
            powered by real-time data from{" "}
            <span className="text-white font-semibold">Nodit</span>
          </p>
        </div>
<div className="my-8 border h-0 border-white/30"></div>
        <div className="grid grid-cols-1 lg:grid-cols-4">
          {/* Left Panel - Scrollable Content */}
          <div className="lg:col-span-3 space-y-6 overflow-y-auto">
            <PriceChart />
            <PredictionBarChart/>
            <LiveStream />
          </div>

          {/* Right Panel - Sticky Prediction Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <div className="w-full ">
                <PredictionPanel />
              </div>
              {/* Add wallet stats, win rate etc here later */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
