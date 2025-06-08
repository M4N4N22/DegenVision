"use client"

import { ReactNode } from "react"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"


interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1 overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/10 bg-black/20 backdrop-blur-sm px-4">
            <SidebarTrigger className="-ml-1" />

            {/* This div takes all space in the middle pushing connect button right */}
            <div className="flex-1" />

            {/* Wallet connect button aligned right */}
      
          </header>

          {/* Set height and scrolling context here */}
          <div className="h-[calc(100vh-4rem)] overflow-y-auto p-6">
            
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
