"use client"

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const dummyData = [
  { time: "12:00", price: 3821 },
  { time: "12:01", price: 3822 },
  { time: "12:02", price: 3817 },
  { time: "12:03", price: 3815 },
  { time: "12:04", price: 3818 },
  { time: "12:05", price: 3820 },
]

const PriceChart = () => {
  return (
    <div className=" p-6 border border-white/20 rounded-3xl">
      <h2 className="mb-4 text-lg font-semibold ">ETH Price (5m)</h2>

      <ResponsiveContainer
        className="bg-gradient-to-tr from-emerald-950/10 via-emerald-500/10 to-emerald-950/10 rounded-3xl p-2 border border-white/10"
        width="100%"
        height={360}
      >
        <LineChart
          data={dummyData}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#222" />
          <XAxis dataKey="time" stroke="#888" fontSize={14} />
          <YAxis
            domain={["dataMin - 2", "dataMax + 2"]}
            stroke="#888"
            fontSize={14}
            width={35}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#111", borderColor: "#333" }}
            labelStyle={{ color: "#ccc" }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#4ade80"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, stroke: "#fff", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PriceChart
