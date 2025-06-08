"use client"

import { useState } from "react"
import { FaEthereum } from "react-icons/fa";

import ETHChart from "@/components/ETHChart"
import EthPriceCard from "@/components/EthPriceCard"
import LiveStream from "@/components/LiveStream"
import NetworkPulse from "@/components/NetworkPulse"
import PredictionBarChart from "@/components/PredictionBarChart"
import PredictionPanel from "@/components/PredictionPanel"

const Predict = () => {
  const currentPrice = 3247.82
  const priceChange = 45.23
  const priceChangePercent = 1.41

  return (
    <div className="space-y-4">
      {/* Top Row: ETH Price Widget + Prediction Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4">
        {/* Left: ETH Chart + Social Signals */}
        <div className="space-y-4">
          <div className="flex items-center">
          <FaEthereum className="text-emerald-500 text-5xl"/>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-emerald-500">
            ETH<span className="text-white"> Up or Down</span>
            </h1>
            <p className="text-gray-300 text-base max-w-prose mt-2">
              Predict real-time ETH price movement — powered by{" "}
              <span className="font-semibold text-white">Nodit</span>
            </p></div>
          </div>

       
          <ETHChart />

          <PredictionBarChart />
        </div>

        {/* Right: Sticky Prediction Panel */}
        <aside className="sticky top-0 self-start ">
        <PredictionPanel cryptoName="ETH" />
        </aside>
      </div>

      {/* Mini Live Activity Feed */}
      <div className="glass-card p-6">
        <div>
          <h1 className="text-lg">Recent Activity</h1>
        </div>
        <div className="space-y-3">
          {[
            {
              user: "User123",
              prediction: "UP",
              amount: "$5.00",
              time: "2m ago",
              result: "won",
            },
            {
              user: "TraderX",
              prediction: "DOWN",
              amount: "$2.50",
              time: "3m ago",
              result: "lost",
            },
            {
              user: "CryptoKing",
              prediction: "UP",
              amount: "$10.00",
              time: "5m ago",
              result: "won",
            },
          ].map((activity, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2 border-b border-white/10 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="text-sm font-medium text-gray-300">
                  {activity.user}
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded ${
                    activity.prediction === "UP"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {activity.prediction}
                </div>
                <div className="text-sm text-white/50">{activity.amount}</div>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`text-xs px-2 py-1 rounded ${
                    activity.result === "won"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {activity.result}
                </div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Predict
