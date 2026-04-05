import Link from "next/link";
import { primaryNav } from "@/lib/data/navigation";

export function SiteFooter() {
  return (
    <footer className="border-border bg-muted/20 border-t py-12">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:text-left">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Deafy. An app built with the Deaf
          community.
        </p>
        <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-6 text-sm">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-foreground transition"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
