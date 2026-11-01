import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Thai, Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import ClientLayout from "@/components/common/ClientLayoutWrapper";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/common/theme/ThemeToggle";
import { Toaster } from "@/components/ui/toast"

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });


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
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["thai"],
});

export const metadata: Metadata = {
  title: {
    default: "$KILLS KEEPER",
    template: "%s | $KILLS KEEPER",
  }
  ,
  description: "Keep your agent skills up to date with $kills Keeper",
};




export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn("h-full", "antialiased", notoSans.variable, notoSansThai.variable, "font-sans", geist.variable, geistMono.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider
          attribute='class'
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            {children}
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
