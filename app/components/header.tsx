import { Navigation } from "~/components/navigation";

type HeaderProps = {
  pid?: number;
};

export function Header({ pid }: HeaderProps) {
  return (
    <header className="flex w-full items-center justify-center py-2 px-6 border-b">
      <section className="flex w-full max-w-screen-2xl items-center justify-end">
        <Navigation pid={pid} />
      </section>
    </header>
  );
}
