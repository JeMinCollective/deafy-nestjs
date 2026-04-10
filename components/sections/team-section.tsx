"use client";

import Image from "next/image";
import { fetchTeams } from "@/lib/data/team";
import useSWR from "swr";
import { TeamMember } from "@/types/team";

export function TeamSection() {
  const {
    data: teamMembers,
    isLoading,
    error,
  } = useSWR<TeamMember[]>("teams", fetchTeams);

  if (isLoading || error)
    return (
      <section
        id="team"
        className="border-border bg-muted/30 scroll-mt-24 border-y py-16 md:py-24"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="bg-muted mx-auto mb-2 h-4 w-16 animate-pulse rounded" />
            <div className="bg-muted mx-auto h-8 w-64 animate-pulse rounded" />
            <div className="bg-muted mx-auto mt-4 h-4 w-80 animate-pulse rounded" />
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-card ring-border/60 rounded-2xl p-6 text-center ring-1 shadow-sm"
              >
                {/* Avatar */}
                <div className="bg-muted mx-auto mb-4 h-28 w-28 animate-pulse rounded-full" />

                {/* Name */}
                <div className="bg-muted mx-auto h-4 w-24 animate-pulse rounded" />

                {/* Role */}
                <div className="bg-muted mx-auto mt-2 h-3 w-20 animate-pulse rounded" />

                {/* Bio lines */}
                <div className="mt-4 space-y-2">
                  <div className="bg-muted h-3 w-full animate-pulse rounded" />
                  <div className="bg-muted h-3 w-5/6 animate-pulse rounded" />
                  <div className="bg-muted h-3 w-4/6 animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );

  return (
    <section
      id="team"
      className="border-border bg-muted/30 scroll-mt-24 border-y py-16 md:py-24"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-primary mb-2 text-sm font-semibold tracking-wide uppercase">
            Team
          </p>
          <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
            People building Deafy
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Building Deafy is a team effort.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {teamMembers?.map((member) => (
            <article
              key={member.name}
              className="bg-card ring-border/60 hover:ring-primary/25 group rounded-2xl p-6 text-center ring-1 transition shadow-sm"
            >
              <div className="relative mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full ring-2 ring-primary/20">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={224}
                  height={224}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-foreground text-lg font-semibold">
                {member.name}
              </h3>
              <p className="text-primary mt-1 text-sm font-medium">
                {member.role}
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                {member.bio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
