// app/predict/gas-gambit/page.tsx
import { MdOutlineLockClock } from "react-icons/md";
import { SiNodedotjs } from "react-icons/si";
import { GiPoisonGas } from "react-icons/gi"

export default function GasGambitComingSoon() {
  return (
    <div className="max-w-3xl mx-auto p-4 text-white">
      <div className="flex items-center gap-2 text-primary text-xl font-semibold mb-4">
        <GiPoisonGas />
        <span>Coming Soon</span>
      </div>

      <h1 className="text-4xl font-bold mb-6 text-primary">Gas Gambit</h1>

      <p className="text-lg text-white/70 mb-8">
        Predict Ethereum network congestion by guessing gas usage in upcoming blocks.
        <span className="text-white font-semibold">Gas Gambit</span> tests your intuition on mempool activity,
        block fills, and transaction demand — all in real-time.
      </p>

      <div className="bg-muted/20 border border-muted rounded-2xl p-6 space-y-4 mb-10">
        <h2 className="text-xl font-semibold text-white">🎯 How It Works</h2>
        <ul className="list-disc pl-6 space-y-2 text-white/70">
          <li>We track Ethereum block gas usage every few blocks using Nodit's BLOCK_PERIOD event.</li>
          <li>You pick a gas usage range you think the network will hit in the next round.</li>
          <li>If actual gas usage falls within your chosen range, you win multipliers.</li>
        </ul>
      </div>

      <div className="bg-muted/20 border border-muted rounded-2xl p-6 space-y-4 mb-10">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <SiNodedotjs className="text-primary" />
          Powered by Nodit
        </h2>
        <p className="text-white/70">
          We leverage Nodit's <span className="text-white font-medium">BLOCK_PERIOD</span> event to get confirmed
          block stats including gas used, base fee, and transaction counts in real-time.
        </p>
        <p className="text-white/70">
        Powered by Nodit MCP, our AI models add predictive AI helping pro users forecast congestion spikes before they happen.
        </p>
      </div>

      <div className="text-center text-muted-foreground">
        <MdOutlineLockClock className="mx-auto text-4xl text-muted mb-2" />
        <p className="text-lg">
          Gas Gambit launches soon. Time the mempool. Predict the congestion. Win the gas war.
        </p>
      </div>
    </div>
  );
}
