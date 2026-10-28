import Link from "next/link";
import { Button } from "@/components/ui/button";
import Container from "./Container";
import ThemeLogo from "../common/theme/ThemeLogo";
import { createClient } from "@/utils/supabase/server";
import { homeNavItems } from "@/features/home/constants/sections";
import SectionNav from "./SectionNav";

// const navItems = [
//   { href: "/#explore", label: "Explore" },
//   { href: "/#how-it-works", label: "How it works" },
//   { href: "/#docs", label: "Docs" },
// ];

export default async function Header() {
  // 1. สร้าง Supabase Client ฝั่ง Server
  const supabase = await createClient();
  // 2. ใช้ await เช็คสิทธิ์ผู้ใช้งานปัจจุบัน (ดึงข้อมูลมาจาก Session คุกกี้)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 bg-background backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold">
          <ThemeLogo />
        </Link>

        <SectionNav items={homeNavItems} className="hidden md:flex" />

        <div className="flex items-center gap-4">
          {user ? (
            <Button variant="ghost">{user.email}</Button>
          ) : (
            <>
              <Button
                variant="ghost"
                nativeButton={false}
                render={<Link href="/auth/login" />}
              >
                Sign In
              </Button>
              <Button
                size="lg"
                className="rounded-md px-3"
                nativeButton={false}
                render={<Link href="/auth/register" />}
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </Container>
    </header>
  );
}
