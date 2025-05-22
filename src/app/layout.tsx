import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/app-logo';
import { AppHeader } from '@/components/app-header';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';
import { Home, ListVideo, Film, Settings, Tv2 } from 'lucide-react';
import Script from 'next/script'; // Import Script component

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Canal Play - Sua TV Ao Vivo Online',
  description: 'Seu guia definitivo para canais de TV abertos online.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <SidebarProvider>
          <Sidebar collapsible="icon" variant="sidebar" side="left">
            <SidebarHeader className="p-4">
              <Link href="/" className="flex items-center gap-2">
                <AppLogo className="h-8 w-8 text-primary" />
                <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">
                  Canal Play
                </span>
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Navegar Canais">
                    <Link href="/">
                      <Tv2 />
                      <span>Navegar Canais</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Recomendações">
                    <Link href="/recommendations">
                      <Film />
                      <span>Recomendações</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {/* Add more navigation items here if needed */}
              </SidebarMenu>
            </SidebarContent>
            {/* 
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Settings">
                    <Link href="#">
                      <Settings />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
            */}
          </Sidebar>
          <SidebarInset>
            <AppHeader />
            <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
        {/* Load HLS.js from CDN. Removed 'async', using 'defer' as a common practice.
            Or use 'beforeInteractive' strategy with next/script for earlier availability if needed.
            For simplicity, just removing async for now.
        */}
        <Script src="https://cdn.jsdelivr.net/npm/hls.js@latest" strategy="lazyOnload" />
      </body>
    </html>
  );
}
