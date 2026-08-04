"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type AdjacentEntry = {
	id: number;
	term: string;
};

function isTypingTarget(target: EventTarget | null) {
	return (
		target instanceof HTMLElement &&
		(target.isContentEditable || target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT")
	);
}

export function DetailNavigation({ previous, next }: { previous?: AdjacentEntry; next?: AdjacentEntry }) {
	const router = useRouter();

	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (isTypingTarget(event.target) || event.altKey || event.ctrlKey || event.metaKey) {
				return;
			}

			if (event.key === "ArrowLeft" && previous) {
				event.preventDefault();
				router.push(`/peanut-vocab/${previous.id}`);
			}

			if (event.key === "ArrowRight" && next) {
				event.preventDefault();
				router.push(`/peanut-vocab/${next.id}`);
			}
		}

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [next, previous, router]);

	return (
		<nav className="border-border grid border-y sm:grid-cols-2" aria-label="相邻词条">
			{previous ? (
				<Link
					href={`/peanut-vocab/${previous.id}`}
					className="group border-border hover:bg-muted/55 focus-visible:bg-muted flex min-h-24 items-center gap-4 border-b py-5 pr-5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--peanut-accent)] focus-visible:ring-inset sm:border-r sm:border-b-0"
				>
					<ArrowLeft className="text-muted-foreground size-4 shrink-0 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
					<span>
						<span className="text-muted-foreground block text-xs">上一条</span>
						<span className="mt-1 block text-base font-semibold">{previous.term}</span>
					</span>
				</Link>
			) : (
				<div className="hidden sm:block" />
			)}

			{next ? (
				<Link
					href={`/peanut-vocab/${next.id}`}
					className="group hover:bg-muted/55 focus-visible:bg-muted flex min-h-24 items-center justify-end gap-4 py-5 pl-5 text-right transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--peanut-accent)] focus-visible:ring-inset"
				>
					<span>
						<span className="text-muted-foreground block text-xs">下一条</span>
						<span className="mt-1 block text-base font-semibold">{next.term}</span>
					</span>
					<ArrowRight className="text-muted-foreground size-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
				</Link>
			) : null}
		</nav>
	);
}
