"use client";

import dynamic from "next/dynamic";
import useSWR from "swr";

import { fetchJourneys } from "@/lib/data/journey";
import { SectionLoadingFallback } from "@/components/sections/section-loading-fallback";
import { TimelineItem } from "@/types/timeline";

const JourneyTimeline = dynamic(
  () =>
    import("@/components/sections/journey-timeline").then((m) => ({
      default: m.JourneyTimeline,
    })),
  {
    loading: () => (
      <SectionLoadingFallback
        label="Loading journey"
        className="min-h-[24rem]"
      />
    ),
  },
);

export function JourneySection() {
  const {
    data: journeys = [],
    isLoading,
    error,
  } = useSWR<TimelineItem[]>("journeys", fetchJourneys);

  if (isLoading) {
    return (
      <section
        id="journey"
        className="bg-background scroll-mt-24 py-16 md:py-24"
      >
        <div className="container mx-auto px-4">
          <SectionLoadingFallback
            label="Loading journey"
            className="min-h-[24rem]"
          />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="journey"
        className="bg-background scroll-mt-24 py-16 md:py-24"
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500 font-medium">
            Failed to load journey data.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="journey" className="bg-background scroll-mt-24 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <p className="text-primary mb-2 text-sm font-semibold tracking-wide uppercase">
            Our Journey
          </p>
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            How Deafy came together
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg leading-relaxed">
            Milestones on the road to Deafy—community-led research, careful
            privacy work, and a beta that invites more signers to shape the app
            with us.
          </p>
        </header>

        <JourneyTimeline items={journeys} />
      </div>
    </section>
  );
}
