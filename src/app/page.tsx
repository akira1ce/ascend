import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex items-center gap-2">
        <Button variant="outline">Button</Button>
        <ThemeToggle />
      </div>
    </div>
  );
}
