"use client";

import { useState } from "react";
import { LibraryBig, Ship } from "lucide-react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const headerTransition = {
  duration: 0.3,
  ease: [0.16, 1, 0.3, 1] as const,
};

export function SiteHeader() {
  const [compact, setCompact] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!compact && latest > 96) {
      setCompact(true);
    } else if (compact && latest < 24) {
      setCompact(false);
    }
  });

  return (
    <MotionConfig reducedMotion="user" transition={headerTransition}>
      <header className="pointer-events-none sticky top-0 z-50 h-16">
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{ opacity: compact ? 0 : 1 }}
          className="absolute inset-x-0 top-0 h-16 bg-background"
        />

        <motion.div
          layout
          initial={false}
          data-compact={compact}
          className={cn(
            "pointer-events-auto relative mx-auto flex items-center justify-between bg-background",
            compact
              ? "top-2 h-12 w-[calc(100%-2rem)] max-w-xl rounded-full border border-border px-2.5 shadow-lg sm:px-3"
              : "top-0 h-16 w-full max-w-6xl px-5 sm:px-8",
          )}
        >
          <Link className="flex min-h-10 items-center gap-3 rounded-full pr-2" href="/" aria-label="ASCEND 首页">
            <motion.span
              layout
              className={cn(
                "flex shrink-0 items-center justify-center rounded-md bg-brand text-brand-foreground shadow-xs",
                compact ? "size-8" : "size-9",
              )}
            >
              <Ship className="size-4" aria-hidden="true" />
            </motion.span>
            <span className="flex items-baseline gap-3">
              <span className="text-base font-semibold">ASCEND</span>
              <AnimatePresence initial={false}>
                {!compact && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="hidden origin-left text-xs text-muted-foreground md:inline"
                  >
                    公考积累工具
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </Link>

          <nav className="flex items-center gap-1.5" aria-label="主导航">
            <Link
              href="/#tools"
              className="inline-flex min-h-10 min-w-10 items-center justify-center gap-2 rounded-full px-2.5 text-sm text-muted-foreground transition-colors [@media(hover:hover)]:hover:bg-accent [@media(hover:hover)]:hover:text-foreground sm:px-3"
              aria-label="查看全部内容"
              title="查看全部内容"
            >
              <LibraryBig className="size-4 shrink-0" aria-hidden="true" />
            </Link>
            <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
            <ThemeToggle />
          </nav>
        </motion.div>
      </header>
    </MotionConfig>
  );
}
