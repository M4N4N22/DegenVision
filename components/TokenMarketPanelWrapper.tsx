"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TokenMarketPanel } from "@/components/TokenMarketPanel"

export default function TokenMarketPanelWrapper() {
  const [tokens, setTokens] = useState([])
  const [loading, setLoading] = useState(false)

  const handleFetch = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/token-market")
      const data = await res.json()
      console.log("📦 Token data received from backend:", data)
      setTokens(data || [])
    } catch (err) {
      console.error("Failed to fetch token intel:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full flex justify-center  items-center ">
      <div className="w-full  rounded-2xl  shadow-xl flex flex-col items-center gap-6">
        {/* Show this section only if tokens not yet fetched */}
        {tokens.length === 0 && (
          <>
            <p className="text-xl text-white/60 text-center font-medium">
              Intel wins wars — scout the field for who's pumping, who's
              bleeding, and where the volume troops are marching.{" "}
              <span className="text-white/90 font-bold">
                Know before you throw.
              </span>
            </p>

            <Button
              onClick={handleFetch}
              disabled={loading}
              className="bg-primary text-black font-bold text-md px-6 py-3 hover:bg-primary/90 transition rounded-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Intel Incoming
                </>
              ) : (
                "Get Token Intel"
              )}
            </Button>
          </>
        )}

        {/* Always render Token Panel if data is present */}
        {tokens.length > 0 && (
          <div className="w-full ">
            <TokenMarketPanel tokens={tokens} />
          </div>
        )}
      </div>
    </div>
  )
}
