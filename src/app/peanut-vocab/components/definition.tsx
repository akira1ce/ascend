import { ChevronDown } from "lucide-react";

export function Definition({ distinction, meaning }: { distinction: string; meaning: string }) {
	return (
		<details className="group bg-muted/65 open:bg-muted focus-within:bg-muted rounded-md transition-colors duration-200">
			<summary className="hover:bg-foreground/[0.025] grid min-h-28 cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-center gap-5 rounded-md px-5 py-5 transition-colors outline-none sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
				<span>
					<span className="text-muted-foreground block text-xs">简略解析</span>
					<span className="mt-2 block text-xl leading-8 font-semibold sm:text-2xl">{distinction}</span>
				</span>
				<span className="text-muted-foreground flex items-center gap-2 text-sm transition-colors group-hover:text-[var(--peanut-accent)]">
					<span className="hidden group-open:hidden sm:inline">详细解析</span>
					<span className="hidden group-open:sm:inline">收起</span>
					<ChevronDown className="size-4 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
				</span>
			</summary>

			<div className="px-5 pt-2 pb-7 sm:px-7 sm:pb-8">
				<p className="text-muted-foreground text-xs">详细解析</p>
				<p className="text-foreground/85 mt-3 max-w-3xl text-base leading-8 text-pretty sm:text-lg sm:leading-9">{meaning}</p>
			</div>
		</details>
	);
}
