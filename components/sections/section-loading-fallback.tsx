import { cn } from "@/lib/utils";

type SectionLoadingFallbackProps = {
  label: string;
  className?: string;
};

/** Lightweight placeholder for `next/dynamic` loading states. */
export function SectionLoadingFallback({
  label,
  className,
}: SectionLoadingFallbackProps) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label={label}
      className={cn(
        "bg-muted/20 flex min-h-[12rem] animate-pulse items-center justify-center rounded-lg",
        className,
      )}
    >
      <span className="text-muted-foreground text-sm">{label}</span>
    </div>
  );
}
