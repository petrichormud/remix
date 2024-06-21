import { LogIn, CircleUser } from "lucide-react";

import { Button } from "~/components/ui/button";
import { LoginDialog } from "~/components/navigation/login";
import { AccountMenu } from "~/components/navigation/account-menu";
import { ThemeToggle } from "~/components/navigation/theme-toggle";
import { SiteNavigation } from "~/components/navigation/site";

type HeaderProps = {
  pid?: number;
};

export function Header({ pid }: HeaderProps) {
  return (
    <header className="bg-background/70 backdrop-filter backdrop-blur-lg sticky top-0 flex w-full items-center justify-center py-2 px-6 border-b">
      <section className="flex w-full max-w-screen-2xl items-center justify-end">
        <div className="mr-auto flex items-center gap-1">
          {pid ? (
            <AccountMenu>
              <Button type="button" variant="link">
                <CircleUser className="mr-2 h-5 w-5" />
                Account
              </Button>
            </AccountMenu>
          ) : (
            <LoginDialog>
              <Button type="button" variant="link">
                <LogIn className="mr-2 h-4 w-4" />
                Log In
              </Button>
            </LoginDialog>
          )}
          <ThemeToggle />
        </div>
        <SiteNavigation pid={pid} />
      </section>
    </header>
  );
}
