import { Suspense } from "react";
import { ThemeToggle } from "@/components/common/theme/ThemeToggle";
import Header from "@/components/layouts/Header";
import ClientLayout from "@/components/common/ClientLayoutWrapper";
import Footer from "@/components/layouts/Footer";




export default function MainLayout({ children }: ReactNodeProps) {
    return (
        <>
            <div className="flex min-h-screen flex-col">
                <Suspense
                    fallback={<header className="h-16" />}
                >
                    <Header />
                </Suspense>

                <main className="flex-1">
                    <ClientLayout>
                        {children}
                    </ClientLayout>
                </main>

                {/* ใช้ Suspense ครอบ เพื่อไม่ให้หน้าเว็บหลักต้องรอโหลด Footer จนเสร็จ */}
                <Suspense fallback={<div className="h-40 bg-gray-50" />}>
                    <Footer />
                </Suspense>
            </div>

            <ThemeToggle />
        </>
    );
}