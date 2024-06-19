import { Link } from "@remix-run/react";
import { CircleUser, LogOut, Settings } from "lucide-react";

import { cn } from "~/lib/utils";
import { navigationMenuTriggerStyle } from "~/components/ui/navigation-menu";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "~/components/ui/dropdown-menu";

import { Navigation } from "~/components/navigation";

type HeaderProps = {
  pid?: number;
};

export function Header({ pid }: HeaderProps) {
  return (
    <header className="flex w-full items-center justify-center py-2 px-6 border-b">
      <section className="flex w-full max-w-screen-2xl items-center justify-end">
        <div className="mr-auto">
          {pid ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className={cn(navigationMenuTriggerStyle(), "px-2")}
                  variant="link"
                  size="icon"
                >
                  <CircleUser className="h-5 w-5" />
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
                {/* <DropdownMenuSub> */}
                {/*   <DropdownMenuSubTrigger> */}
                {/*     <UserPlus className="mr-2 h-4 w-4" /> */}
                {/*     <span>Invite users</span> */}
                {/*   </DropdownMenuSubTrigger> */}
                {/*   <DropdownMenuPortal> */}
                {/*     <DropdownMenuSubContent> */}
                {/*       <DropdownMenuItem> */}
                {/*         <Mail className="mr-2 h-4 w-4" /> */}
                {/*         <span>Email</span> */}
                {/*       </DropdownMenuItem> */}
                {/*       <DropdownMenuItem> */}
                {/*         <MessageSquare className="mr-2 h-4 w-4" /> */}
                {/*         <span>Message</span> */}
                {/*       </DropdownMenuItem> */}
                {/*       <DropdownMenuSeparator /> */}
                {/*       <DropdownMenuItem> */}
                {/*         <PlusCircle className="mr-2 h-4 w-4" /> */}
                {/*         <span>More...</span> */}
                {/*       </DropdownMenuItem> */}
                {/*     </DropdownMenuSubContent> */}
                {/*   </DropdownMenuPortal> */}
                {/* </DropdownMenuSub> */}
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link to="/logout">
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
        <Navigation pid={pid} />
      </section>
    </header>
  );
}
