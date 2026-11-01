import Link from "next/link";
import { Button } from "@/components/ui/button";
import Container from "./Container";
import ThemeLogo from "../common/theme/ThemeLogo";
import { homeNavItems } from "@/features/home/constants/sections";
import SectionNav from "./SectionNav";
import { Suspense } from "react";
import { UserMenu } from "@/features/user";
import { Skeleton } from "../ui/skeleton";

// const navItems = [
//   { href: "/#explore", label: "Explore" },
//   { href: "/#how-it-works", label: "How it works" },
//   { href: "/#docs", label: "Docs" },
// ];

export default async function Header() {


  return (
    <header className="sticky top-0 z-50 bg-background backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold">
          <ThemeLogo />
        </Link>

        <SectionNav items={homeNavItems} className="hidden md:flex" />

        <Suspense
          fallback={
            <div className="flex items-center gap-4">
              <Skeleton className="h-9 w-20 rounded-md" />
              <Skeleton className="h-10 w-28 rounded-md" />
            </div>
          }
        >
          <UserMenu />
        </Suspense>
      </Container>
    </header>
  );
}
