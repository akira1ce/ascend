import { ArrowDown, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center px-5 py-16 text-center sm:px-8">
        <div className="flex flex-col items-center">
          <h1 className="text-balance text-[40px] font-semibold leading-tight text-foreground sm:text-6xl">
            诸君，上岸吧。
          </h1>

          <div className="mt-8 flex h-7 items-end gap-1.5" aria-hidden="true">
            <span className="h-1 w-2 rounded-sm bg-brand/25" />
            <span className="h-2 w-2 rounded-sm bg-brand/40" />
            <span className="h-3 w-2 rounded-sm bg-brand/55" />
            <span className="h-4 w-2 rounded-sm bg-brand/70" />
            <span className="h-5 w-2 rounded-sm bg-brand/85" />
            <span className="h-6 w-2 rounded-sm bg-brand" />
          </div>
        </div>

        <Button
          asChild
          variant="outline"
          size="icon"
          className="absolute bottom-5 active:scale-[0.98]"
        >
          <a href="#tools" aria-label="查看全部内容" title="查看全部内容">
            <ArrowDown className="size-4" aria-hidden="true" />
          </a>
        </Button>
      </section>

      <section id="tools" className="flex min-h-screen items-center border-t border-border bg-muted/35">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="text-3xl font-semibold sm:text-4xl">从这里开始</h2>

          <article className="mt-10 grid gap-8 rounded-md border border-border bg-card p-5 shadow-sm sm:p-7 md:grid-cols-[1fr_auto] md:items-center md:gap-12">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-brand text-brand-foreground">
                <BookOpen className="size-5" aria-hidden="true" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-xl font-semibold">花生词汇</h3>
                  <span className="rounded-full bg-brand-soft px-2.5 py-1 text-xs font-medium text-brand-strong dark:bg-brand-soft/50 dark:text-brand">
                    首个内容
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  公考高频成语与词汇，按顺序积累，随时继续。
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-5 md:min-w-36 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <p className="font-mono text-3xl font-semibold tabular-nums">807</p>
              <p className="mt-1 text-xs text-muted-foreground">条词汇内容</p>
            </div>
          </article>

          <p className="mt-6 text-sm text-muted-foreground">更多内容会直接出现在这里。</p>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 text-xs text-muted-foreground sm:px-8">
          <span>ASCEND</span>
          <span>公考积累工具</span>
        </div>
      </footer>
    </main>
  );
}
