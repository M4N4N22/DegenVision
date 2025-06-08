// app/predict/page.tsx

import Link from "next/link"
import { FaChartLine } from "react-icons/fa"
import { GiPoisonGas, GiWhaleTail } from "react-icons/gi"
import { MdGeneratingTokens,MdToken  } from "react-icons/md"

import { cn } from "@/lib/utils"

const predictionOptions = [
  {
    icon: <FaChartLine size={32} className="text-primary" />,
    title: "ETH Up or Down",
    description:
      "Predict whether ETH price will go up or down. Choose your timeframe from 30 seconds to 1 hour.",
    href: "/predict/up-down",
  },
  {
    icon: <GiWhaleTail size={32} className="text-primary" />,
    title: "Whale Watch",
    description:
      "Predict the sum of the next 10 large USDT whale transactions (≥ 2,000 USDT). Choose your range and win multipliers if your guess is right!",
    href: "/predict/whale-watch",
  },

  {
    icon: <GiPoisonGas size={32} className="text-primary" />,
    title: "Gas Gambit",
    description:
      "Predict Ethereum network congestion by estimating gas usage in upcoming blocks. Test your mempool intuition.",
    href: "/predict/gas-gambit",
  },
  {
    icon: <MdToken size={32} className="text-primary" />,
    title: "Token War",
    description:
      "Predict which token will dominate net inflows or outflows. Stay ahead of shifts in market sentiment.",
    href: "/predict/token-war",
  },
]

export default function PredictPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-grid-squares">
      <h1 className="text-4xl tracking-tighter font-extrabold text-emerald-500 leading-none flex mb-2">
        <span>DEGEN</span>
        <span className="text-white">VISION</span>
      </h1>
      <p className="text-white/60 text-lg mb-8  text-center">
        Stake your assets, predict the chain, and win real payouts.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-3/4 z-10">
        {predictionOptions.map((option) => (
          <Link
            href={option.href}
            key={option.title}
            className={cn(
              "glass-card p-6 space-y-6 flex flex-col justify-between ",
              " hover:bg-white/5 transition hover:scale-105"
            )}
          >
            <div>
              <div className="flex items-center gap-2  mb-4">
                <div className="text-4xl">{option.icon}</div>
                <h2 className="text-xl font-semibold text-white">
                  {option.title}
                </h2>
              </div>
              <p className="text-white/50 mt-8">{option.description}</p>
            </div>

            <div
              className="inline-block mt-4 text-primary font-semibold border border-primary rounded-3xl px-4 py-2 text-center hover:bg-primary/10 transition"
              aria-label={`Go to ${option.title} prediction`}
            >
              Predict & Win →
            </div>
          </Link>
        ))}
      </div>
      {/* Bottom gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-emerald-900/40 to-transparent"></div>
    </div>
  )
}
