import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "narrow" | "default" | "wide" | "full";
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "default", ...props }, ref) => {
    const sizeStyles = {
      narrow: "max-w-md",       // Focused mobile-first / form card view (~390-448px)
      default: "max-w-5xl",      // Standard reading & section flow
      wide: "max-w-7xl",         // Wider layouts
      full: "max-w-full",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full mx-auto px-4 sm:px-6 lg:px-8",
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";
