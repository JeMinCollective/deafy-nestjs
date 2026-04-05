import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/hero-section";
import { JourneySection } from "@/components/sections/journey-section";
import { SectionLoadingFallback } from "@/components/sections/section-loading-fallback";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { TeamSection } from "@/components/sections/team-section";

const LandingFeatures = dynamic(
  () =>
    import("@/components/ui/interactive-image-accordion").then((m) => ({
      default: m.LandingAccordionItem,
    })),
  {
    loading: () => (
      <SectionLoadingFallback
        label="Loading features"
        className="min-h-[28rem]"
      />
    ),
  },
);

export function LandingShell() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <LandingFeatures />
        <TeamSection />
        <JourneySection />
      </main>
      <SiteFooter />
    </>
  );
}
