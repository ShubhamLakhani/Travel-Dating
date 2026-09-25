import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "sm" | "default" | "lg";
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing = "default", ...props }, ref) => {
    const spacingStyles = {
      sm: "py-8 sm:py-12",
      default: "py-12 sm:py-16 md:py-20",
      lg: "py-16 sm:py-24 md:py-32",
    };

    return (
      <section
        ref={ref}
        className={cn("w-full", spacingStyles[spacing], className)}
        {...props}
      />
    );
  }
);

Section.displayName = "Section";
