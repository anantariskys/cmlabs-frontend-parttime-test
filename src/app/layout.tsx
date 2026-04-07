import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { AppFooter } from "@/components/layout/app-footer";
import { AppNavbar } from "@/components/layout/app-navbar";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Meals Explorer",
    template: "%s | Meals Explorer",
  },
  description: "Explore ingredients and meals from TheMealDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <AppNavbar />
          <main className="flex-1">{children}</main>
          <AppFooter />
        </QueryProvider>
      </body>
    </html>
  );
}
