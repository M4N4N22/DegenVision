"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MdDashboard,MdDynamicFeed,MdSettings ,MdQueryStats   } from "react-icons/md";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Predict",
    url: "/predict",
    icon: MdQueryStats,
    description: "Make ETH predictions",
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: MdDashboard,
    description: "View performance",
  },
  {
    title: "Live Feed",
    url: "/live-feed",
    icon: MdDynamicFeed,
    description: "Real-time insights",
  },
  {
    title: "Settings",
    url: "/settings",
    icon: MdSettings,
    description: "Preferences",
  },
]

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
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="h-12 mb-2"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <div>
                        <div>{item.title}</div>
                        <div className="text-xs text-white/50 hidden">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
