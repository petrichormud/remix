import { type ReactNode, useState } from "react";
import { Link } from "@remix-run/react";
import { LogOut, Settings } from "lucide-react";

import { PlayerPermissions } from "~/lib/permissions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "~/components/ui/dropdown-menu";
import { LogoutDialog } from "~/components/navigation/logout";

type AccountMenuProps = {
  children: ReactNode;
  permissions?: PlayerPermissions;
};

export function AccountMenu({ children, permissions }: AccountMenuProps) {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-6">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link to="/settings">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </Link>
            {permissions &&
            permissions.has("grant-all") &&
            permissions.has("revoke-all") ? (
              <Link to="/permissions">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Permissions</span>
                </DropdownMenuItem>
              </Link>
            ) : null}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setLogoutDialogOpen(true)}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutDialog
        dialogOpen={logoutDialogOpen}
        setDialogOpen={setLogoutDialogOpen}
      />
    </>
  );
}
