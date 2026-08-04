import type { ReactNode } from "react";

export default function PeanutVocabLayout({ children }: { children: ReactNode }) {
	return (
		<div className="[--peanut-accent:oklch(0.48_0.17_28)] [--peanut-cover-foreground:oklch(0.97_0.008_28)] [--peanut-cover:oklch(0.34_0.115_28)] dark:[--peanut-accent:oklch(0.72_0.14_28)] dark:[--peanut-cover:oklch(0.27_0.09_28)]">
			{children}
		</div>
	);
}
