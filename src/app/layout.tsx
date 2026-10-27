import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Thai, Geist } from "next/font/google";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Container from "@/components/layouts/Container";
import ClientLayout from "@/components/common/ClientLayoutWrapper";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/common/theme/ThemeToggle";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["thai"],
});

export const metadata: Metadata = {
  title: {
    default: "SKILLS KEEPER",
    template: "%s | SKILLS KEEPER",
  }

  ,
  description: "Keep your agent skills up to date with $kills Keeper",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", notoSans.variable, notoSansThai.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider
          attribute='class'
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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

            <Footer />
          </div>
                    
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
