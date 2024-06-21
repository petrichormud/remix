import { ListItem } from "~/components/navigation/site/list-item";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";

const mechanics: { title: string; href: string; description: string }[] = [
  {
    title: "Movement",
    href: "/docs",
    description:
      "Everything movement. Run, jump, climb, swim and crawl your way around (and underneath) the City.",
  },
  {
    title: "Combat",
    href: "/docs",
    description: "For when diplomacy just won't cut it.",
  },
  {
    title: "Crafting",
    href: "/docs",
    description:
      "Create clothing, weapons, food, music, and thaumaturgic disasters alike.",
  },
  {
    title: "Social & Survival",
    href: "/docs",
    description:
      "How you'll survive harsh environmens and equally harsh social encounters.",
  },
  {
    title: "Skills",
    href: "/docs",
    description: "The primary way characters interact with the world.",
  },
  {
    title: "Classes",
    href: "/docs",
    description: "Some archetypes you know and love, along with some new.",
  },
];

export function Mechanics() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Mechanics</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
          {mechanics.map((mechanic) => (
            <ListItem
              key={mechanic.title}
              title={mechanic.title}
              to={mechanic.href}
            >
              {mechanic.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
