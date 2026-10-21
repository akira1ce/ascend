"use client";

import { ArrowDown, ArrowRight, BookOpen, Calculator } from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const easeOut = [0.16, 1, 0.3, 1] as const;

const revealContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			delayChildren: 0.08,
			staggerChildren: 0.1,
		},
	},
};

const revealItem = {
	hidden: { opacity: 0, y: 18 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.55, ease: easeOut },
	},
};

export default function Home() {
	return (
		<MotionConfig reducedMotion="user">
			<main className="bg-background text-foreground min-h-screen">
				<motion.section
					variants={revealContainer}
					initial="hidden"
					animate="visible"
					className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center px-5 py-16 text-center sm:px-8"
				>
					<div className="flex max-w-2xl flex-col items-center">
						<motion.h1 variants={revealItem} className="text-foreground text-6xl leading-none font-semibold text-balance sm:text-8xl">
							ASCEND
						</motion.h1>

						<motion.p variants={revealItem} className="text-foreground mt-6 text-xl font-medium sm:text-2xl">
							诸君，上岸吧。
						</motion.p>

						<motion.p variants={revealItem} className="text-muted-foreground mt-5 max-w-xl text-sm leading-7 text-pretty sm:text-base">
							把需要长期积累的公考知识，整理成随时可以开始、随时能够继续的内容。
						</motion.p>

						<motion.div variants={revealItem} className="mt-9 flex h-7 items-end gap-1.5" aria-hidden="true">
							<motion.span
								initial={{ opacity: 0, scaleY: 0 }}
								animate={{ opacity: 0.25, scaleY: 1 }}
								transition={{ delay: 0.45, duration: 0.35, ease: easeOut }}
								className="bg-foreground h-1 w-2 origin-bottom rounded-sm"
							/>
							<motion.span
								initial={{ opacity: 0, scaleY: 0 }}
								animate={{ opacity: 0.4, scaleY: 1 }}
								transition={{ delay: 0.5, duration: 0.35, ease: easeOut }}
								className="bg-foreground h-2 w-2 origin-bottom rounded-sm"
							/>
							<motion.span
								initial={{ opacity: 0, scaleY: 0 }}
								animate={{ opacity: 0.55, scaleY: 1 }}
								transition={{ delay: 0.55, duration: 0.35, ease: easeOut }}
								className="bg-foreground h-3 w-2 origin-bottom rounded-sm"
							/>
							<motion.span
								initial={{ opacity: 0, scaleY: 0 }}
								animate={{ opacity: 0.7, scaleY: 1 }}
								transition={{ delay: 0.6, duration: 0.35, ease: easeOut }}
								className="bg-foreground h-4 w-2 origin-bottom rounded-sm"
							/>
							<motion.span
								initial={{ opacity: 0, scaleY: 0 }}
								animate={{ opacity: 0.85, scaleY: 1 }}
								transition={{ delay: 0.65, duration: 0.35, ease: easeOut }}
								className="bg-foreground h-5 w-2 origin-bottom rounded-sm"
							/>
							<motion.span
								initial={{ opacity: 0, scaleY: 0 }}
								animate={{ opacity: 1, scaleY: 1 }}
								transition={{ delay: 0.7, duration: 0.35, ease: easeOut }}
								className="bg-foreground h-6 w-2 origin-bottom rounded-sm"
							/>
						</motion.div>
					</div>

					<motion.div variants={revealItem} className="absolute bottom-5">
						<Button asChild variant="ghost" size="icon" className="active:scale-[0.98]">
							<a href="#tools" aria-label="查看全部内容" title="查看全部内容">
								<ArrowDown className="size-4" aria-hidden="true" />
							</a>
						</Button>
					</motion.div>
				</motion.section>

				<motion.section
					id="tools"
					variants={revealContainer}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.35 }}
					className="border-border bg-muted/45 flex min-h-screen items-center border-t"
				>
					<div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
						<motion.h2 variants={revealItem} className="text-3xl font-semibold sm:text-4xl">
							从这里开始
						</motion.h2>

						<motion.article variants={revealItem} className="mt-10">
							<Link
								href="/peanut-vocab"
								className="group border-border grid gap-8 rounded border border-y border-dashed p-2 py-6 transition-[background-color,transform] outline-none sm:py-7 md:grid-cols-[1fr_auto] md:items-center md:gap-12"
								aria-label="打开花生 800 词汇"
							>
								<div className="flex items-start gap-4">
									<span className="flex size-12 shrink-0 items-center justify-center">
										<BookOpen className="size-5" aria-hidden="true" />
									</span>
									<div>
										<div className="flex flex-wrap items-center gap-2.5">
											<h3 className="text-xl font-semibold">花生词汇</h3>
											<span className="text-muted-foreground text-xs">首个内容</span>
										</div>
										<p className="text-muted-foreground mt-2 text-sm leading-6">公考高频成语与词汇，按顺序积累，随时继续。</p>
									</div>
								</div>

								<div className="border-border flex items-center justify-between gap-6 border-t px-4 pt-5 md:min-w-44 md:border-t-0 md:border-l md:px-8 md:pt-0">
									<div>
										<p className="font-mono text-3xl font-semibold tabular-nums">807</p>
										<p className="text-muted-foreground mt-1 text-xs">条词汇内容</p>
									</div>
									<ArrowRight
										className="text-muted-foreground size-5 -rotate-45 transition-transform duration-200 group-hover:rotate-0"
										aria-hidden="true"
									/>
								</div>
							</Link>
						</motion.article>

						<motion.article variants={revealItem} className="mt-4">
							<Link
								href="/data-analysis"
								className="group border-border grid gap-8 rounded border border-y border-dashed p-2 py-6 transition-[background-color,transform] outline-none hover:bg-background/40 sm:py-7 md:grid-cols-[1fr_auto] md:items-center md:gap-12"
								aria-label="打开资料分析速查"
							>
								<div className="flex items-start gap-4">
									<span className="flex size-12 shrink-0 items-center justify-center">
										<Calculator className="size-5" aria-hidden="true" />
									</span>
									<div>
										<div className="flex flex-wrap items-center gap-2.5">
											<h3 className="text-xl font-semibold">资料分析</h3>
											<span className="text-muted-foreground text-xs">速查手册</span>
										</div>
										<p className="text-muted-foreground mt-2 text-sm leading-6">资料分析考点、公式与速记，一页刷完。</p>
									</div>
								</div>

								<div className="border-border flex items-center justify-between gap-6 border-t px-4 pt-5 md:min-w-44 md:border-t-0 md:border-l md:px-8 md:pt-0">
									<div>
										<p className="font-mono text-3xl font-semibold tabular-nums">44</p>
										<p className="text-muted-foreground mt-1 text-xs">个知识点</p>
									</div>
									<ArrowRight
										className="text-muted-foreground size-5 -rotate-45 transition-transform duration-200 group-hover:rotate-0"
										aria-hidden="true"
									/>
								</div>
							</Link>
						</motion.article>

						<motion.p variants={revealItem} className="text-muted-foreground mt-6 text-sm">
							更多内容会直接出现在这里。
						</motion.p>
					</div>
				</motion.section>
			</main>
		</MotionConfig>
	);
}
