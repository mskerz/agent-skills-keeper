import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppUserNavbar, AppUserSidebar } from '@/features/user'
import React from 'react'

export default function ProtectedLayout({ children }: ReactNodeProps) {
    return (
        <SidebarProvider>
            {/* 1. Sidebar ด้านซ้าย */}
            <AppUserSidebar />

            {/* 2. พื้นที่เนื้อหาหลักด้านขวา (ใช้ SidebarInset จาก shadcn) */}
            <SidebarInset className="flex flex-col min-h-screen">
                {/* Header แถบด้านบน: มีปุ่มเปิด-ปิด Sidebar และ UserMenu ด้านขวา */}
               <AppUserNavbar />

                {/* เนื้อหาหน้าลูก (children) พร้อม padding พื้นฐาน */}
                <div className="flex-1 p-6">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
