import { Navigation } from "~/components/nav";

export function Header() {
  return (
    <header className="flex w-full items-center justify-end py-4 px-6">
      <Navigation />
    </header>
  );
}
