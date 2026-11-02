import { ThemeToggle } from '@/components/common/theme/ThemeToggle'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import React, { Suspense } from 'react'
import UserMenu from '../UserMenu'

export default function AppUserNavbar() {
    return (
        // {/* Header แถบด้านบน: มีปุ่มเปิด-ปิด Sidebar และ UserMenu ด้านขวา */}

        <header className="flex h-14 shrink-0 items-center justify-between gap-2 px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <span className="text-xs font-medium text-muted-foreground">Workspace</span>
            </div>

            <div className="flex items-center gap-2">
                <ThemeToggle />
                <Suspense fallback={<Skeleton className="h-8 w-24 rounded-full" />}>
                    <UserMenu />
                </Suspense>
            </div>
        </header>
    )
}
