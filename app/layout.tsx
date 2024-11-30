import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppProvider } from "@/components/providers/AppProvider";
import Navbar from "@/components/commons/Navbar";
import TransactionLogs from "@/components/honeycomb/TransactionLogs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Next.js Solana Boilerplate",
  description: "Next.js Solana Boilerplate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <AppProvider>
          <main className="relative flex min-h-screen flex-col">
            <Navbar />
            <div className="grid grid-cols-3">
              <div className="col-span-2">{children}</div>
              <TransactionLogs />
            </div>
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
