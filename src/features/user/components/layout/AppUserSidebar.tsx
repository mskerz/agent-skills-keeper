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
  SidebarSeparator,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { Compass, LibraryBig } from 'lucide-react'
import React, { Suspense } from 'react'
import { ThemeLogoWithCollapse } from '../common'
import { Skeleton } from '@/components/ui/skeleton'
import UserMenu from '../UserMenu'
import { Separator } from '@/components/ui/separator'

const navItems = [
  { title: 'My Skills', href: '/app/skills', icon: LibraryBig },
  { title: 'Explore', href: '/app/explore', icon: Compass },
]

export default function AppUserSidebar() {
  return (
    <Sidebar collapsible="icon"   >
      {/* 1. Header ของ Sidebar: โลโก้แอปที่คลิกกลับหน้าแรกได้ */}
      <SidebarHeader className=" border-sidebar-border ">
        <Link href="/app" className="flex   gap-2">
          <ThemeLogoWithCollapse />
        </Link>
      </SidebarHeader>

      {/* 2. Content: รายการเมนูหลัก */}
      <SidebarContent >
        <SidebarGroup>
          {/* <SidebarGroupLabel>Menu</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className="data-hover:bg-primary-foreground/10"
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
      <SidebarFooter className="  border-sidebar-border  ">
       
          <SidebarSeparator className="my-1" />




 
            <SidebarMenu>
              <SidebarMenuItem className="w-full">
                <Suspense
                  fallback={
                    <div className="flex items-center gap-2 p-1">
                      <Skeleton className="size-7 rounded-full shrink-0" />
                      <Skeleton className="h-4 w-28 rounded-md group-data-[collapsible=icon]:hidden" />
                    </div>
                  }
                >
                  <UserMenu />
                </Suspense>
              </SidebarMenuItem>
            </SidebarMenu>
           
      

      </SidebarFooter>
    </Sidebar>
  )
}
