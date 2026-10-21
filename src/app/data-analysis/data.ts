import rawData from "../../../public/resources/data-analysis.json";

export type Formula = {
	label: string;
	tex: string;
	note?: string;
};

export type KnowledgePoint = {
	id: number;
	chapterId: string;
	title: string;
	recognition: string[];
	formulas: Formula[];
	tips: string[];
};

export type Chapter = {
	id: string;
	title: string;
	description: string;
};

export type ChapterGroup = Chapter & {
	points: KnowledgePoint[];
};

const data = rawData as { chapters: Chapter[]; points: KnowledgePoint[] };

export const chapters: Chapter[] = data.chapters;
export const knowledgePoints: KnowledgePoint[] = data.points;

const chapterIds = new Set(chapters.map((chapter) => chapter.id));

for (const point of knowledgePoints) {
	if (!chapterIds.has(point.chapterId)) {
		throw new Error(`知识点 ${point.id} 引用了不存在的章节 ${point.chapterId}`);
	}
}

export const chapterGroups: ChapterGroup[] = chapters.map((chapter) => ({
	...chapter,
	points: knowledgePoints.filter((point) => point.chapterId === chapter.id),
}));

export const stats = {
	pointCount: knowledgePoints.length,
	chapterCount: chapters.length,
};
