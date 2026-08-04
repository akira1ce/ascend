import type { ReactNode } from "react";

export default function PeanutVocabLayout({ children }: { children: ReactNode }) {
	return <div className="[--peanut-accent:oklch(0.48_0.17_28)] dark:[--peanut-accent:oklch(0.72_0.14_28)]">{children}</div>;
}
