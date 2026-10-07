import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all select-none rounded-[var(--radius-button)] min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

    const variantStyles = {
      primary:
        "bg-[var(--primary)] text-white hover:brightness-105 active:scale-[0.98] shadow-sm",
      secondary:
        "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--surface-muted)] active:bg-[var(--surface-muted)]/80",
      ghost:
        "bg-transparent text-[var(--foreground)] hover:bg-[var(--surface-muted)] active:bg-[var(--surface-muted)]/80",
      gradient:
        "bg-gradient-to-r from-[#FF735D] via-[#E84A8B] to-[#6B5BFF] text-white hover:opacity-95 shadow-md active:scale-[0.98]",
    };

    const sizeStyles = {
      sm: "h-10 px-4 text-sm gap-2",
      md: "h-[50px] px-6 text-base gap-2.5",
      lg: "h-[56px] px-8 text-lg gap-3",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
