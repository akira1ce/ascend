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
			<header>
				<div className="mx-auto w-full max-w-7xl px-5 pt-8 pb-12 sm:px-8 sm:pt-10 sm:pb-16">
					<Link
						href="/#tools"
						className="text-muted-foreground hover:text-foreground inline-flex min-h-10 items-center gap-2 rounded-sm pr-2 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--peanut-accent)] focus-visible:ring-offset-2"
					>
						<ArrowLeft className="size-4" aria-hidden="true" />
						全部内容
					</Link>

					<div className="mt-9 grid gap-9 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
						<div>
							<div className="text-muted-foreground flex items-center gap-2.5">
								<BookOpenText className="size-4" aria-hidden="true" />
								<p className="text-sm font-medium">公考词汇目录</p>
							</div>
							<h1 className="mt-4 text-5xl leading-tight font-semibold text-balance text-(--peanut-accent) sm:text-6xl">花生 800</h1>
							<p className="text-muted-foreground mt-5 max-w-2xl text-sm leading-7 text-pretty sm:text-base">
								公考高频成语与实词辨析，按常见语境归档。
							</p>
						</div>

						<p className="text-muted-foreground font-mono text-sm leading-7 tabular-nums">
							共 {vocabEntries.length} 条词汇，归入 {uniqueGroupCount} 个主题
						</p>
					</div>
				</div>
			</header>

			<VocabList groups={contiguousGroups} />
		</main>
	);
}
