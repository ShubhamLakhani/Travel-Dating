import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "neutral" | "travel" | "safety" | "outline";
}

export function Badge({
  className,
  variant = "primary",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    primary:
      "bg-[#FF6257]/10 text-[#FF6257] border border-[#FF6257]/20",
    neutral:
      "bg-[var(--surface-muted)] text-[var(--foreground)] border border-[var(--border)]",
    travel:
      "bg-[var(--travel-accent)] text-[#1C3F5E] border border-[#1C3F5E]/15",
    safety:
      "bg-[var(--safety-accent)] text-[#1A4531] border border-[#1A4531]/15",
    outline:
      "bg-transparent text-[var(--foreground)] border border-[var(--border)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full select-none",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
