import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";



export default function AuthLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            {/* จัดการตบแต่งสไตล์พื้นหลัง หรือกรอบเซ็นเตอร์ของหน้า Login/Register ได้ที่นี่ */}
            <div className="w-full max-w-md">
                <div className="container mx-auto">
                    <Link href={"/"}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft />
                        <span>กลับไปหน้าหลัก </span>
                    </Link>

                    {children}
                </div>

            </div>
        </div>
    );
}