import { Link } from "@remix-run/react";

import { ListItem } from "~/components/navigation/site/list-item";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";

const gettingStarted = [
  {
    title: "New to MUDs?",
    to: "/docs",
    description: "If you're brand-new or just curious, start here",
  },
  {
    title: "Creating a Character",
    to: "/docs",
    description: "Hey, you. You're finally awake.",
  },
  {
    title: "The World",
    to: "/docs",
    description: "A world rife with unchecked powers",
  },
];

export function GettingStarted() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          <li className="row-span-3">
            <NavigationMenuLink asChild>
              <Link to="/">
                <div className="gradient-guy flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md">
                  <div className="mb-2 mt-4 text-lg font-medium"></div>
                  <p className="text-sm leading-tight text-muted-foreground"></p>
                </div>
              </Link>
            </NavigationMenuLink>
          </li>
          {gettingStarted.map(({ title, to, description }) => {
            return (
              <ListItem key={title} title={title} to={to}>
                {description}
              </ListItem>
            );
          })}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
