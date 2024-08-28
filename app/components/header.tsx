import { LogIn, CircleUser, Waves, FileSliders } from "lucide-react";
import { Link } from "@remix-run/react";

import { cn } from "~/lib/utils";
import { PlayerPermissions } from "~/lib/permissions";
import { Button } from "~/components/ui/button";
import { LoginDialog } from "~/components/navigation/login";
import { AccountMenu } from "~/components/navigation/account-menu";
import { AdminMenu } from "~/components/navigation/admin-menu";
import { ThemeToggle } from "~/components/navigation/theme-toggle";
import { SiteNavigation } from "~/components/navigation/site";

type HeaderProps = {
  pid?: number;
  permissions?: PlayerPermissions;
  noBlur?: boolean;
};

export function Header({ pid, permissions, noBlur = false }: HeaderProps) {
  return (
    <header
      className={cn(
        "bg-background sticky top-0 flex w-full items-center justify-center py-2 px-6 border-b",
        !noBlur && "bg-background/70 backdrop-filter backdrop-blur-lg"
      )}
    >
      <section className="flex w-full max-w-screen-2xl items-center justify-end">
        <div className="mr-auto flex items-center gap-1">
          <Link to="/">
            <Waves className="h-6 w-6" />
          </Link>
          {pid ? (
            <>
              <AccountMenu permissions={permissions}>
                <Button type="button" variant="link">
                  <CircleUser className="mr-2 h-5 w-5" />
                  Account
                </Button>
              </AccountMenu>
              <AdminMenu permissions={permissions}>
                <Button type="button" variant="link">
                  <FileSliders className="mr-2 h-5 w-5" />
                  Admin
                </Button>
              </AdminMenu>
            </>
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
