import { ArrowLeft, ArrowUp, Calculator } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChapterChips, ChapterRail } from "./components/chapter-rail";
import { KnowledgeCard } from "./components/knowledge-card";
import { chapterGroups, stats } from "./data";

export const metadata: Metadata = {
	title: "资料分析 · ASCEND",
	description: "公考行测资料分析知识点、公式与速记速查。",
};

export default function DataAnalysisPage() {
	return (
		<main id="top" className="bg-background min-h-screen">
			<header>
				<div className="mx-auto w-full max-w-6xl px-5 pt-8 pb-10 sm:px-8 sm:pt-10 sm:pb-12">
					<Link
						href="/#tools"
						className="text-muted-foreground hover:text-foreground inline-flex min-h-10 items-center gap-2 rounded-sm pr-2 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--data-accent)] focus-visible:ring-offset-2"
					>
						<ArrowLeft className="size-4" aria-hidden="true" />
						全部内容
					</Link>

					<div className="my-9 grid gap-9 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
						<div>
							<div className="text-muted-foreground flex items-center gap-2.5">
								<Calculator className="size-4" aria-hidden="true" />
								<p className="text-sm font-medium">行测速查手册</p>
							</div>
							<h1 className="text-(--data-accent) mt-4 text-5xl leading-tight font-semibold text-balance sm:text-6xl">资料分析</h1>
							<p className="text-muted-foreground mt-5 max-w-2xl text-sm leading-7 text-pretty sm:text-base">
								考点、公式与速记集中在一页，按章节从上往下刷，随时停下来查。
							</p>
						</div>

						<p className="text-muted-foreground font-mono text-sm leading-7 tabular-nums">
							共 {stats.pointCount} 个知识点 · {stats.chapterCount} 个章节
						</p>
					</div>
				</div>
			</header>

			<div className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8 sm:pb-28">
				<div className="lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-10 xl:gap-14">
					<aside className="hidden lg:block">
						<ChapterRail chapters={chapterGroups} />
					</aside>

					<div>
						<div className="mb-8 lg:hidden">
							<p className="text-muted-foreground mb-2 font-mono text-[0.625rem] tracking-widest">章节</p>
							<ChapterChips chapters={chapterGroups} />
						</div>

						{chapterGroups.map((chapter, index) => (
							<section
								key={chapter.id}
								id={chapter.id}
								className="border-border scroll-mt-24 border-b py-10 first:pt-0 last:border-b-0 sm:py-12"
							>
								<header>
									<div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
										<span className="text-muted-foreground font-mono text-xs tabular-nums">{String(index + 1).padStart(2, "0")}</span>
										<h2 className="text-2xl font-bold text-balance sm:text-3xl">{chapter.title}</h2>
										<span className="text-muted-foreground text-xs">{chapter.points.length} 个知识点</span>
									</div>
									<p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-7 text-pretty">{chapter.description}</p>
								</header>

								<div className="mt-6 grid gap-3 xl:grid-cols-2">
									{chapter.points.map((point) => (
										<KnowledgeCard key={point.id} point={point} />
									))}
								</div>
							</section>
						))}

						<footer className="flex items-center justify-between gap-4 pt-10">
							<Link href="/#tools" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
								返回全部内容
							</Link>
							<a href="#top" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors">
								<ArrowUp className="size-4" aria-hidden="true" />
								回到顶部
							</a>
						</footer>
					</div>
				</div>
			</div>
		</main>
	);
}
