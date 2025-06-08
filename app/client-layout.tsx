// app/client-layout.tsx
"use client"

import { ReactNode, useEffect, useState } from "react"


interface ClientLayoutProps {
  children: ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative flex min-h-screen flex-col">


      <main className="flex-1">{children}</main>
    </div>
  )
}
