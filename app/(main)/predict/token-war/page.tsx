import { MdToken } from "react-icons/md"

import TokenMarketPanelWrapper from "@/components/TokenMarketPanelWrapper"
import TokenWarGame from "@/components/TokenWarGame"

export default function TokenWarPage() {
  return (
    <div className="min-h-screen bg-background p-6 flex flex-col gap-8">
      {/* Top Center Title */}
      <div className="w-full flex flex-col items-center text-center gap-2">
        <h1 className="text-5xl font-bold tracking-tight flex items-center gap-3">
          <MdToken className="text-primary text-6xl" />
          Token War
        </h1>
        <p className="text-white/70 text-sm ">
          Four tokens enter, one walks out pumped. Pick your fighter, read the
          intel, and let the market decide who reigns.
        </p>
      </div>

      {/* Main Content: Left = Game | Right = Intel Panel */}
      <div className="flex flex-col md:flex-row gap-6 w-full items-start mt-8  rounded-xl divide-x divide-white/10">
        {/* Left: Game */}
        <div className="w-full md:w-1/2 ">
          <TokenMarketPanelWrapper />
        </div>
        <div className="w-full md:w-1/2">
          <TokenWarGame />
        </div>

        {/* Right: Token Intel Panel */}
      </div>
    </div>
  )
}
