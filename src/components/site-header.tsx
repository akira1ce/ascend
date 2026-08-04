import { ArrowUpRight } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="border-b border-border/70">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a className="flex items-center gap-2.5" href="/" aria-label="ASCEND 首页">
          <span className="flex size-8 items-center justify-center rounded-md bg-brand-soft text-brand-strong">
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
          <span className="text-[15px] font-semibold">ASCEND</span>
        </a>

        <nav className="flex items-center gap-2" aria-label="主导航">
          <a
            href="/#tools"
            className="hidden rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors [@media(hover:hover)]:hover:bg-accent [@media(hover:hover)]:hover:text-foreground sm:inline-flex"
          >
            全部内容
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
