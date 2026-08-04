import { ChevronDown } from "lucide-react";

export function Definition({ meaning }: { meaning: string }) {
	return (
		<details className="group border-border border-y py-6 sm:py-8">
			<summary className="cursor-pointer list-none outline-none [&::-webkit-details-marker]:hidden focus-visible:[&>span]:underline focus-visible:[&>span]:decoration-[var(--peanut-accent)] focus-visible:[&>span]:underline-offset-4">
				<p className="text-foreground/80 line-clamp-2 text-base leading-8 group-open:hidden sm:text-lg sm:leading-9">{meaning}</p>
				<span className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-medium text-[var(--peanut-accent)]">
					<ChevronDown className="size-4 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
					<span className="group-open:hidden">展开完整解析</span>
					<span className="hidden group-open:inline">收起解析</span>
				</span>
			</summary>

			<p className="text-foreground/85 mt-1 max-w-3xl text-base leading-8 text-pretty sm:text-lg sm:leading-9">{meaning}</p>
		</details>
	);
}
