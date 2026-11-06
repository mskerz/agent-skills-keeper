'use client'

import { ThemeToggle } from '@/components/common/theme/ThemeToggle'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import SkillsSearchBar from '@/features/agents/components'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const ROUTE_TITLES: Record<string, string> = {
  '/app': 'Workspace',
  '/app/skills': 'My Skills',
  '/app/explore': 'Explore',
  '/app/profile': 'Profile',
}

function getPageTitle(pathname: string): string {
  if (ROUTE_TITLES[pathname]) {
    return ROUTE_TITLES[pathname]
  }
  if (pathname.startsWith('/app/skills')) return 'My Skills'
  if (pathname.startsWith('/app/explore')) return 'Explore'
  if (pathname.startsWith('/app/profile')) return 'Profile'

  const segments = pathname.split('/').filter(Boolean)
  const lastSegment = segments[segments.length - 1]
  if (lastSegment) {
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, ' ')
  }
  return 'Workspace'
}

export const instant = false

export default function AppUserNavbar() {
  const pathname = usePathname()
  const pageTitle = getPageTitle(pathname)

  return (
    <header className="flex h-14 shrink-0 items-center border-b border-sidebar-border justify-between gap-2 px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-0.5 h-4 self-center" />
        {pathname === '/app' ? (
          <span className="text-xs font-medium text-muted-foreground">Workspace</span>
        ) : (
           <span className="font-medium font-sans text-sm  text-foreground">{pageTitle}</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <SkillsSearchBar />
        <Button className="flex items-center py-4.5 px-4">
          <Plus className="h-4 w-4" />
          <span>New Skill</span>
        </Button>
        <ThemeToggle />
      </div>
    </header>
  )
}
