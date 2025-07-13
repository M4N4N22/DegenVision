"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaChartLine } from "react-icons/fa"
import { GiPoisonGas, GiWhaleTail } from "react-icons/gi"
import { MdDashboard, MdQueryStats, MdSettings, MdToken } from "react-icons/md"

import { cn } from "@/lib/utils"

const predictChildren = [
  {
    label: "Up or Down",
    href: "/predict/up-down",
    icon: <FaChartLine size={16} />,
  },
  {
    label: "Whale Watch",
    href: "/predict/whale-watch",
    icon: <GiWhaleTail size={16} />,
  },
  {
    label: "Gas Gambit",
    href: "/predict/gas-gambit",
    icon: <GiPoisonGas size={16} />,
  },
  {
    label: "Token War",
    href: "/predict/token-war",
    icon: <MdToken size={16} />,
  },
]

export function AppTopNav() {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <div className="w-full fixed top-0 z-50 bg-background/50 backdrop-blur-xl text-white border-b border-zinc-800 shadow-lg shadow-black/30">
      <div className="max-w-screen-2xl mx-auto flex items-center px-4 py-3 gap-6">
        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-tight text-emerald-500 mr-4">
          <span>DEGEN</span>
          <span className="text-white ml-1">VISION</span>
        </div>

        {/* Predict (Overview) */}
        <Link
          href="/predict"
          className={cn(
            "px-3 py-2 rounded-xl font-semibold transition-colors",
            isActive("/predict")
              ? "bg-primary text-black"
              : "hover:bg-zinc-800 text-white/80"
          )}
        >
          Overview
        </Link>

        {/* Predict Children */}
        {predictChildren.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-1 px-3 py-2 rounded-xl transition-colors",
              isActive(item.href)
                ? "bg-primary text-black"
                : "hover:bg-zinc-800 text-white/80"
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}

        {/* Dashboard */}
        <Link
          href="/nerds"
          className={cn(
            "px-3 py-2 rounded-xl font-semibold transition-colors",
            isActive("/nerds")
              ? "bg-primary text-black"
              : "hover:bg-zinc-800 text-white/80"
          )}
        >
          For Nerds
        </Link>

        {/* Dashboard */}
        <Link
          href="/dashboard"
          className={cn(
            "px-3 py-2 rounded-xl font-semibold transition-colors",
            isActive("/dashboard")
              ? "bg-primary text-black"
              : "hover:bg-zinc-800 text-white/80"
          )}
        >
          Dashboard
        </Link>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Settings */}
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-1 px-3 py-2 rounded-xl transition-colors",
            isActive("/settings")
              ? "bg-primary text-black"
              : "hover:bg-zinc-800 text-white/80"
          )}
        >
          <MdSettings size={18} />
          Settings
        </Link>
      </div>
    </div>
  )
}
