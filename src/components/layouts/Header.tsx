import Link from "next/link";
import Container from "./Container";

const navItems = [
  { href: "/", label: "หน้าแรก" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/contact", label: "ติดต่อเรา" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold">
          Skills Keeper
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
