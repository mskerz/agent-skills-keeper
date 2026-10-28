// components/Footer.tsx
import { GITHUB_URL } from "@/constants/app";
import Container from "./Container";

export default function Footer() {
  // TODO: เพิ่ม Docs / Terms / Privacy กลับมาเมื่อมีหน้าจริงแล้ว
  const menuFooter = [
    { label: "GitHub", href: GITHUB_URL, external: true },
  ];

  return (
    <footer className="border-t bg-muted/30">
      <Container className="py-6 flex justify-between items-center text-sm text-muted-foreground">
        <div className="flex gap-4">
          {menuFooter.map((item, index) => (
            <a
              key={index}
              href={item.href}
              {...(item.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div>© 2026 Skills Keeper. All rights reserved.</div>
      </Container>
    </footer>
  );
}
