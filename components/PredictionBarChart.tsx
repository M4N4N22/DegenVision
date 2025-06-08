"use client"

const predictionData = [
  {
    label: "Will Go Up",
    count: 128,
  },
  {
    label: "Will Go Down",
    count: 86,
  },
]

const totalVotes = predictionData.reduce((sum, p) => sum + p.count, 0)

const PredictionSentiment = () => {
  return (
    <div className="p-6  space-y-4">
      <h2 className="text-lg font-bold text-white">Live User Predictions</h2>

      {/* Stacked pill */}
      <div className="flex h-8 w-full overflow-hidden rounded-full border border-neutral-800">
        {predictionData.map((entry, i) => {
          const widthPercent = (entry.count / totalVotes) * 100

          // Manually assign Tailwind classes here
          const bgColor =
            entry.label === "Will Go Up" ? "bg-green-700" : "bg-red-700"

          return (
            <div
              key={i}
              className={`h-full text-xs font-medium text-white flex items-center justify-center ${bgColor}`}
              style={{ width: `${widthPercent}%` }}
            >
              {widthPercent > 10 && `${Math.round(widthPercent)}%`}
            </div>
          )
        })}
      </div>

      {/* Labels below bar */}
      <div className="flex justify-between text-sm text-muted-foreground px-1">
        {predictionData.map((entry, i) => {
          const dotColor =
            entry.label === "Will Go Up" ? "bg-green-600" : "bg-red-600"

          return (
            <div key={i} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${dotColor}`} />
              <span>{entry.label} ({entry.count})</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PredictionSentiment
