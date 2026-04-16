"use client";

import { Timeline } from "@/components/ui/modern-timeline";
import type { TimelineItem } from "@/types/timeline";

export function JourneyTimeline({ items }: { items: TimelineItem[] }) {
  return <Timeline items={items} className="max-w-4xl" />;
}
