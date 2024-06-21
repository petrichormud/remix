import { type ReactNode, useState } from "react";
import { Link } from "@remix-run/react";
import { LogOut, Settings } from "lucide-react";

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

export function AccountMenu({ children }: { children: ReactNode }) {
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
