// components/Footer.tsx
import Container from "./Container";

interface FooterProps extends BaseProps {
  year?: number;
}



export default function Footer({ year }: FooterProps) {
  return (
    <footer className="border-t bg-muted/30">
      <Container className="py-6 text-center text-sm text-muted-foreground">
        © {year || '2026'} Relearn. All rights reserved.
      </Container>
    </footer>
  );
}
