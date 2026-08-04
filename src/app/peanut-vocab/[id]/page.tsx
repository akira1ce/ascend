import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Definition } from "../components/definition";
import { DetailNavigation } from "../components/detail-navigation";
import { getAdjacentEntries, getVocabEntry, vocabEntries } from "../data";

type PageProps = {
	params: Promise<{ id: string }>;
};

function parseEntryId(value: string) {
	return /^\d+$/.test(value) ? Number(value) : Number.NaN;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { id } = await params;
	const entry = getVocabEntry(parseEntryId(id));

	if (!entry) {
		return { title: "未找到词条 · 花生 800" };
	}

	return {
		title: `${entry.term} · 花生 800`,
		description: `${entry.term}：${entry.distinction}。${entry.meaning}`,
	};
}

export default async function VocabDetailPage({ params }: PageProps) {
	const { id } = await params;
	const entry = getVocabEntry(parseEntryId(id));

	if (!entry) {
		notFound();
	}

	const { previous, next } = getAdjacentEntries(entry.id);

	return (
		<main id="main-content" className="bg-background min-h-screen">
			<div className="mx-auto w-full max-w-5xl px-5 pt-8 pb-20 sm:px-8 sm:pt-11 sm:pb-24">
				<header className="border-border flex items-center justify-between gap-5 border-b pb-6">
					<Link
						href="/peanut-vocab"
						className="text-muted-foreground hover:text-foreground inline-flex min-h-10 items-center gap-2 rounded-sm pr-2 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--peanut-accent)] focus-visible:ring-offset-2"
					>
						<ArrowLeft className="size-4" aria-hidden="true" />
						返回词汇目录
					</Link>
					<p className="text-muted-foreground font-mono text-xs tabular-nums sm:text-sm">
						{String(entry.id).padStart(3, "0")} / {vocabEntries.length}
					</p>
				</header>

				<article className="py-10 sm:py-16">
					<div className="grid gap-8 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-12">
						<div className="text-muted-foreground text-sm">
							<p className="font-medium text-[var(--peanut-accent)]">{entry.type === "idiom" ? "成语" : "词语"}</p>
							<p className="mt-3 max-w-48 leading-6">{entry.group}</p>
						</div>

						<div>
							<h1 className="text-5xl leading-tight font-semibold sm:text-6xl">{entry.term}</h1>
							<p className="mt-6 text-xl leading-8 font-medium sm:text-2xl">{entry.distinction}</p>

							<section className="mt-12 sm:mt-16" aria-labelledby="definition-heading">
								<div className="mb-4 flex items-center gap-3">
									<span className="h-px w-6 bg-[var(--peanut-accent)]" aria-hidden="true" />
									<h2 id="definition-heading" className="text-sm font-semibold">
										词义解析
									</h2>
								</div>
								<Definition meaning={entry.meaning} />
							</section>
						</div>
					</div>
				</article>

				<DetailNavigation previous={previous} next={next} />
			</div>
		</main>
	);
}
