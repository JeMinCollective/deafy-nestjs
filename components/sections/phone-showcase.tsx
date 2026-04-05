import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type PhoneShowcaseProps = {
  /** Main phone: full screenshot under `public/` or remote URL. Ignored if `primaryContent` is set. */
  primarySrc?: string;
  primaryAlt?: string;
  /** Replace the primary screen with any React tree (maps, custom UI, iframe, etc.). */
  primaryContent?: ReactNode;
  /** Second layered device — image URL. Ignored if `secondaryContent` is set. */
  secondarySrc?: string;
  secondaryAlt?: string;
  secondaryContent?: ReactNode;
  /**
   * Overlays on the screen: `full` (status + island + home pill), `minimal` (home pill only),
   * or `false` for bezel only—use `false` or `minimal` when your screenshot already shows the OS UI.
   */
  deviceChrome?: "full" | "minimal" | false;
  /** Optional floating UI (cards, badges) around the devices. */
  children?: ReactNode;
  className?: string;
};

type DeviceMockupProps = {
  children: ReactNode;
  className?: string;
  rotation?: string;
  widthClass?: string;
  chrome?: "full" | "minimal" | false;
};

function DeviceMockup({
  children,
  className,
  rotation = "",
  widthClass = "w-[min(100%,260px)] sm:w-[280px]",
  chrome = "minimal",
}: DeviceMockupProps) {
  return (
    <div className={cn("relative isolate", rotation, widthClass, className)}>
      {/* Side button (power) */}
      <div
        className="absolute -right-[3px] top-[22%] z-0 h-14 w-[5px] rounded-r-md bg-gradient-to-b from-zinc-700 to-zinc-900 shadow-md"
        aria-hidden
      />
      {/* Volume hints */}
      <div
        className="absolute -left-[3px] top-[18%] z-0 h-10 w-[4px] rounded-l-md bg-gradient-to-b from-zinc-700 to-zinc-900 shadow-md"
        aria-hidden
      />
      <div
        className="absolute -left-[3px] top-[26%] z-0 h-10 w-[4px] rounded-l-md bg-gradient-to-b from-zinc-700 to-zinc-900 shadow-md"
        aria-hidden
      />

      {/* Outer shell — metal / glass edge */}
      <div
        className={cn(
          "rounded-[2.85rem] bg-gradient-to-b from-zinc-700 via-zinc-900 to-zinc-950 p-[11px]",
          "shadow-[0_32px_64px_-16px_rgba(0,0,0,0.55),0_12px_24px_-8px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.14)]",
          "ring-1 ring-zinc-950/80",
        )}
      >
        <div className="relative overflow-hidden rounded-[2.35rem] bg-black ring-1 ring-white/10">
          {/* Inner glare */}
          <div
            className="pointer-events-none absolute inset-0 z-30 rounded-[2.35rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]"
            aria-hidden
          />

          <div
            className="relative aspect-[9/19.5] w-full bg-zinc-950"
            style={{ maxHeight: "min(78vh, 620px)" }}
          >
            {chrome === "full" ? (
              <>
                <div className="pointer-events-none absolute top-0 right-0 left-0 z-20 h-11 bg-gradient-to-b from-black/55 to-transparent pb-1">
                  <span className="absolute top-3 left-6 text-[11px] font-semibold tracking-wide text-white/95">
                    9:41
                  </span>
                  <span
                    className="absolute top-2.5 left-1/2 h-7 w-[100px] -translate-x-1/2 rounded-full bg-black/90 ring-1 ring-white/12"
                    aria-hidden
                  />
                  <span
                    className="absolute top-3 right-5 flex items-center gap-0.5"
                    aria-hidden
                  >
                    <span className="h-2 w-4 rounded-[1px] bg-white/90" />
                    <span className="h-2 w-1 rounded-[1px] bg-white/90" />
                    <span className="flex h-2.5 w-3 items-center justify-end rounded-[2px] border border-white/80 p-px">
                      <span className="block h-full w-[65%] rounded-[1px] bg-white" />
                    </span>
                  </span>
                </div>
                <div
                  className="pointer-events-none absolute bottom-3 left-1/2 z-20 h-1 w-[92px] -translate-x-1/2 rounded-full bg-white/35"
                  aria-hidden
                />
              </>
            ) : chrome === "minimal" ? (
              <div
                className="pointer-events-none absolute bottom-3 left-1/2 z-20 h-1 w-[92px] -translate-x-1/2 rounded-full bg-white/35"
                aria-hidden
              />
            ) : null}

            <div className="absolute inset-0 z-10">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

type ScreenFillProps = {
  src?: string;
  alt?: string;
  content?: ReactNode;
  sizes: string;
  priority?: boolean;
  contentLabel?: string;
};

function ScreenFill({
  src,
  alt,
  content,
  sizes,
  priority,
  contentLabel = "App screen content",
}: ScreenFillProps) {
  if (content != null) {
    return (
      <div
        className="relative h-full w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900"
        role="img"
        aria-label={contentLabel}
      >
        {content}
      </div>
    );
  }
  if (src) {
    return (
      <Image
        src={src}
        alt={alt ?? "App screenshot"}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-top"
      />
    );
  }
  return (
    <div className="text-muted-foreground flex h-full w-full items-center justify-center bg-zinc-900 text-sm">
      Add primarySrc or primaryContent
    </div>
  );
}

export function PhoneShowcase({
  primarySrc,
  primaryAlt = "Deafy app screen",
  primaryContent,
  secondarySrc,
  secondaryAlt = "Deafy secondary screen",
  secondaryContent,
  deviceChrome = "minimal",
  children,
  className,
}: PhoneShowcaseProps) {
  const hasSecondary = Boolean(secondarySrc || secondaryContent);

  return (
    <div
      className={cn(
        "relative mx-auto flex min-h-[340px] w-full max-w-lg justify-center md:max-w-none md:justify-end",
        className,
      )}
    >
      <div
        className="bg-primary/12 pointer-events-none absolute -top-10 right-0 h-56 w-56 rounded-full blur-3xl md:right-16"
        aria-hidden
      />
      <div
        className="bg-blue-500/15 pointer-events-none absolute bottom-4 left-0 h-48 w-48 rounded-full blur-3xl"
        aria-hidden
      />

      <div className="relative mt-6 min-h-[400px] w-full max-w-[400px] sm:mt-0 sm:max-w-[440px]">
        {/* Back phone */}
        {hasSecondary ? (
          <DeviceMockup
            rotation="-rotate-[8deg] -translate-x-2 sm:-translate-x-4"
            widthClass="w-[min(74%,220px)] sm:w-[240px]"
            chrome={deviceChrome}
            className="absolute top-6 right-6 z-0 sm:top-10 sm:right-12"
          >
            <ScreenFill
              src={secondarySrc}
              alt={secondaryAlt}
              content={secondaryContent}
              sizes="(max-width: 768px) 200px, 240px"
            />
          </DeviceMockup>
        ) : null}

        {/* Front phone */}
        <DeviceMockup
          rotation="rotate-[6deg] sm:rotate-[5deg]"
          widthClass="w-[min(88%,280px)] sm:w-[300px]"
          chrome={deviceChrome}
          className="relative z-10 mx-auto sm:ml-auto sm:mr-4"
        >
          <ScreenFill
            src={primarySrc}
            alt={primaryAlt}
            content={primaryContent}
            sizes="(max-width: 768px) 280px, 300px"
            priority
          />
        </DeviceMockup>

        {children}
      </div>
    </div>
  );
}
