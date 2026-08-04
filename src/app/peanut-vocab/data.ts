import rawEntries from "../../../public/resources/peanut-vocab-800.json";

type RawVocabEntry = {
	id: number;
	group: string;
	idiom?: string;
	word?: string;
	distinction: string;
	meaning: string;
	type: "idiom" | "word";
};

export type VocabEntry = {
	id: number;
	group: string;
	term: string;
	distinction: string;
	meaning: string;
	type: "idiom" | "word";
};

export type VocabGroup = {
	name: string;
	entries: VocabEntry[];
};

export const vocabEntries: VocabEntry[] = (rawEntries as RawVocabEntry[]).map((entry) => {
	const term = entry.idiom ?? entry.word;

	if (!term) {
		throw new Error(`词条 ${entry.id} 缺少 idiom 或 word 字段`);
	}

	return {
		id: entry.id,
		group: entry.group === "-" ? "其他词汇" : entry.group,
		term,
		distinction: entry.distinction,
		meaning: entry.meaning,
		type: entry.type,
	};
});

export const contiguousGroups = vocabEntries.reduce<VocabGroup[]>((groups, entry) => {
	const currentGroup = groups.at(-1);

	if (currentGroup?.name === entry.group) {
		currentGroup.entries.push(entry);
	} else {
		groups.push({ name: entry.group, entries: [entry] });
	}

	return groups;
}, []);

export const uniqueGroupCount = new Set(vocabEntries.map((entry) => entry.group)).size;

const entryIndexById = new Map(vocabEntries.map((entry, index) => [entry.id, index]));

export function getVocabEntry(id: number) {
	const index = entryIndexById.get(id);
	return index === undefined ? undefined : vocabEntries[index];
}

export function getAdjacentEntries(id: number) {
	const index = entryIndexById.get(id);

	if (index === undefined) {
		return { previous: undefined, next: undefined };
	}

	return {
		previous: vocabEntries[index - 1],
		next: vocabEntries[index + 1],
	};
}
