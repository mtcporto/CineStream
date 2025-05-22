import Link from 'next/link';
import { AppLogo } from '@/components/app-logo';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/95 px-4 shadow-sm backdrop-blur-md md:px-6">
      <div className="flex items-center gap-2">
        <div className="md:hidden">
          <SidebarTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          </SidebarTrigger>
        </div>
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <AppLogo className="h-6 w-6 text-primary" />
          <span className="font-bold">CineStream Navigator</span>
        </Link>
      </div>
      {/* Future additions: User Profile / Settings Dropdown */}
    </header>
  );
}
