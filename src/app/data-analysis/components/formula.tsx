import katex from "katex";

type FormulaProps = {
	tex: string;
	display?: boolean;
};

export function Formula({ tex, display = false }: FormulaProps) {
	const html = katex.renderToString(tex, {
		displayMode: display,
		throwOnError: false,
		strict: false,
	});

	return (
		<span
			className={display ? "block overflow-x-auto [&_.katex-display]:my-0" : "inline-block"}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
