import Link from "next/link";
import { Hand } from "lucide-react";
import { getBetaApkHref } from "@/lib/config/beta-apk";
import { primaryNav } from "@/lib/data/navigation";

export function SiteHeader() {
  const apkHref = getBetaApkHref();

  return (
    <header className="bg-background/80 supports-backdrop-filter:bg-background/70 border-border sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-4">
        <Link
          href="/"
          className="text-foreground flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="bg-primary/15 text-primary flex h-9 w-9 items-center justify-center rounded-lg">
            <Hand className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-lg">Deafy</span>
        </Link>

        <nav
          className="text-muted-foreground hidden items-center gap-8 text-sm font-medium md:flex"
          aria-label="Primary"
        >
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={apkHref}
            className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring hidden rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition focus-visible:ring-2 focus-visible:outline-none sm:inline-flex"
          >
            Download beta APK
          </Link>
          <Link
            href="#download"
            className="text-primary hover:text-primary/80 text-sm font-semibold md:hidden"
          >
            Beta
          </Link>
        </div>
      </div>
    </header>
  );
}
