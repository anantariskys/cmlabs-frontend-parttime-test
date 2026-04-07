import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type AppShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
  eyebrow?: string;
  breadcrumbs?: BreadcrumbItem[];
  headerActions?: React.ReactNode;
};

export function AppShell({
  title,
  subtitle,
  children,
  backHref,
  backLabel = "Kembali",
  eyebrow = "Food Library",
  breadcrumbs,
  headerActions,
}: AppShellProps) {
  const trail = breadcrumbs ?? [
    { label: "Home", href: "/" },
    { label: "Food" },
    { label: title },
  ];

  return (
    <div className="bg-background">
      <main className="container mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
            {trail.map((item, index) => (
              <div
                key={`${item.label}-${index}`}
                className="flex items-center gap-2"
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="transition-all duration-200 ease-in-out hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={
                      index === trail.length - 1 ? "text-foreground" : ""
                    }
                  >
                    {item.label}
                  </span>
                )}
                {index < trail.length - 1 ? (
                  <span className="text-border">/</span>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
            <div className="space-y-2">
              <p className="text-[10px] font-semibold tracking-[0.24em] text-primary uppercase">
                {eyebrow}
              </p>
              <h1 className="font-heading text-3xl font-semibold tracking-[-0.04em] text-foreground md:text-[2.5rem]">
                {title}
              </h1>
              {subtitle ? (
                <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                  {subtitle}
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {headerActions}
              {backHref ? (
                <Link
                  href={backHref}
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "sm",
                    }),
                    "w-fit",
                  )}
                >
                  {"<-"} {backLabel}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
        <section>{children}</section>
      </main>
    </div>
  );
}
