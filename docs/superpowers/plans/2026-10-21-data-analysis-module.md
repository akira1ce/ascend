# 资料分析速查模块 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 ASCEND 中新增一页式「资料分析」速查手册，收录 44 个知识点、9 个章节。

**Architecture:** 内容存为 `public/resources/data-analysis.json`，由 `src/app/data-analysis/data.ts` 读取并按章节分组；页面是纯服务端组件，公式用 KaTeX 在服务端渲染，章节导航用锚点跳转，不引入客户端状态。

**Tech Stack:** Next.js 16 App Router、React 19、Tailwind CSS v4、KaTeX。

**Spec:** `docs/superpowers/specs/2026-10-21-data-analysis-module-design.md`

> 执行中调整（2026-10-21）：章节导航由整行吸顶条改为左侧目录栏（桌面）+ 横向 chip（移动），以 spec 为准。

## Global Constraints

- 不区分老师，数据与页面中不出现老师姓名。
- 不收录例题、详细解题步骤、学习进度。
- 公式使用 KaTeX 语法；中文说明放在 `label` / `note` / `tips`，不放进 TeX。
- 模块色：浅色 `oklch(0.45 0.13 245)`，深色 `oklch(0.72 0.12 245)`。
- 桌面两列、移动端单列；长公式容器 `overflow-x-auto`。
- 用户未要求提交，本计划不执行 `git commit`。
- 写代码前已阅读 `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md` 与 `11-css.md`。

---

### Task 1: 内容数据

**Files:**
- Create: `public/resources/data-analysis.json`
- Modify: `package.json`、`package-lock.json`（安装 `katex`）

**Interfaces:**
- Produces: JSON 结构 `{ chapters: Chapter[], points: KnowledgePoint[] }`，字段 `id, chapterId, title, recognition[], formulas[{label, tex, note?}], tips[]`。

- [ ] **Step 1: 安装 KaTeX**

Run: `npm install katex`
Expected: `package.json` 出现 `"katex": "^0.16.x"`。

- [ ] **Step 2: 写入 44 个知识点**

按下面的内容表逐条写入 `public/resources/data-analysis.json`。`chapters` 顺序与表一致，`points` 按 `id` 1–44 排列。

章节：

| id | title | description |
|---|---|---|
| `basics` | 基础概念 | 时间口径、单位与材料阅读，是后面所有计算的前提。 |
| `growth` | 增长 | 增长率和增长量是资料分析的主干，先判断问的是率还是量。 |
| `base` | 基期与现期 | 现期与基期的互推，核心是直除和化除为乘。 |
| `proportion` | 比重 | 比重既考方向也考数值，注意百分点和增速差。 |
| `average` | 平均数 | 平均数、基期平均数和平均数增长率，三者容易混淆。 |
| `multiple` | 倍数与番数 | 倍数、多几倍与翻番，注意差 1 和 2 的幂次。 |
| `comprehensive` | 综合分析 | 综合分析题不追求全算，先易后难，找到答案就停。 |
| `speed` | 速算技巧 | 速算方法决定做题速度，按选项差距选择精度。 |

知识点（`recognition` 用 `/` 分隔多个标签；`formulas` 每项写成 `label | tex | note`）：

**basics（1–8）**
1. 同比与环比 | 同比 / 环比 / 与上年同期比 / 与上月比 | 同比增长率 `r_{\text{同比}} = \frac{A - A_{\text{上年同期}}}{A_{\text{上年同期}}}`；环比增长率 `r_{\text{环比}} = \frac{A - A_{\text{上期}}}{A_{\text{上期}}}` | 同比看年，环比看月；先对齐材料的时间口径。
2. 百分数与百分点 | 提高了…% / 提高了…个百分点 | 百分点 `\Delta = p_1 - p_2` | 增长率本身用百分数，增长率的变化、比重变化用百分点。
3. 顺差与逆差 | 进出口 / 贸易差额 / 顺差 / 逆差 | 顺差 `\text{顺差} = \text{出口} - \text{进口}`；逆差 `\text{逆差} = \text{进口} - \text{出口}` | 进出口总额 = 出口 + 进口；顺差为正，逆差为负。
4. 累计与当期 | 1—N 月累计 / 当月 / 累计增速 | 当月值 `\text{当月} = \text{累计}_N - \text{累计}_{N-1}` | 累计不是当月；先确认材料给的是累计值还是单月值。
5. 现期与基期 | 今年 / 去年 / 本期 / 上期 / 基期 | 现期 `A = B(1 + r)`；基期 `B = \frac{A}{1 + r}` | 问题问的那一年是现期，被比较的那一年是基期。
6. 增长量与增长率 | 增长…（带单位）/ 增长…% | 增长量 `X = A - B`；增长率 `r = \frac{X}{B} = \frac{A}{B} - 1` | 带单位问的是增长量，带 % 问的是增长率；增长最多问的是量。
7. 翻番与倍数 | 翻番 / 是…倍 / 多…倍 | 翻 n 番 `A = B \times 2^n`；是几倍 `\frac{A}{B}`；多几倍 `\frac{A}{B} - 1` | 翻番按 2 的幂次，不是乘以 n。
8. 材料阅读与单位 | 表格 / 图形 / 文字材料 / 万 / 亿 / ‰ | 单位换算 `1\text{亿} = 10^4\text{万}` | 先看表头和单位；人口自然增长率常用 ‰。

**growth（9–18）**
9. 增长率计算 | 增长 / 下降 + % / 两个年份比较 | 增长率 `r = \frac{A - B}{B}` | A/B 型先直除看首位，不必精确算。
10. 增长率比较 | 增速最快 / 最慢 / 增幅最大 | 比较 `\frac{A_1}{B_1}\ \text{vs}\ \frac{A_2}{B_2}` | 现期/基期越大增速越大；用分数比较。
11. 增长率判断 | 增速超过 10% 的年份有几个 | 判断 `A > B(1 + 10\%)` | 用基期 × (1+阈值) 与现期比较，不必算出增长率。
12. 隔年增长率 | 隔一年 / 隔年 / 两年合计增速 | 隔年增长率 `r = r_1 + r_2 + r_1 r_2` | 先加后乘；r₁、r₂ 是相邻两年的增速。
13. 隔年基期 | 已知今年求前年 / 隔年基期 | 隔年基期 `B = \frac{A}{(1 + r_1)(1 + r_2)}` | 也可先求去年，再求前年。
14. 年均增长率 | 年均增长 / 平均每年增长 | 年均增长率 `(1 + r)^n = \frac{\text{末期}}{\text{初期}}` | n 是年份差：2018→2023 是 5 年；比较时可直接比末期/初期。
15. 合成增长率 | 两部分合成整体 / 整体由两部分构成 | 区间 `r \in [\min(r_1, r_2), \max(r_1, r_2)]` | 整体增速介于两部分之间，偏向基期量较大的一方（盐水思想）。
16. 增长量计算 | 增长 / 增加 + 具体单位 / 净增 | 增长量 `X = A - B = Br = \frac{Ar}{1+r}` | 已知现期和增速用 415 份数；已知基期直接乘。
17. 415 份数法 | 已知现期 + 增长率，求增长量 | 份数关系 `\text{基期}:\text{增长量}:\text{现期} = 100:r:(100+r)` | 先把比例化到最简：r=25% 时 5:1。
18. 增长量比较 | 增长最多 / 最少 / 增量最大 | 增长量 `X = \frac{Ar}{1+r}` | 现期大且增速大，增长量必大；一大一小时用分数比较或估算。

**base（19–22）**
19. 基期量计算 | 求上年 / 基期 / 上年同期 | 基期量 `B = \frac{A}{1+r}` | 直除；r 为负且 |r|<5% 时考虑化除为乘。
20. 基期量比较 | 基期最大 / 最小 | 比较 `\frac{A_1}{1+r_1}\ \text{vs}\ \frac{A_2}{1+r_2}` | 增速接近时直接比现期；否则用分数比较。
21. 现期量计算 | 求今年 / 下一年 / 按增速推算 | 现期量 `A = B(1+r)` | 增速为负时别忘减；跨两年要连乘。
22. 化除为乘 | 求基期 / 增长率很小（|r|<5%） | 正增长 `\frac{A}{1+r} \approx A(1-r)`；负增长 `\frac{A}{1-r} \approx A(1+r)` | 只在 |r| 很小时使用，符号与分母相反。

**proportion（23–26）**
23. 现期比重 | A 占 B 的比重 / 占比 | 比重 `\text{比重} = \frac{\text{部分}}{\text{整体}}` | 部分和整体的口径、时间必须一致。
24. 基期比重 | 上年比重 / 基期占比 | 基期比重 `\frac{A}{B} \times \frac{1+b}{1+a}` | a=部分增速，b=整体增速；分子是整体增速，分母是部分增速，别记反。
25. 两期比重变化方向 | 比重比上年上升 / 下降 | 方向 `a > b \Rightarrow \text{上升};\quad a < b \Rightarrow \text{下降}` | 只比部分与整体的增速，不用计算。
26. 两期比重差 | 上升 / 下降几个百分点 | 比重差 `\frac{A}{B} \times \frac{a-b}{1+a}` | 单位是百分点；答案远小于 |a-b|，选项里可直接选较小值。

**average（27–30）**
27. 现期平均数 | 平均 / 每 / 人均 | 平均数 `\text{平均数} = \frac{\text{总量}}{\text{份数}}` | 先确定总量和份数分别是谁。
28. 基期平均数 | 上年平均 / 基期平均数 | 基期平均数 `\frac{A}{B} \times \frac{1+b}{1+a}` | a=总量增速，b=份数增速；与基期比重同构。
29. 平均数增长率 | 平均数 + 增长 / 减少 + % / 人均…增长 | 平均数增长率 `r = \frac{a-b}{1+b}` | 选项是 % 不是百分点；b>0 时答案略小于 |a-b|。
30. 平均数比较 | 平均最高 / 最低 | 比较 `\frac{A_1}{B_1}\ \text{vs}\ \frac{A_2}{B_2}` | 分子大、分母小者更大；用分数比较。

**multiple（31–33）**
31. 是几倍与多几倍 | 是…倍 / 多…倍 / 增长了…倍 | 是几倍 `\frac{A}{B}`；多几倍 `\frac{A}{B} - 1` | 多几倍 = 是几倍 − 1；增长 n 倍 = 是 (n+1) 倍。
32. 基期倍数 | 上年 A 是 B 的几倍 | 基期倍数 `\frac{A}{B} \times \frac{1+b}{1+a}` | 与基期比重、基期平均数同构。
33. 翻番 | 翻了几番 | 翻番 `\text{翻 } n \text{ 番} = \times 2^n` | 翻 1 番 = 2 倍，翻 2 番 = 4 倍，翻 3 番 = 8 倍。

**comprehensive（34–35）**
34. 综合分析题策略 | 以下说法正确 / 错误的是 / 能够推出的是 | （无公式，`formulas: []`） | 先易后难；优先验证计算量小的选项；找到一个就停。
35. 选项与陷阱 | 超过 / 不足 / 约 / 接近 / 同比 / 环比 | 词义 `\text{超过} >;\ \text{不低于} \ge;\ \text{不足} <` | 注意时间范围、单位、累计口径；接近是略小于。

**speed（36–44）**
36. 截位直除 | A/B 型 / 选项差距明显 | 截位 `\frac{a}{b} \approx \frac{a'}{b'}` | 选项首位不同截 2 位；首位相同截 3 位；分母四舍五入。
37. 分数比较 | 比较两个分数大小 | 交叉相乘 `\frac{a}{b} > \frac{c}{d} \iff ad > bc` | 分子大分母小者大；同分子比分母；直除看首位。
38. 百化分 | 百分数接近常见分数 | 常用分数 `\frac{1}{6} \approx 16.7\%,\ \frac{1}{7} \approx 14.3\%,\ \frac{1}{8} = 12.5\%,\ \frac{1}{9} \approx 11.1\%,\ \frac{1}{11} \approx 9.1\%` | 1/2=50%，1/3≈33.3%，1/4=25%，1/5=20%；背熟后乘除转分数。
39. 错位加减法 | 两个接近的数相乘 / 近似计算 | 近似 `(1 + r_1)(1 + r_2) \approx 1 + r_1 + r_2` | 交叉项 r₁r₂ 很小时可忽略；r 较大时保留交叉项。
40. 假设分配法 | 已知现期 + 增长率，求基期 | 假设增长量 `X_{\text{假}} = A r`；真实增长量 `X \approx \frac{A r}{1 + r}`；基期 `B = A - X` | 增速在 5%–25% 之间精度较好；增速过大改用直除。
41. 尾数法 | 加减运算 / 选项尾数不同 | 末位 `a \pm b \equiv c \pmod{10}` | 只算末位或末两位；注意进位、借位；乘除不适用。
42. 特殊分数比较 | 增长率接近 1/3、1/6、1/7 | 转换 `33.3\% \approx \frac{1}{3},\ 16.7\% \approx \frac{1}{6},\ 14.3\% \approx \frac{1}{7}` | 转成分数后约分，比较更直观。
43. 估算与首数法 | 选项差距大 / 只要首位 | 首数 `\frac{a}{b} \approx \text{首位} + \cdots` | 先看选项再动笔；选项差距越大，估算越安全。
44. ABRX 公式速查 | 四个量互推 / 知二求二 | 现期 `A = B(1+r)`；基期 `B = \frac{A}{1+r}`；增长量 `X = A - B = Br`；增长率 `r = \frac{X}{B}` | 先定时间口径，再判断已知的是哪两个量。

JSON 示例（第一条，照此格式补全其余 43 条）：

```json
{
  "chapters": [
    { "id": "basics", "title": "基础概念", "description": "时间口径、单位与材料阅读，是后面所有计算的前提。" }
  ],
  "points": [
    {
      "id": 1,
      "chapterId": "basics",
      "title": "同比与环比",
      "recognition": ["同比 / 环比", "与上年同期比", "与上月比"],
      "formulas": [
        { "label": "同比增长率", "tex": "r_{\\text{同比}} = \\frac{A - A_{\\text{上年同期}}}{A_{\\text{上年同期}}}" },
        { "label": "环比增长率", "tex": "r_{\\text{环比}} = \\frac{A - A_{\\text{上期}}}{A_{\\text{上期}}}" }
      ],
      "tips": ["同比看年，环比看月；先对齐材料的时间口径。"]
    }
  ]
}
```

- [ ] **Step 3: 校验数据**

Run:
```bash
node -e "const d=require('./public/resources/data-analysis.json');const ids=new Set(d.chapters.map(c=>c.id));const bad=d.points.filter(p=>!ids.has(p.chapterId));console.log('chapters',d.chapters.length,'points',d.points.length,'bad',bad.length,'idseq',d.points.every((p,i)=>p.id===i+1));if(d.chapters.length!==8||d.points.length!==44||bad.length||!d.points.every((p,i)=>p.id===i+1))process.exit(1)"
```
Expected: `chapters 8 points 44 bad 0 idseq true`。

---

### Task 2: 数据层与公式组件

**Files:**
- Create: `src/app/data-analysis/data.ts`
- Create: `src/app/data-analysis/components/formula.tsx`

**Interfaces:**
- Consumes: `data-analysis.json`
- Produces:
  - `Chapter = { id: string; title: string; description: string }`
  - `Formula = { label: string; tex: string; note?: string }`
  - `KnowledgePoint = { id: number; chapterId: string; title: string; recognition: string[]; formulas: Formula[]; tips: string[] }`
  - `ChapterGroup = Chapter & { points: KnowledgePoint[] }`
  - `chapterGroups: ChapterGroup[]`、`stats: { pointCount: number; chapterCount: number }`
  - `Formula({ tex, display? }: { tex: string; display?: boolean })`

- [ ] **Step 1: 写 `data.ts`**

```ts
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
```

- [ ] **Step 2: 写 `formula.tsx`**

```tsx
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
```

- [ ] **Step 3: 类型检查**

Run: `npx tsc --noEmit`
Expected: 若提示找不到 `katex` 类型，执行 `npm install -D @types/katex` 后重跑；最终无错误。

---

### Task 3: 页面与组件

**Files:**
- Create: `src/app/data-analysis/layout.tsx`
- Create: `src/app/data-analysis/components/chapter-nav.tsx`
- Create: `src/app/data-analysis/components/knowledge-card.tsx`
- Create: `src/app/data-analysis/page.tsx`

**Interfaces:**
- Consumes: `chapterGroups`、`stats`、`Formula`
- Produces: `/data-analysis` 路由。

- [ ] **Step 1: 写 `layout.tsx`**

```tsx
import "katex/dist/katex.min.css";
import type { ReactNode } from "react";

export default function DataAnalysisLayout({ children }: { children: ReactNode }) {
	return <div className="[--data-accent:oklch(0.45_0.13_245)] dark:[--data-accent:oklch(0.72_0.12_245)]">{children}</div>;
}
```

- [ ] **Step 2: 写 `chapter-nav.tsx`**

```tsx
import type { Chapter } from "../data";

export function ChapterNav({ chapters }: { chapters: Chapter[] }) {
	return (
		<nav aria-label="章节导航" className="border-border bg-background/90 sticky top-16 z-30 border-y backdrop-blur">
			<div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
				<ul className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
					{chapters.map((chapter, index) => (
						<li key={chapter.id} className="shrink-0">
							<a
								href={`#${chapter.id}`}
								className="hover:bg-muted focus-visible:bg-muted inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-sm transition-colors outline-none"
							>
								<span className="text-muted-foreground font-mono text-[0.625rem] tabular-nums">{String(index + 1).padStart(2, "0")}</span>
								{chapter.title}
							</a>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}
```

- [ ] **Step 3: 写 `knowledge-card.tsx`**

```tsx
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
```

- [ ] **Step 4: 写 `page.tsx`**

```tsx
import { ArrowLeft, ArrowUp, Calculator } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChapterNav } from "./components/chapter-nav";
import { KnowledgeCard } from "./components/knowledge-card";
import { chapterGroups, stats } from "./data";

export const metadata: Metadata = {
	title: "资料分析 · ASCEND",
	description: "公考行测资料分析知识点、公式与速记速查。",
};

export default function DataAnalysisPage() {
	return (
		<main id="top" className="bg-background min-h-screen">
			<header>
				<div className="mx-auto w-full max-w-6xl px-5 pt-8 pb-10 sm:px-8 sm:pt-10 sm:pb-12">
					<Link
						href="/#tools"
						className="text-muted-foreground hover:text-foreground inline-flex min-h-10 items-center gap-2 rounded-sm pr-2 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--data-accent)] focus-visible:ring-offset-2"
					>
						<ArrowLeft className="size-4" aria-hidden="true" />
						全部内容
					</Link>

					<div className="my-9 grid gap-9 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
						<div>
							<div className="text-muted-foreground flex items-center gap-2.5">
								<Calculator className="size-4" aria-hidden="true" />
								<p className="text-sm font-medium">行测速查手册</p>
							</div>
							<h1 className="mt-4 text-5xl leading-tight font-semibold text-balance text-(--data-accent) sm:text-6xl">资料分析</h1>
							<p className="text-muted-foreground mt-5 max-w-2xl text-sm leading-7 text-pretty sm:text-base">
								考点、公式与速记集中在一页，按章节从上往下刷，随时停下来查。
							</p>
						</div>

						<p className="text-muted-foreground font-mono text-sm leading-7 tabular-nums">
							共 {stats.pointCount} 个知识点 · {stats.chapterCount} 个章节
						</p>
					</div>
				</div>
			</header>

			<ChapterNav chapters={chapterGroups} />

			<div className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8 sm:pb-28">
				{chapterGroups.map((chapter, index) => (
					<section key={chapter.id} id={chapter.id} className="border-border scroll-mt-32 border-b py-10 last:border-b-0 sm:py-14">
						<header className="grid gap-4 md:grid-cols-[14rem_minmax(0,1fr)] md:items-start md:gap-12">
							<div className="md:sticky md:top-32 md:self-start">
								<p className="text-muted-foreground font-mono text-xs tabular-nums">{String(index + 1).padStart(2, "0")}</p>
								<h2 className="mt-1 text-2xl font-bold text-balance sm:text-3xl">{chapter.title}</h2>
								<p className="text-muted-foreground mt-2 text-xs">{chapter.points.length} 个知识点</p>
							</div>
							<div>
								<p className="text-muted-foreground max-w-2xl text-sm leading-7 text-pretty">{chapter.description}</p>
								<div className="mt-6 grid gap-3 lg:grid-cols-2">
									{chapter.points.map((point) => (
										<KnowledgeCard key={point.id} point={point} />
									))}
								</div>
							</div>
						</header>
					</section>
				))}

				<footer className="flex items-center justify-between gap-4 pt-10">
					<Link href="/#tools" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
						返回全部内容
					</Link>
					<a href="#top" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors">
						<ArrowUp className="size-4" aria-hidden="true" />
						回到顶部
					</a>
				</footer>
			</div>
		</main>
	);
}
```

- [ ] **Step 5: 类型检查**

Run: `npx tsc --noEmit`
Expected: 无错误。若 `Calculator` 不存在，换成 `BookOpenText`（仓库已在用）后重跑。

---

### Task 4: 首页入口

**Files:**
- Modify: `src/app/page.tsx:1-28`（import 增加 `Calculator`）
- Modify: `src/app/page.tsx:115-145`（在花生词汇卡片后增加资料分析卡片）

- [ ] **Step 1: 增加 import**

把第 3 行改为：

```tsx
import { ArrowDown, ArrowRight, BookOpen, Calculator } from "lucide-react";
```

- [ ] **Step 2: 在花生词汇的 `</motion.article>` 后增加卡片**

```tsx
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
```

- [ ] **Step 3: 类型检查**

Run: `npx tsc --noEmit`
Expected: 无错误。

---

### Task 5: 构建与页面验证

**Files:** 无新增。

- [ ] **Step 1: 生产构建**

Run: `npm run build`
Expected: 构建成功，路由列表包含 `/data-analysis`。

- [ ] **Step 2: 启动开发服务器**

Run: `npm run dev`
Expected: 本地地址可访问 `/` 与 `/data-analysis`。

- [ ] **Step 3: 手动检查**

- `/data-analysis` 显示 8 个章节、44 张卡片
- 章节导航点击后滚动到对应章节，且不被顶部 header 遮挡
- 桌面两列、移动端单列；长公式可横向滚动
- 深色模式下公式与文字清晰
- 首页出现「资料分析」卡片，点击进入 `/data-analysis`

- [ ] **Step 4: 汇报**

记录构建结果与手动检查结论；不执行 git commit。
