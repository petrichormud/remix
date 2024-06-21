import { Link, useLocation } from "@remix-run/react";
import { CircleUser, LogOut, Settings } from "lucide-react";

import { cn } from "~/lib/utils";
import { navigationMenuTriggerStyle } from "~/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";

export function PlayerDropdown() {
  const { pathname } = useLocation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(navigationMenuTriggerStyle(), "px-2")}
          variant="link"
          size="icon"
        >
          <CircleUser className="h-6 w-6" />
          <span className="sr-only">Toggle player dropdown</span>
        </Button>
      </DropdownMenuTrigger>
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
          <Link to={`/logout?from=${pathname}`}>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log Out</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
