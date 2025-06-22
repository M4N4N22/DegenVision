"use client"

import { cn } from "@/lib/utils"
import Image from "next/image";

export function TokenSelectGrid({
  tokens,
  selected,
  onSelect,
  disabled = false,
}: {
  tokens: { symbol: string; color: string }[]
  selected?: string | null
  onSelect: (symbol: string) => void
  disabled?: boolean
}) {
  const TOKEN_LOGOS = {
    UNI: "https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png",
    AAVE: "https://assets.coingecko.com/coins/images/12645/large/aave.png",
    SHIB: "https://assets.coingecko.com/coins/images/11939/large/shiba.png",
    PEPE: "https://assets.coingecko.com/coins/images/29850/large/pepe.jpg",
    USDC: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png",
    DAI: "https://assets.coingecko.com/coins/images/9956/large/4943.png",
    USDT: "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png",
    FRAX: "https://assets.coingecko.com/coins/images/13422/large/FRAX_icon.png",
    LDO: "https://assets.coingecko.com/coins/images/13573/large/Lido_DAO.png",
    CRV: "https://assets.coingecko.com/coins/images/12124/large/Curve.png",
    FLOKI: "https://assets.coingecko.com/coins/images/18878/large/Floki.png",
    TURBO: "https://assets.coingecko.com/coins/images/30372/large/turbo.png",
  } as const

  type TokenSymbol = keyof typeof TOKEN_LOGOS

  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
      {tokens.map((token) => {
        const isSelected = selected === token.symbol
        return (
          <button
            key={token.symbol}
            onClick={() => onSelect(token.symbol)}
            disabled={disabled}
            className={cn(
              "flex flex-col gap-2 items-center justify-center p-4 rounded-xl bg-white/5 border transition-all",
              isSelected
                ? "border-yellow-300"
                : "border-transparent  hover:bg-white/10",
              disabled && "opacity-50 pointer-events-none"
            )}
          >
            <Image
            height={40}
            width={40}
              src={TOKEN_LOGOS[token.symbol as TokenSymbol]}
              alt={token.symbol}
              className="w-10 h-10 mb-2"
            />

            <span className="text-white font-semibold">{token.symbol}</span>
          </button>
        )
      })}
    </div>
  )
}
