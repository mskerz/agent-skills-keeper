"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "cn"

// Subscribe เปล่าสำหรับ useSyncExternalStore ตรวจสอบสถานะ client mount
const emptySubscribe = () => () => { }

export interface ThemeToggleProps {
  /**
   * รูปแบบการจัดวาง:
   * - "inline": จัดวางตาม Document Flow ปกติ (เหมาะสำหรับวางใน Navbar, Header หรือ Toolbar)
   * - "fixed": ลอยอยู่บนหน้าจอตามมุมที่กำหนด (เหมาะสำหรับหน้า Landing Page)
   * @default "inline"
   */
  variant?: "inline" | "fixed"

  /**
   * ตำแหน่งมุมหน้าจอเมื่อแสดงผลแบบ fixed
   * @default "bottom-right"
   */
  placement?: "bottom-right" | "bottom-left" | "top-right" | "top-left"

  /**
   * รองรับ property position เดิมเพื่อ backward compatibility
   */
  position?: "fixed" | "inline" | "static" | "relative" | "absolute"

  /**
   * ClassName เพิ่มเติมสำหรับ Wrapper Container
   */
  className?: string

  /**
   * ClassName เพิ่มเติมสำหรับปุ่ม Button โดยตรง
   */
  buttonClassName?: string

  /**
   * Variant ของปุ่มตาม Button ของ shadcn/ui
   * @default "ghost"
   */
  buttonVariant?: "ghost" | "outline" | "default" | "secondary"

  /**
   * ขนาดของปุ่มตาม Button ของ shadcn/ui
   * @default "icon"
   */
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"
}

const placementMap: Record<NonNullable<ThemeToggleProps["placement"]>, string> = {
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
}

export function ThemeToggle({
  variant = "inline",
  placement = "bottom-right",
  position,
  className,
  buttonClassName,
  buttonVariant = "ghost",
  size = "icon",
}: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme()

  // คืนค่า true เมื่ออยู่บน Client และ false เมื่ออยู่บน Server (SSR safe)
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  // ตรวจสอบว่าต้องแสดงผลแบบ Fixed หรือไม่ (พิจารณาทั้ง variant และ position)
  const isFixed = variant === "fixed" || position === "fixed"
  const activeVariant = buttonVariant

  const containerClasses = isFixed
    ? cn("fixed z-50", placementMap[placement], className)
    : cn("inline-flex items-center", className)

  const baseButtonClasses = isFixed
    ? "rounded-lg backdrop-blur-md transition-all duration-200 cursor-pointer"
    : "rounded-lg transition-colors duration-200 cursor-pointer"

  // ป้องกัน Layout Shift (CLS) ระหว่าง SSR ด้วยการ render placeholder ขนาดเท่ากัน
  if (!mounted) {
    return (
      <div className={containerClasses}>
        <Button
          variant={activeVariant}
          size={size}
          className={cn(baseButtonClasses, "opacity-0 pointer-events-none", buttonClassName)}
          disabled
          aria-hidden="true"
        >
          <Sun className="size-4" />
        </Button>
      </div>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <div className={containerClasses}>
      <Button
        variant={activeVariant}
        size={size}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={cn(baseButtonClasses, buttonClassName)}
        aria-label="Toggle theme"
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? (
          <Sun className="size-4" />
        ) : (
          <Moon className="size-4" />
        )}
      </Button>
    </div>
  )
}

export default ThemeToggle
