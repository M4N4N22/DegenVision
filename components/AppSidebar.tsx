"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaChartLine } from "react-icons/fa"
import { GiPoisonGas, GiWhaleTail } from "react-icons/gi"
import {
  MdDashboard,
  MdDynamicFeed,
  MdQueryStats,
  MdSettings,
  MdToken,
} from "react-icons/md"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-4xl tracking-tighter font-extrabold text-emerald-500 mb-4 h-fit leading-none py-8 flex flex-col">
            <span>DEGEN</span>
            <span className="text-white">VISION</span>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {/* Collapsible PREDICT section */}

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname.startsWith("/predict")}
                  className="h-12 mb-2 "
                >
                  {" "}
                  <Link className="flex items-center  gap-3" href="/predict">
                    <MdQueryStats className="w-5 h-5" />
                    <div>
                      <div>Predict</div>
                    </div>{" "}
                  </Link>
                </SidebarMenuButton>

                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      isActive={pathname === "/predict/up-down"}
                    >
                      <Link href="/predict/up-down">
                        <FaChartLine size={32} />
                        Up or Down
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>

                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      isActive={pathname === "/predict/whale-watch"}
                    >
                      <Link href="/predict/whale-watch">
                        <GiWhaleTail size={32} />
                        Whale Watch
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>

                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      isActive={pathname === "/predict/gas-gambit"}
                    >
                      <Link href="/predict/gas-gambit">
                        <GiPoisonGas size={32} className="text-primary" />
                        Gas Gambit
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>

                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      isActive={pathname === "/predict/token-war"}
                    >
                      <Link href="/predict/token-war">
                        <MdToken size={32} className="text-primary" />
                        Token War
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>

              {/* Other items */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard"}
                  className="h-12 mb-2"
                >
                  <Link href="/dashboard" className="flex items-center gap-3">
                    <MdDashboard className="w-5 h-5" />
                    <div>
                      <div>Dashboard</div>
                      <div className="text-xs text-white/50 hidden">
                        View performance
                      </div>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/settings"}
                  className="h-12 mb-2"
                >
                  <Link href="/settings" className="flex items-center gap-3">
                    <MdSettings className="w-5 h-5" />
                    <div>
                      <div>Settings</div>
                      <div className="text-xs text-white/50 hidden">
                        Preferences
                      </div>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
