import Link from "next/link";
import { Button } from "@/components/ui/button";
import Container from "./Container";
import ThemeLogo from "../common/theme/ThemeLogo";
import { createClient } from "@/utils/supabase/server";



const navItems = [
  { href: "/#explore", label: "Explore" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#docs", label: "Docs" },
];


export default async function Header() {
  // 1. สร้าง Supabase Client ฝั่ง Server
  const supabase = await createClient()
  // 2. ใช้ await เช็คสิทธิ์ผู้ใช้งานปัจจุบัน (ดึงข้อมูลมาจาก Session คุกกี้)
  const { data: { user } } = await supabase.auth.getUser()
  return (
    <header className="sticky top-0 z-50   bg-background backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold">
          <ThemeLogo />
        </Link>

        {/* <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >

              <span>{item.label}</span>
            </Link>
          ))}

        </nav> */}

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost"  >
                {user.email}
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost"  >
                <Link href="/auth/login">Sign In</Link>
              </Button>

            </div>
          )}
          <div className="flex items-center gap-2">
            <Button size="lg"  className="rounded-md bg-primary   px-3" >
              <span>Get Started</span>
            </Button>
          </div>
        </div>


      </Container>
    </header>
  );
}
