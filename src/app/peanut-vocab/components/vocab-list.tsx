import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { VocabGroup } from "../data";

export function VocabList({ groups }: { groups: VocabGroup[] }) {
	return (
		<div className="mx-auto w-full max-w-7xl space-y-4 px-5 py-10 pb-24 sm:px-8 sm:py-14 sm:pb-28">
			{groups.map((group) => (
				<section
					key={`${group.name}-${group.entries[0].id}`}
					className="grid gap-4 py-5 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12 lg:py-7"
				>
					<header className="flex items-center justify-between gap-4 self-start lg:block lg:pt-3">
						<h2 className="max-w-56 text-lg leading-7 font-semibold text-balance">{group.name}</h2>
						<p className="bg-muted text-muted-foreground mt-2 shrink-0 rounded-full px-2.5 py-1 font-mono text-[0.6875rem] tabular-nums lg:inline-flex">
							{group.entries.length} 条
						</p>
					</header>

					<div className="grid gap-1 sm:grid-cols-2 sm:gap-x-4 xl:grid-cols-3">
						{group.entries.map((entry) => (
							<Link
								key={entry.id}
								href={`/peanut-vocab/${entry.id}`}
								className="group hover:bg-muted/70 focus-visible:bg-muted grid min-h-[4.5rem] grid-cols-[2.75rem_minmax(0,1fr)_1.25rem] items-center rounded-md px-3 py-2.5 transition-[background-color,transform] duration-200 outline-none hover:-translate-y-px focus-visible:ring-2 focus-visible:ring-[var(--peanut-accent)] focus-visible:ring-inset active:translate-y-0"
							>
								<span className="text-muted-foreground font-mono text-xs tabular-nums">{String(entry.id).padStart(3, "0")}</span>
								<span className="min-w-0 pr-3">
									<span className="text-lg leading-7 font-semibold">{entry.term}</span>
									<span className="text-muted-foreground mt-0.5 block text-sm leading-5">{entry.distinction}</span>
								</span>
								<ArrowRight
									className="text-muted-foreground size-4 transition-[color,transform] duration-200 group-hover:translate-x-1 group-hover:text-[var(--peanut-accent)]"
									aria-hidden="true"
								/>
							</Link>
						))}
					</div>
				</section>
			))}
		</div>
	);
}
