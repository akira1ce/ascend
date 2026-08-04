import { ArrowLeft, BookOpenText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { VocabList } from "./components/vocab-list";
import { contiguousGroups, uniqueGroupCount, vocabEntries } from "./data";

export const metadata: Metadata = {
	title: "花生 800 · ASCEND",
	description: "按主题浏览花生 800 公考高频成语与词汇。",
};

export default function PeanutVocabPage() {
	return (
		<main id="main-content" className="bg-background min-h-screen">
			<header className="-translate-y-10 bg-(--peanut-cover) pt-10 text-(--peanut-cover-foreground)">
				<div className="mx-auto w-full max-w-7xl px-5 pt-8 pb-12 sm:px-8 sm:pt-10 sm:pb-16">
					<Link
						href="/#tools"
						className="inline-flex min-h-10 items-center gap-2 rounded-sm pr-2 text-sm text-white/70 transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--peanut-cover)]"
					>
						<ArrowLeft className="size-4" aria-hidden="true" />
						全部内容
					</Link>

					<div className="mt-9 grid gap-9 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
						<div>
							<div className="flex items-center gap-2.5 text-white/75">
								<BookOpenText className="size-4" aria-hidden="true" />
								<p className="text-sm font-medium">公考词汇目录</p>
							</div>
							<h1 className="mt-4 text-5xl leading-tight font-semibold text-balance sm:text-6xl">花生 800</h1>
							<p className="mt-5 max-w-2xl text-sm leading-7 text-pretty text-white/70 sm:text-base">
								公考高频成语与实词辨析，按常见语境归档。
							</p>
						</div>

						<p className="font-mono text-sm leading-7 text-white/70 tabular-nums">
							共 {vocabEntries.length} 条词汇，归入 {uniqueGroupCount} 个主题
						</p>
					</div>
				</div>
			</header>

			<VocabList groups={contiguousGroups} />
		</main>
	);
}
