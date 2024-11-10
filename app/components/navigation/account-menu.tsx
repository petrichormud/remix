import { useState } from "react";
import { Link } from "@remix-run/react";
import { LogOut, VenetianMask, UserCog, Bell, Lock } from "lucide-react";

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

interface AccountMenuProps extends React.PropsWithChildren {
  permissions?: PlayerPermissions;
}

export function AccountMenu({ children }: AccountMenuProps) {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-6">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuGroup>
            <Link to="/characters">
              <DropdownMenuItem>
                <VenetianMask className="mr-2 h-4 w-4" />
                <span>Characters</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuGroup>
            <Link to="/settings/account">
              <DropdownMenuItem>
                <UserCog className="mr-2 h-4 w-4" />
                <span>Account</span>
              </DropdownMenuItem>
            </Link>
            <Link to="/settings/notifications">
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
            </Link>
            <Link to="/settings/passphrase">
              <DropdownMenuItem>
                <Lock className="mr-2 h-4 w-4" />
                <span>Passphrase</span>
              </DropdownMenuItem>
            </Link>
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
