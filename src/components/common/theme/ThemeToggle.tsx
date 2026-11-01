"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    // ลอยไว้มุมล่างขวา fixed ตำแหน่งเหมือนปุ่ม Next Debug
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        // ใช้ bg-black/5 ในโหมดสว่าง และ bg-white/5 ในโหมดมืด เพื่อให้กลืนไปกับจอ
        // เมื่อ hover ถึงจะชัดขึ้นมาเล็กน้อย ไร้กรอบและขอบหนา 100%
        className="flex h-9 w-9 items-center justify-center rounded-lg 
                   bg-neutral-500/5 hover:bg-neutral-500/10 
                   backdrop-blur-md transition-all duration-200 
                   text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
        aria-label="Toggle theme"
      >
        {resolvedTheme === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </button>
    </div>
  )
}
