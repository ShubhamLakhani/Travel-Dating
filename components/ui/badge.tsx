import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "neutral" | "travel" | "safety" | "gradient" | "outline";
}

export function Badge({
  className,
  variant = "primary",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    primary:
      "bg-[var(--triply-coral)]/10 text-[var(--triply-coral)] border border-[var(--triply-coral)]/20",
    neutral:
      "bg-[var(--surface-muted)] text-[var(--foreground)] border border-[var(--border)]",
    travel:
      "bg-[var(--triply-purple)]/10 text-[var(--triply-purple)] border border-[var(--triply-purple)]/20",
    safety:
      "bg-[var(--triply-lavender)]/15 text-[var(--triply-midnight)] border border-[var(--triply-lavender)]/30",
    gradient:
      "bg-gradient-to-r from-[#FF735D]/15 via-[#E84A8B]/15 to-[#6B5BFF]/15 text-[var(--foreground)] border border-[#E84A8B]/25",
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
