"use client";

import { useBetaSignup } from "@/components/beta/beta-signup-provider";
import { cn } from "@/lib/utils";

type BetaDownloadTriggerProps = {
  variant: "hero" | "header" | "headerMobile" | "text";
  children?: React.ReactNode;
  className?: string;
};

const variants = {
  hero: cn(
    "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold shadow-lg transition focus-visible:ring-2 focus-visible:outline-none",
  ),
  header: cn(
    "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring hidden items-center justify-center rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition focus-visible:ring-2 focus-visible:outline-none sm:inline-flex",
  ),
  headerMobile: cn(
    "text-primary hover:text-primary/80 focus-visible:ring-ring inline-flex items-center text-sm font-semibold transition focus-visible:ring-2 focus-visible:outline-none sm:hidden",
  ),
  text: cn(
    "text-primary hover:text-primary/90 focus-visible:ring-ring font-semibold underline-offset-4 transition hover:underline focus-visible:ring-2 focus-visible:outline-none",
  ),
} as const;

export function BetaDownloadTrigger({
  variant,
  children,
  className,
}: BetaDownloadTriggerProps) {
  const { openSignup } = useBetaSignup();

  return (
    <button
      type="button"
      className={cn(variants[variant], className)}
      onClick={openSignup}
    >
      {children ?? "Download Beta APK"}
    </button>
  );
}
