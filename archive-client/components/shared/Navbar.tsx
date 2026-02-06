"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Home,
  LogIn,
  UserPlus,
  Newspaper,
  BookOpen,
  Users,
  LifeBuoy,
  Folder,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "./ModeToggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/archive", label: "Archive", icon: Newspaper },
    { href: "/knowledge-center", label: "Knowledge", icon: BookOpen },
    { href: "/topics", label: "Topics", icon: Folder },
    { href: "/community-groups", label: "Community", icon: Users },
    { href: "/nesohq-support", label: "Support", icon: LifeBuoy },
  ];

  const closeSheet = () => setIsOpen(false);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500 border-b",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-border shadow-sm"
          : "bg-background border-transparent"
      )}
      suppressHydrationWarning
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-semibold text-lg hover:text-primary transition-colors"
          >
            BGCE Archive
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-sm font-medium tracking-wide transition-all duration-300 uppercase py-2",
                    isActive
                      ? "text-primary font-bold"
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary animate-in fade-in slide-in-from-left-2" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <ModeToggle />
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-sm font-medium"
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button
              size="sm"
              asChild
              className="text-sm font-medium"
            >
              <Link href="/register">Sign up</Link>
            </Button>
          </div>

          <div className="flex lg:hidden items-center gap-4">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-md">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-6 border-b">
                    <span className="font-semibold text-lg">Menu</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={closeSheet}
                      className="rounded-md"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex-1 py-6 space-y-1">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeSheet}
                          className={cn(
                            "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                            isActive
                              ? "bg-muted text-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="pt-6 border-t space-y-2">
                    <Button
                      variant="outline"
                      asChild
                      className="w-full justify-center"
                    >
                      <Link href="/login" onClick={closeSheet}>
                        Login
                      </Link>
                    </Button>
                    <Button asChild className="w-full justify-center">
                      <Link href="/register" onClick={closeSheet}>
                        Sign up
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
