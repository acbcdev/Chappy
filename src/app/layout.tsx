import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chappy",
  description: "Multi Provider Chat open source",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased `}
        >
          <Header />
          <AppSidebar />
          <SidebarInset>
            <div className="bg-background flex h-dvh w-full overflow-hidden">
              <main className="@container relative h-dvh w-0 flex-shrink flex-grow overflow-y-auto">
                {children}
                <Toaster />
              </main>
            </div>
          </SidebarInset>
        </body>
      </html>
    </Providers>
  );
}
