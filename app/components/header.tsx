import { Navigation } from "~/components/navigation";
import { PlayerDropdown } from "~/components/navigation/player-dropdown";
import { ThemeToggle } from "~/components/navigation/theme-toggle";

type HeaderProps = {
  pid?: number;
};

export function Header({ pid }: HeaderProps) {
  return (
    <header className="flex w-full items-center justify-center py-2 px-6 border-b">
      <section className="flex w-full max-w-screen-2xl items-center justify-end">
        <div className="mr-auto flex items-center gap-1">
          {pid ? <PlayerDropdown /> : null}
          <ThemeToggle />
        </div>
        <Navigation pid={pid} />
      </section>
    </header>
  );
}
