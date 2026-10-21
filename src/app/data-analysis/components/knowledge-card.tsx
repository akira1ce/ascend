import type { KnowledgePoint } from "../data";
import { Formula } from "./formula";

export function KnowledgeCard({ point }: { point: KnowledgePoint }) {
	return (
		<article className="border-border bg-card rounded-lg border p-5 sm:p-6">
			<header className="flex items-baseline gap-3">
				<span className="text-muted-foreground font-mono text-xs tabular-nums">{String(point.id).padStart(2, "0")}</span>
				<h3 className="text-lg leading-7 font-semibold text-balance">{point.title}</h3>
			</header>

			<ul className="mt-3 flex flex-wrap gap-1.5">
				{point.recognition.map((tag) => (
					<li key={tag} className="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-xs">
						{tag}
					</li>
				))}
			</ul>

			{point.formulas.length > 0 && (
				<div className="mt-4 space-y-2">
					{point.formulas.map((formula) => (
						<div key={formula.label} className="bg-muted/50 rounded-md px-3 py-2">
							<p className="text-muted-foreground text-xs">{formula.label}</p>
							<div className="mt-1 text-base">
								<Formula tex={formula.tex} display />
							</div>
							{formula.note && <p className="text-muted-foreground mt-1 text-xs leading-5">{formula.note}</p>}
						</div>
					))}
				</div>
			)}

			{point.tips.length > 0 && (
				<ul className="mt-4 space-y-1.5">
					{point.tips.map((tip) => (
						<li key={tip} className="flex gap-2 text-sm leading-6">
							<span className="text-(--data-accent)" aria-hidden="true">
								·
							</span>
							<span>{tip}</span>
						</li>
					))}
				</ul>
			)}
		</article>
	);
}
