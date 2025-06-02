"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts"

const predictionData = [
  {
    prediction: "Will Go Up",
    count: 128,
    fill: "#16a34a  ", // green
  },
  {
    prediction: "Will Go Down",
    count: 86,
    fill: "#dc2626  ", // red
  },
]

const PredictionBarChart = () => {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-lg font-semibold">Market Sentiment</h2>

      <ResponsiveContainer
        className="bg-gradient-to-tr from-sky-800/10 via-sky-900/10 to-sky-950/10 rounded-3xl"
        width="100%"
        height={200}
      >
        <BarChart
          layout="vertical"
          data={predictionData}
          margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#222" />
          <XAxis
            type="number"
            stroke="#888"
            fontSize={14}
            allowDecimals={false}
          />
          <YAxis
            type="category"
            dataKey="prediction"
            stroke="#888"
            fontSize={14}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#111", borderColor: "#333" }}
            labelStyle={{ color: "#ccc" }}
            formatter={(value: number) => [`${value} users`, "Votes"]}
          />
          <Bar dataKey="count" radius={[0, 12, 12, 0]}>
            {predictionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PredictionBarChart
