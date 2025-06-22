import { GiPoisonGas, GiWhaleTail } from "react-icons/gi"

import GasGambit from "@/components/GasGambit"
import GasLiveFeed from "@/components/GasLiveFeed"
import GasNetworkStats from "@/components/GasNetworkStats"

export default function GasGambitPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col  ">
      <div className="">
        <h2 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
          <GiPoisonGas className="text-primary" /> Gas Gambit
        </h2>

        <div className="text-xl text-white/50 font-medium text-center mt-2">
          Predict whether Ethereum gas prices will rise or fall in 2 minutes.
        </div>
      </div>
      <div className="w-full  flex flex-col md:flex-row gap-8 items-center  mt-12 divide-x divide-white/10">
        {/* Left Column: Stats + Live Feed */}
        <div className="flex flex-col gap-6 w-full md:w-2/3">
          <GasNetworkStats />
          <GasLiveFeed />
        </div>

        {/* Right Column: Prediction Game */}
        <div className="w-full md:w-1/3 p-8">
          <div className="sticky top-4">
            <GasGambit />
          </div>
        </div>
      </div>
    </div>
  )
}
