import { ThemeToggle } from "@/components/theme-toggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="font-bold capitalize">
      <ThemeToggle/>
      <UserButton/>
    </div>
  );
}
