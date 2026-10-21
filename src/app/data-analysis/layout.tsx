import "katex/dist/katex.min.css";
import type { ReactNode } from "react";

export default function DataAnalysisLayout({ children }: { children: ReactNode }) {
	return <div className="[--data-accent:oklch(0.45_0.13_245)] dark:[--data-accent:oklch(0.72_0.12_245)]">{children}</div>;
}
