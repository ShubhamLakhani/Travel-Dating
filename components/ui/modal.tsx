"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  ariaLabel?: string;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  size = "md",
  showCloseButton = true,
  initialFocusRef,
  ariaLabel,
}: ModalProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!isOpen) return;

    // Save previous active element to restore focus on close
    triggerRef.current = document.activeElement as HTMLElement | null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus initial element or first focusable element
    const timer = setTimeout(() => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else if (modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (focusable.length > 0) {
          focusable[0].focus();
        } else {
          modalRef.current.focus();
        }
      }
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusables = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        ).filter((el) => el.offsetParent !== null);

        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement || document.activeElement === modalRef.current) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);

      // Restore focus to original trigger element
      if (triggerRef.current && typeof triggerRef.current.focus === "function") {
        triggerRef.current.focus();
      }
    };
  }, [isOpen, onClose, initialFocusRef]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "md:max-w-sm",
    md: "md:max-w-md",
    lg: "md:max-w-xl",
    xl: "md:max-w-2xl",
  };

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-[var(--midnight)]/40 backdrop-blur-sm transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : ariaLabel}
        tabIndex={-1}
        className={cn(
          "w-full bg-[var(--surface)] border border-[var(--border)] rounded-t-[28px] md:rounded-[24px] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden focus:outline-none animate-in fade-in slide-in-from-bottom-4 duration-200",
          sizeClasses[size],
          className
        )}
      >
        {(title || showCloseButton) && (
          <div className="p-4 sm:p-5 border-b border-[var(--border)] flex items-center justify-between gap-3 shrink-0">
            <div className="min-w-0 flex-1">
              {title && (
                <div className="font-display text-lg font-bold text-[var(--foreground)] truncate">
                  {title}
                </div>
              )}
              {description && (
                <div className="text-xs text-[var(--muted-foreground)] pt-0.5 truncate">
                  {description}
                </div>
              )}
            </div>

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="p-2 rounded-full hover:bg-[var(--surface-muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus)] shrink-0"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
