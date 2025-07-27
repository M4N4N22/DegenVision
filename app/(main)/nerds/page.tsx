'use client'

import NerdsPanel from "@/components/NerdsPanel"
import EthTransfers from "@/components/forNerds/mcp/ethTransfers"

export default function NerdPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-1/2 overflow-y-auto border-b">
        <NerdsPanel />
      </div>
      <div className="h-1/2 overflow-y-auto">
        <EthTransfers />
      </div>
    </div>
  )
}
