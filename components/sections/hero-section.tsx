import Link from "next/link";
import { Sparkles, Users } from "lucide-react";
import { BetaDownloadTrigger } from "@/components/beta/beta-download-trigger";
import {
  HeroMockAppPrimary,
  HeroMockAppSecondary,
} from "@/components/sections/hero-mock-app-screens";
import { PhoneShowcase } from "@/components/sections/phone-showcase";

export function HeroSection() {
  return (
    <section id="download" className="relative overflow-hidden scroll-mt-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, oklch(0.85 0.02 270 / 0.35) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />
      <div className="from-primary/10 via-background to-background pointer-events-none absolute -top-32 right-0 h-[22rem] w-[22rem] rounded-full bg-gradient-to-bl blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="container relative mx-auto px-4 pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.08fr] lg:gap-8">
          <div className="max-w-xl">
            <p className="text-primary mb-3 text-sm font-semibold tracking-wide uppercase">
              Deafy mobile app
            </p>
            <h1 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              Communication barrier is no longer in its limit.
            </h1>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
              Deafy gives Deaf communicators professional, real-time
              support—join the Android beta, help train hand-signing in Deafy,
              and shape what comes next.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BetaDownloadTrigger variant="hero" />
              <Link
                href="#features"
                className="border-border text-foreground hover:bg-muted/80 focus-visible:ring-ring inline-flex rounded-full border px-6 py-3.5 text-base font-semibold transition focus-visible:ring-2 focus-visible:outline-none"
              >
                Explore features
              </Link>
            </div>
            <p className="text-muted-foreground mt-6 max-w-md text-sm leading-relaxed">
              Deafy beta opt-in may collect anonymized signing samples you
              explicitly approve to improve recognition—see in-app privacy
              details in Deafy before sharing.
            </p>
          </div>

          <PhoneShowcase
            primaryContent={<HeroMockAppPrimary />}
            secondaryContent={<HeroMockAppSecondary />}
            deviceChrome="full"
          >
            {/* Floating cards — reference-style depth; remove or edit freely */}
            <div className="border-border/80 bg-card/95 text-card-foreground absolute top-[12%] -left-1 z-20 hidden max-w-[11.5rem] rounded-2xl border p-3 shadow-xl backdrop-blur-md sm:block md:-left-2">
              <div className="flex items-center gap-2">
                <span className="bg-primary/15 text-primary flex h-9 w-9 items-center justify-center rounded-full">
                  <Users className="h-4 w-4" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold">Deafy beta</p>
                  <p className="text-muted-foreground truncate text-[10px]">
                    Improve Deafy safely
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mt-2 text-[10px] leading-snug">
                Your opt-in feedback helps Deafy recognize signs more accurately.
              </p>
            </div>

            <div className="border-border/80 bg-card/95 text-card-foreground absolute right-0 bottom-[20%] z-20 hidden max-w-[10.5rem] rounded-2xl border p-3 shadow-xl backdrop-blur-md sm:block sm:right-2 md:right-6">
              <div className="flex items-center gap-2">
                <span className="bg-primary/15 text-primary flex h-9 w-9 items-center justify-center rounded-full">
                  <Sparkles className="h-4 w-4" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold">Deafy on-device</p>
                  <p className="text-muted-foreground text-[10px]">
                    Fast signing assist
                  </p>
                </div>
              </div>
            </div>
          </PhoneShowcase>
        </div>
      </div>
    </section>
  );
}
