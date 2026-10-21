# 资料分析速查模块设计

日期：2026-10-21
状态：已确认

## 目标

在 ASCEND 中新增「资料分析」模块，把公考行测资料分析的核心知识点整理成一页可扫读的速查手册。用户可以在一个页面内按章节浏览全部考点、公式和速记提示，不需要逐条点进详情页。

内容以市面公开的资料分析教学体系为基础，统一表述，不区分老师、不出现老师姓名。第一版覆盖完整体系，约 44 个知识点、9 个章节。

## 非目标

- 不做详情页、上一个/下一个导航
- 不做学习进度、已学标记、收藏
- 不做搜索、筛选、刷题、错题本
- 不收录完整例题和详细解题步骤
- 不按老师分线，不做双师对照
- 不引入测试框架

## 路由与文件

```
src/app/data-analysis/
├── layout.tsx          模块主题色 + KaTeX 样式
├── page.tsx            单页速查手册
├── data.ts             类型、数据读取、按章节分组
└── components/
    ├── chapter-rail.tsx     左侧章节目录（桌面）+ 横向 chip（移动）
    └── formula.tsx          服务端公式渲染
public/resources/data-analysis.json
```

新增依赖：`katex`（仅服务端 `renderToString`，不加载客户端脚本）。

## 数据模型

```ts
type Chapter = {
  id: string;
  title: string;
  description: string;
};

type Formula = {
  label: string;
  tex: string;
  note?: string;
};

type KnowledgePoint = {
  id: number;
  chapterId: string;
  title: string;
  recognition: string[];
  formulas: Formula[];
  tips: string[];
};
```

JSON 结构：

```json
{
  "chapters": [{ "id": "basics", "title": "基础概念", "description": "..." }],
  "points": [{ "id": 1, "chapterId": "basics", "title": "同比与环比", "recognition": ["..."], "formulas": [], "tips": ["..."] }]
}
```

约定：

- `id` 从 1 递增，决定页内顺序
- `chapterId` 必须存在于 `chapters`
- 公式使用 KaTeX 语法；纯文字结论可以留在 `tips`
- 每个知识点 1–3 条识别标签、1–3 个公式、1–2 条速记

## 章节

1. 基础概念（8）
2. 增长（10）
3. 基期与现期（4）
4. 比重（4）
5. 平均数（4）
6. 倍数与番数（3）
7. 综合分析（2）
8. 速算技巧（9）

合计 44 个知识点。

## 页面

单页 `/data-analysis`：

- 顶部：返回全部内容、模块名「资料分析」、副标题、`44 个知识点 · 9 个章节`
- 桌面端左侧 12rem 章节目录栏，在内容区内 sticky（top 让位给 SiteHeader），当前章节高亮；不做整行吸顶条
- 移动端章节目录为顶部横向 chip，不吸顶
- 每个章节一个 `<section>`：编号 + 标题 + 数量 + 说明 + 知识点卡片
- 知识点卡片：编号、标题、识别标签、公式、速记
- 卡片区桌面两列、移动端单列；长公式允许横向滚动
- 页面底部返回顶部/全部内容入口

## 视觉

- 模块色 `--data-accent`：浅色 `oklch(0.45 0.13 245)`，深色 `oklch(0.72 0.12 245)`
- 沿用现有字体、边框、圆角和间距体系
- 公式使用 KaTeX 字体，深色模式下继承前景色
- 首页工具区新增「资料分析」卡片，显示 44 个知识点

## 验证

- `npx tsc --noEmit`
- `npm run build`
- `npm run dev` 手动检查：目录锚点、移动端宽度、深色模式、公式渲染、首页入口

## 内容来源与规范

以齐麟、花生十三两位老师公开的资料分析体系为参考，交叉核对后统一改写。不复制课程原文，例题不收录。数据中不出现老师姓名。
