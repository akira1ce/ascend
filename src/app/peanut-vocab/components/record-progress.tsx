"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

/** 记录学习进度 */
export const RecordProgress = () => {
	const { id } = useParams();

	useEffect(() => {
		if (!id) return;
		localStorage.setItem("peanut-vocab-index", id + "");
	}, []);

	return null;
};

/** 继续学习 */
export const ResumeLearning = () => {
	const [id, setId] = useState(1);

	useEffect(() => {
		const _id = localStorage.getItem("peanut-vocab-index") || 1;
		setId(+_id);
	}, []);

	return (
		<Link className="text-background bg-(--peanut-accent) p-3" href={`/peanut-vocab/${id}`}>
			{id !== 1 ? "继续学习" : "开始学习"}
		</Link>
	);
};
