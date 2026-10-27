// components/Footer.tsx
import Container from "./Container";


export default function Footer() {
   
  const menuFooter = [ 
    { label: 'Docs', href:"#"},
    { label: 'GitHub', href:"#"},
    { label: 'Terms', href:"#"},
    { label: 'Privacy', href:"#"}
  ];

  return (
    <footer className="border-t bg-muted/30">
      <Container className="py-6 flex justify-between items-center text-sm text-muted-foreground">
         <div className="flex gap-4">
          {menuFooter.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

         <div>© 2026 Skills Keeper. All rights reserved.</div>
      </Container>
    </footer>
  )
}
