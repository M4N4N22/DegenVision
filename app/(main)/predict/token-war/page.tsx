// app/predict/token-war/page.tsx
import { FaFire } from "react-icons/fa"
import { MdOutlineLockClock, MdToken } from "react-icons/md"
import { SiNodedotjs } from "react-icons/si"

export default function TokenWarComingSoon() {
  return (
    <div className="max-w-3xl mx-auto p-4 text-white">
      <div className="flex items-center gap-2 text-primary text-xl font-semibold mb-4">
        <MdToken />
        <span>Coming Soon</span>
      </div>

      <h1 className="text-4xl font-bold mb-6 text-primary">Token War</h1>

      <p className="text-lg text-white/70 mb-8">
        Predict which token will dominate net inflows on-chain. Track the pulse
        of smart money in real-time. Welcome to{" "}
        <span className="text-white font-semibold">Token War</span> — a
        fast-paced, data-powered game where intuition meets strategy.
      </p>

      <div className="bg-muted/20 border border-muted rounded-2xl p-6 space-y-4 mb-10">
        <h2 className="text-xl font-semibold text-white">🎯 How It Works</h2>
        <ul className="list-disc pl-6 space-y-2 text-white/70">
          <li>Every round, we track the top 5 tokens on Ethereum.</li>
          <li>
            You pick the token you think will have the highest net inflow
            (buying pressure) during the round.
          </li>
          <li>
            If your prediction is right, you win multipliers based on
            difficulty.
          </li>
        </ul>
      </div>

      <div className="bg-muted/20 border border-muted rounded-2xl p-6 space-y-4 mb-10">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <SiNodedotjs className="text-primary" />
          Powered by Nodit
        </h2>
        <p className="text-white/70">
          We use{" "}
          <span className="text-white font-medium">
            Nodit's TOKEN_TRANSFER and ADDRESS_ACTIVITY
          </span>{" "}
          streams to capture real-time ERC-20 token flow across the Ethereum
          network. This lets us analyze where capital is flowing — live.
        </p>
        <p className="text-white/70">
          Powered by Nodit MCP, our AI models add predictive AI to help power
          insights for pro players.
        </p>
      </div>

      <div className="text-center text-muted-foreground">
        <MdOutlineLockClock className="mx-auto text-4xl text-muted mb-2" />
        <p className="text-lg">
          Token War launches soon. Watch the flow. Predict the trend. Win the
          war.
        </p>
      </div>
    </div>
  )
}
