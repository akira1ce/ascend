"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();

	function toggleTheme() {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	}

	return (
		<Button
			type="button"
			variant="ghost"
			size="icon-lg"
			className="relative cursor-pointer"
			onClick={toggleTheme}
			aria-label="切换深浅主题"
			title="切换深浅主题"
		>
			<Sun className="scale-100 opacity-100 transition-[scale,opacity] duration-150 dark:scale-90 dark:opacity-0" />
			<Moon className="absolute scale-90 opacity-0 transition-[scale,opacity] duration-150 dark:scale-100 dark:opacity-100" />
			<span className="sr-only">切换深浅主题</span>
		</Button>
	);
}
