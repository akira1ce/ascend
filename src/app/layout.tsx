import "lxgw-wenkai-webfont/lxgwwenkai-bold.css";
import "lxgw-wenkai-webfont/lxgwwenkai-regular.css";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "ASCEND · 公考积累工具",
	description: "ASCEND，专注公考词汇与知识积累。",
	icons: {
		icon: [{ url: "/ship.svg", type: "image/svg+xml" }],
		shortcut: "/ship.svg",
	},
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="zh-CN" data-scroll-behavior="smooth" className={`${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
			<body className="flex min-h-full flex-col">
				<ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
					<SiteHeader />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
