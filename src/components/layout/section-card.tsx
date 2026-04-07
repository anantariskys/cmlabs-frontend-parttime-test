import type * as React from "react";

import { cn } from "@/lib/utils";

type SectionCardProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export function SectionCard({
  title,
  description,
  action,
  children,
  className,
  contentClassName,
}: SectionCardProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border/80 bg-card shadow-sm transition-all duration-200 ease-in-out",
        className,
      )}
    >
      {title || description || action ? (
        <header className="flex flex-col gap-4 border-b border-border/70 px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
          <div className="space-y-1">
            {title ? (
              <h2 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </header>
      ) : null}
      <div className={cn("p-4 sm:p-6", contentClassName)}>{children}</div>
    </section>
  );
}
