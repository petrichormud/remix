import { Link } from "@remix-run/react";
import { Users, ClipboardList, ListChecks } from "lucide-react";

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

interface AccountMenuProps extends React.PropsWithChildren {
  permissions?: PlayerPermissions;
}

export function AdminMenu({ children, permissions }: AccountMenuProps) {
  if (
    !permissions ||
    !(permissions.has("grant-all") && permissions.has("revoke-all"))
  ) {
    return null;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-6">
          <DropdownMenuLabel>Admin</DropdownMenuLabel>
          <>
            <DropdownMenuGroup>
              <Link to="/admin/requests">
                <DropdownMenuItem>
                  <ListChecks className="mr-2 h-4 w-4" />
                  <span>Requests</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </>
          {permissions &&
          permissions.has("grant-all") &&
          permissions.has("revoke-all") ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link to="/admin/players">
                  <DropdownMenuItem>
                    <Users className="mr-2 h-4 w-4" />
                    <span>Players</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            </>
          ) : null}
          {permissions &&
          permissions.has("grant-all") &&
          permissions.has("revoke-all") ? (
            <>
              <DropdownMenuGroup>
                <Link to="/admin/changes">
                  <DropdownMenuItem>
                    <ClipboardList className="mr-2 h-4 w-4" />
                    <span>Changelogs</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
