import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PeanutVocabNotFound() {
	return (
		<main id="main-content" className="bg-background flex min-h-[70svh] items-center">
			<div className="mx-auto w-full max-w-xl px-5 py-16 sm:px-8">
				<p className="font-mono text-sm text-[var(--peanut-accent)]">404</p>
				<h1 className="mt-4 text-3xl font-semibold">没有找到这个词条</h1>
				<p className="text-muted-foreground mt-4 leading-7">它可能已经调整了编号，返回目录可以继续浏览全部内容。</p>
				<Link
					href="/peanut-vocab"
					className="mt-8 inline-flex min-h-10 items-center gap-2 rounded-sm pr-2 text-sm font-medium transition-colors outline-none hover:text-[var(--peanut-accent)] focus-visible:ring-2 focus-visible:ring-[var(--peanut-accent)] focus-visible:ring-offset-2"
				>
					<ArrowLeft className="size-4" aria-hidden="true" />
					返回词汇目录
				</Link>
			</div>
		</main>
	);
}
