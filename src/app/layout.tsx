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
import { Home, ListVideo, Film, Settings } from 'lucide-react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CineStream Navigator',
  description: 'Your ultimate guide to online CSN streams.',
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
                  CineStream
                </span>
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Browse Streams">
                    <Link href="/">
                      <Home />
                      <span>Browse Streams</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Recommendations">
                    <Link href="/recommendations">
                      <Film />
                      <span>Recommendations</span>
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
      </body>
    </html>
  );
}
