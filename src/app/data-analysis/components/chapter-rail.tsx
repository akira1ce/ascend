"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Chapter } from "../data";

export function ChapterRail({ chapters }: { chapters: Chapter[] }) {
	const [activeId, setActiveId] = useState<string | undefined>(chapters[0]?.id);

	useEffect(() => {
		const sections = chapters
			.map((chapter) => document.getElementById(chapter.id))
			.filter((section): section is HTMLElement => section !== null);

		if (sections.length === 0) {
			return;
		}

		let frame = 0;

		const update = () => {
			frame = 0;

			if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
				setActiveId(sections.at(-1)?.id);
				return;
			}

			let current = sections[0].id;

			for (const section of sections) {
				if (section.getBoundingClientRect().top <= 120) {
					current = section.id;
				} else {
					break;
				}
			}

			setActiveId(current);
		};

		const onScroll = () => {
			if (frame) {
				return;
			}

			frame = requestAnimationFrame(update);
		};

		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);

		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);

			if (frame) {
				cancelAnimationFrame(frame);
			}
		};
	}, [chapters]);

	return (
		<nav aria-label="章节导航" className="hidden lg:sticky lg:top-24 lg:block">
			<p className="text-muted-foreground px-3 pb-2 font-mono text-[0.625rem] tracking-widest">章节</p>
			<ul className="space-y-0.5">
				{chapters.map((chapter, index) => {
					const active = chapter.id === activeId;

					return (
						<li key={chapter.id}>
							<a
								href={`#${chapter.id}`}
								aria-current={active ? "true" : undefined}
								className={cn(
									"flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--data-accent)] focus-visible:ring-offset-2",
									active ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
								)}
							>
								<span className={cn("font-mono text-[0.625rem] tabular-nums", active && "text-(--data-accent)")}>
									{String(index + 1).padStart(2, "0")}
								</span>
								<span className="min-w-0 truncate">{chapter.title}</span>
								<span
									className={cn(
										"ml-auto size-1.5 rounded-full transition-opacity",
										active ? "bg-(--data-accent) opacity-100" : "opacity-0"
									)}
									aria-hidden="true"
								/>
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}

export function ChapterChips({ chapters }: { chapters: Chapter[] }) {
	return (
		<nav aria-label="章节导航">
			<ul className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
				{chapters.map((chapter, index) => (
					<li key={chapter.id} className="shrink-0">
						<a
							href={`#${chapter.id}`}
							className="border-border hover:bg-muted focus-visible:bg-muted inline-flex min-h-8 items-center gap-2 rounded-full border px-3 text-sm transition-colors outline-none"
						>
							<span className="text-muted-foreground font-mono text-[0.625rem] tabular-nums">{String(index + 1).padStart(2, "0")}</span>
							{chapter.title}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
