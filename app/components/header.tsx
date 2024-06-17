import { Navigation } from "~/components/nav";

type HeaderProps = {
  pid?: number;
};

export function Header({ pid }: HeaderProps) {
  return (
    <header className="flex w-full items-center justify-end py-4 px-6">
      <Navigation pid={pid} />
    </header>
  );
}
