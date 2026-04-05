"use client";

import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export type AccordionImageItem = {
  id: number;
  title: string;
  imageUrl: string;
};

const accordionItems: AccordionImageItem[] = [
  {
    id: 1,
    title: "Live signing with Deafy",
    imageUrl:
      "https://images.unsplash.com/photo-1596522295979-3c146c60431e?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Everyone in the loop",
    imageUrl:
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Deafy on your phone",
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Help train Deafy",
    imageUrl:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Privacy in Deafy",
    imageUrl:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
  },
];

const FALLBACK_IMAGE =
  "https://placehold.co/400x450/2d3748/ffffff?text=Image+Error";

type AccordionItemProps = {
  item: AccordionImageItem;
  isActive: boolean;
  onActivate: () => void;
};

function AccordionItem({ item, isActive, onActivate }: AccordionItemProps) {
  const [imageSrc, setImageSrc] = useState(item.imageUrl);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      aria-label={item.title}
      className={cn(
        "relative hidden h-[450px] shrink-0 cursor-pointer overflow-hidden rounded-2xl transition-all duration-700 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:block",
        isActive ? "w-[400px]" : "w-[60px]",
      )}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
    >
      <Image
        src={imageSrc}
        alt=""
        fill
        sizes="(max-width: 768px) 0px, 400px"
        className="object-cover"
        onError={() => setImageSrc(FALLBACK_IMAGE)}
      />
      <div className="absolute inset-0 bg-black/40" />

      <span
        className={cn(
          "absolute text-lg font-semibold whitespace-nowrap text-white transition-all duration-300 ease-in-out",
          isActive
            ? "bottom-6 left-1/2 -translate-x-1/2 rotate-0"
            : "bottom-24 left-1/2 w-auto -translate-x-1/2 rotate-90 text-left",
        )}
      >
        {item.title}
      </span>
    </div>
  );
}

export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [mobileImageFailed, setMobileImageFailed] = useState(false);

  const activeItem = accordionItems[activeIndex] ?? accordionItems[0];
  const mobileImageSrc = mobileImageFailed
    ? FALLBACK_IMAGE
    : (activeItem?.imageUrl ?? "");

  const setFeatureIndex = (index: number) => {
    setMobileImageFailed(false);
    setActiveIndex(index);
  };

  return (
    <div className="bg-background font-sans">
      <section
        id="features"
        className="container mx-auto max-w-full scroll-mt-24 px-4 py-12 md:py-24"
      >
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:gap-12">
          <div className="w-full text-center md:w-1/2 md:text-left">
            <p className="text-primary mb-3 text-sm font-semibold tracking-wide uppercase">
              What Deafy offers
            </p>
            <h2 className="text-foreground text-3xl leading-tight font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Deafy is built for Deaf communicators—at school, work, and home
            </h2>
            <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-base leading-relaxed sm:text-lg md:mx-0">
              Deafy pairs on-device assistance with clearer day-to-day
              conversations. Join the beta to help improve hand-signing accuracy
              in Deafy, on your terms, with privacy you control.
            </p>
            <div className="mt-8">
              <a
                href="#download"
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-block rounded-lg px-8 py-3 font-semibold shadow-lg transition-colors duration-300"
              >
                Join the beta
              </a>
            </div>
          </div>

          <div className="w-full min-w-0 md:w-1/2">
            {/* Mobile: one image + scrollable chips (horizontal strip is too wide on small viewports) */}
            <div className="md:hidden">
              <div
                className="border-border bg-muted/30 relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl border shadow-sm"
                role="img"
                aria-label={activeItem.title}
              >
                <Image
                  key={`${activeIndex}-${mobileImageSrc}`}
                  src={mobileImageSrc}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 0px"
                  className="object-cover"
                  priority={activeIndex === 2}
                  onError={() => setMobileImageFailed(true)}
                />
                <div className="pointer-events-none absolute inset-0 bg-black/40" />
                <p className="pointer-events-none absolute right-4 bottom-4 left-4 text-center text-base font-semibold leading-snug text-balance text-white sm:text-lg">
                  {activeItem.title}
                </p>
              </div>

              <div
                className="mt-4 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                role="tablist"
                aria-label="Choose a capability"
              >
                {accordionItems.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={index === activeIndex}
                    className={cn(
                      "snap-center shrink-0 rounded-full border px-3.5 py-2 text-left text-xs font-medium transition sm:text-sm",
                      index === activeIndex
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:bg-muted/80",
                    )}
                    onClick={() => setFeatureIndex(index)}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop / tablet: horizontal accordion */}
            <div
              className="hidden flex-row items-center justify-center gap-4 overflow-x-auto p-4 md:flex"
              role="list"
              aria-label="Deafy capabilities"
            >
              {accordionItems.map((item, index) => (
                <div key={item.id} role="listitem">
                  <AccordionItem
                    item={item}
                    isActive={index === activeIndex}
                    onActivate={() => setFeatureIndex(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
