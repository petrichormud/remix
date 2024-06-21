import * as React from "react";

import { cn } from "~/lib/utils";
import { NavigationMenuLink } from "~/components/ui/navigation-menu";

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
}

export const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <span
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </span>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
