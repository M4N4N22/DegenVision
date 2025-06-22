"use client"

import { ReactNode } from "react"
import { AppTopNav } from "@/components/AppSidebar" // <- make sure this is your new top nav

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* Top Navigation Bar */}
      <AppTopNav />

      {/* Content Area below the fixed nav */}
      <main className="pt-[96px] px-6 pb-6">
        {children}
      </main>
    </div>
  )
}
