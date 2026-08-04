"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useId, useState } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Definition({ distinction, meaning }: { distinction: string; meaning: string }) {
	const [expanded, setExpanded] = useState(false);
	const panelId = useId();

	return (
		<MotionConfig reducedMotion="user">
			<div className="bg-muted/65 focus-within:bg-muted rounded-md transition-colors duration-200">
				<button
					type="button"
					aria-expanded={expanded}
					aria-controls={panelId}
					onClick={() => setExpanded((current) => !current)}
					className="group hover:bg-foreground/2.5 grid min-h-28 w-full cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-center gap-5 rounded-md px-5 py-5 text-left transition-colors outline-none sm:px-7 sm:py-6"
				>
					<span>
						<span className="text-muted-foreground block text-xs">简略解析</span>
						<span className="mt-2 block text-xl leading-8 font-semibold sm:text-2xl">{distinction}</span>
					</span>
					<span className="text-muted-foreground flex items-center gap-2 text-sm transition-colors group-hover:text-(--peanut-accent)">
						<span className="hidden sm:inline">{expanded ? "收起" : "详细解析"}</span>
						<motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2, ease: easeOut }}>
							<ChevronDown className="size-4" aria-hidden="true" />
						</motion.span>
					</span>
				</button>

				<AnimatePresence initial={false}>
					{expanded && (
						<motion.div
							id={panelId}
							role="region"
							aria-label="详细解析"
							initial={{ height: 0, opacity: 0 }}
							animate={{
								height: "auto",
								opacity: 1,
								transition: {
									height: { duration: 0.24, ease: easeOut },
									opacity: { duration: 0.2, ease: easeOut },
								},
							}}
							exit={{
								height: 0,
								opacity: 0,
								transition: {
									height: { duration: 0.18, ease: easeOut },
									opacity: { duration: 0.12, ease: easeOut },
								},
							}}
							className="overflow-hidden"
						>
							<div className="px-5 pt-2 pb-7 sm:px-7 sm:pb-8">
								<p className="text-muted-foreground text-xs">详细解析</p>
								<p className="text-foreground/85 mt-3 max-w-3xl text-base leading-8 text-pretty sm:text-lg sm:leading-9">{meaning}</p>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</MotionConfig>
	);
}
