import { Navigation } from "~/components/navigation";

type HeaderProps = {
  pid?: number;
};

export function Header({ pid }: HeaderProps) {
  return (
    <header className="flex w-full items-center justify-end py-2 px-6 border-b">
      <Navigation pid={pid} />
    </header>
  );
}
