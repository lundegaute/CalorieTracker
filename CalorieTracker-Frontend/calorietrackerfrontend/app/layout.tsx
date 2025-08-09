import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/Theme/themeProvider";
import QueryProvider from "@/components/Tanstack/tanstackProvider";
import CheckAuthStatus from "@/components/Zustand/AuthStore/checkAuthStatus";


const lato = Lato({ subsets: ["latin"], weight: ["400", "700", "900"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "700", "900"] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Calorie Tracker",
  description: "Create, track, and manage your meals with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} "min-h-screen text-slate-100 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-800 selection:bg-emerald-400/30 selection:text-white"`}>
        <ThemeProvider>
          <QueryProvider>
            <CheckAuthStatus />
            <Header />
            <main className="px-8 pb-24">
              {children}
            </main>
            <Footer />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
