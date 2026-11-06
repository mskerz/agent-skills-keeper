'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FileQuestion, ArrowLeft, Home, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export interface NotFoundViewProps {
  /**
   * บริบทการแสดงผล:
   * - 'root': แสดงเต็มหน้าจอแบบ Standalone (หน้าจอหลักระดับ root)
   * - 'main': แสดงในหน้าเว็บหลัก (ภายใต้ MainLayout มี Header/Footer)
   * - 'app': แสดงในส่วนของ Dashboard/App (ภายใต้ ProtectedLayout มี Sidebar)
   */
  context?: 'root' | 'main' | 'app'
  title?: string
  description?: string
  homeHref?: string
  homeLabel?: string
  className?: string
}

export function NotFoundView({
  context = 'root',
  title = 'Page Not Found',
  description = "The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.",
  homeHref,
  homeLabel,
  className,
}: NotFoundViewProps) {
  const router = useRouter()

  // ค่า Default ตามบริบท (Context)
  const isApp = context === 'app'
  const isRoot = context === 'root'

  const resolvedHomeHref = homeHref ?? (isApp ? '/app' : '/')
  const resolvedHomeLabel = homeLabel ?? (isApp ? 'Back to Dashboard' : 'Back to Home')
  const HomeIcon = isApp ? LayoutDashboard : Home

  return (
    <div
      className={cn(
        'flex w-full items-center justify-center px-4 py-12',
        isRoot ? 'min-h-screen bg-background' : 'min-h-[65vh]',
        className
      )}
    >
      <div className="flex w-full max-w-md flex-col items-center text-center">
        {/* Icon & 404 Status Badge */}
        <div className="relative mb-6 flex size-20 items-center justify-center rounded-2xl bg-muted/80 ring-1 ring-border shadow-xs">
          <FileQuestion className="size-10 text-muted-foreground" aria-hidden="true" />
          <Badge
            variant="default"
            className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-bold tracking-wider shadow-xs"
          >
            404
          </Badge>
        </div>

        {/* Title & Description */}
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="cursor-pointer gap-2"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span>Go Back</span>
          </Button>

          <Button
            nativeButton={false}
            render={<Link href={resolvedHomeHref} />}
            className="cursor-pointer gap-2"
          >
            <HomeIcon className="size-4" aria-hidden="true" />
            <span>{resolvedHomeLabel}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFoundView
