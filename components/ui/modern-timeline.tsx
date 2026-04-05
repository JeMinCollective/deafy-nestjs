"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TimelineItem, TimelineProps } from "@/types/timeline";
import { CheckCircle, Clock, Circle } from "lucide-react";

export type { TimelineItem, TimelineProps } from "@/types/timeline";

const getStatusConfig = (status: TimelineItem["status"]) => {
  const configs = {
    completed: {
      progressColor: "bg-success",
      borderColor: "border-success/20",
      badgeBg: "bg-success/10",
      badgeText: "text-success",
    },
    current: {
      progressColor: "bg-blue-600 dark:bg-blue-400",
      borderColor: "border-blue-600/20 dark:border-blue-400/20",
      badgeBg: "bg-blue-100 dark:bg-blue-900/30",
      badgeText: "text-blue-800 dark:text-blue-200",
    },
    upcoming: {
      progressColor: "bg-warning",
      borderColor: "border-warning/20",
      badgeBg: "bg-warning/10",
      badgeText: "text-warning",
    },
  };

  return configs[status ?? "upcoming"];
};

const getStatusIcon = (status: TimelineItem["status"]) => {
  switch (status) {
    case "completed":
      return CheckCircle;
    case "current":
      return Clock;
    default:
      return Circle;
  }
};

export function Timeline({ items, className }: TimelineProps) {
  if (!items || items.length === 0) {
    return (
      <div
        className={cn("mx-auto w-full max-w-4xl px-4 py-8 sm:px-6", className)}
      >
        <p className="text-muted-foreground text-center">
          No timeline items to display
        </p>
      </div>
    );
  }

  return (
    <section
      className={cn("mx-auto w-full max-w-4xl px-4 py-8 sm:px-6", className)}
      role="list"
      aria-label="Timeline of events and milestones"
    >
      <div className="relative">
        <div
          className="bg-border absolute top-0 bottom-0 left-4 w-px sm:left-6"
          aria-hidden="true"
        />

        <motion.div
          className="bg-primary absolute top-0 left-4 w-px origin-top sm:left-6"
          initial={{ scaleY: 0 }}
          whileInView={{
            scaleY: 1,
            transition: {
              duration: 1.2,
              ease: "easeOut",
              delay: 0.2,
            },
          }}
          viewport={{ once: true }}
          aria-hidden="true"
        />

        <div className="relative space-y-8 sm:space-y-12">
          {items.map((item, index) => {
            const config = getStatusConfig(item.status);
            const IconComponent = getStatusIcon(item.status);

            return (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                }}
                viewport={{ once: true, margin: "-30px" }}
                role="listitem"
                aria-label={`Timeline item ${index + 1}: ${item.title}`}
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="relative shrink-0">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      tabIndex={0}
                      role="img"
                      aria-label={`Avatar for ${item.title}`}
                    >
                      <div className="border-background relative z-10 h-12 w-12 overflow-hidden rounded-full border-2 shadow-lg sm:h-16 sm:w-16">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={`${item.title} avatar`}
                            width={64}
                            height={64}
                            sizes="64px"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="bg-muted flex h-full w-full items-center justify-center">
                            <IconComponent
                              className="text-muted-foreground/70 h-5 w-5 sm:h-6 sm:w-6"
                              aria-hidden="true"
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="min-w-0 flex-1"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      className={cn(
                        "relative border transition-all duration-300 hover:shadow-md",
                        "bg-card/50 backdrop-blur-sm",
                        config.borderColor,
                        "group-hover:border-primary/30",
                      )}
                    >
                      <CardContent className="p-4 sm:p-6">
                        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                          <div className="min-w-0 flex-1">
                            <motion.h3
                              className="text-foreground group-hover:text-primary mb-1 text-lg font-semibold transition-colors duration-300 sm:text-xl"
                              layoutId={`title-${index}`}
                            >
                              {item.title}
                            </motion.h3>

                            <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
                              {item.category && (
                                <span className="font-medium">
                                  {item.category}
                                </span>
                              )}
                              {item.category && item.date && (
                                <span
                                  className="bg-muted-foreground h-1 w-1 rounded-full"
                                  aria-hidden="true"
                                />
                              )}
                              {item.date && (
                                <time dateTime={item.date}>{item.date}</time>
                              )}
                            </div>
                          </div>

                          <Badge
                            className={cn(
                              "w-fit border text-xs font-medium",
                              config.badgeBg,
                              config.badgeText,
                              "border-current/20",
                            )}
                            aria-label={`Status: ${item.status ?? "upcoming"}`}
                          >
                            {item.status
                              ? item.status.charAt(0).toUpperCase() +
                                item.status.slice(1)
                              : "Upcoming"}
                          </Badge>
                        </div>

                        <motion.p
                          className="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base"
                          initial={{ opacity: 0.8 }}
                          whileHover={{ opacity: 1 }}
                        >
                          {item.description}
                        </motion.p>

                        <div
                          className="bg-muted h-1 overflow-hidden rounded-full"
                          role="progressbar"
                          aria-valuenow={
                            item.status === "completed"
                              ? 100
                              : item.status === "current"
                                ? 65
                                : 25
                          }
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`Progress for ${item.title}`}
                        >
                          <motion.div
                            className={cn(
                              "h-full rounded-full",
                              config.progressColor,
                            )}
                            initial={{ width: 0 }}
                            animate={{
                              width:
                                item.status === "completed"
                                  ? "100%"
                                  : item.status === "current"
                                    ? "65%"
                                    : "25%",
                            }}
                            transition={{
                              duration: 1.2,
                              delay: index * 0.2 + 0.8,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="bg-primary absolute -bottom-6 left-4 h-3 w-3 -translate-x-1/2 rounded-full shadow-sm sm:left-6"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.4,
              delay: items.length * 0.1 + 0.3,
              type: "spring",
              stiffness: 400,
            },
          }}
          viewport={{ once: true }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
