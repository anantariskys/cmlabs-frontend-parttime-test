"use client";

import Link from "next/link";
import { Bell, Bookmark, Search } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navigation = [
  {
    label: "Browse",
    href: "/ingredients",
    match: (pathname: string) => pathname === "/ingredients",
  },
  {
    label: "Recipes",
    href: "/ingredients",
    match: (pathname: string) =>
      pathname.startsWith("/ingredients/") || pathname.startsWith("/meals/"),
  },
  { label: "Plans", href: "/ingredients", match: () => false },
  { label: "Favorites", href: "/ingredients", match: () => false },
];

export function AppNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-8">
          <Link
            href="/ingredients"
            className="text-sm font-semibold tracking-tight text-foreground"
          >
            CulinaryArchitect
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => {
              const active = item.match(pathname);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "rounded-xl px-3 py-2 text-xs font-medium transition-all duration-200 ease-in-out",
                    active
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:bg-accent/70 hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden size-9 items-center justify-center rounded-xl border border-border/80 bg-background text-muted-foreground transition-all duration-200 ease-in-out hover:bg-accent hover:text-foreground md:inline-flex"
            aria-label="Search"
          >
            <Search className="size-4" />
          </button>
          <button
            type="button"
            className="hidden size-9 items-center justify-center rounded-xl border border-border/80 bg-background text-muted-foreground transition-all duration-200 ease-in-out hover:bg-accent hover:text-foreground md:inline-flex"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
          </button>
          <button
            type="button"
            className="hidden size-9 items-center justify-center rounded-xl border border-border/80 bg-background text-muted-foreground transition-all duration-200 ease-in-out hover:bg-accent hover:text-foreground md:inline-flex"
            aria-label="Saved"
          >
            <Bookmark className="size-4" />
          </button>
          <div className="flex size-9 items-center justify-center rounded-full bg-primary/12 text-xs font-semibold text-primary">
            CA
          </div>
        </div>
      </div>
    </header>
  );
}
