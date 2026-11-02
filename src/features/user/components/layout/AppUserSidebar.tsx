import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { LayoutDashboard, Sparkles, User, LogOut } from 'lucide-react'
import React from 'react'
import { ThemeLogoWithCollapse } from '../common'

const navItems = [
  { title: 'Explore', href: '/app', icon: LayoutDashboard },
  { title: 'Skills', href: '/app/skills', icon: Sparkles },
  { title: 'Profile', href: '/app/profile', icon: User },
]

export default function AppUserSidebar() {
  return (
    <Sidebar collapsible="icon">
      {/* 1. Header ของ Sidebar: โลโก้แอปที่คลิกกลับหน้าแรกได้ */}
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link href="/" className="flex items-center gap-2">
          <ThemeLogoWithCollapse />
        </Link>
      </SidebarHeader>

      {/* 2. Content: รายการเมนูหลัก */}
      <SidebarContent >
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    render={<Link href={item.href} />}
                  >
                    <item.icon className="size-4 shrink-0" />
                    <span>{item.title}</span> 
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* 3. Footer: ปุ่มลัดหรือกลับหน้าเว็บ */}
      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton render={<Link href="/" />}>
              <LogOut className="size-4 rotate-180" />
              <span>Back to Website</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
