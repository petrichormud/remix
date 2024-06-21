import {
  NavigationMenu,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import { GettingStarted } from "~/components/navigation/site/getting-started";
import { Mechanics } from "~/components/navigation/site/mechanics";
import { PlayButton } from "~/components/navigation/site/play";

type NavigationProps = {
  pid?: number;
};

export function SiteNavigation({ pid }: NavigationProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-[0.5">
        <GettingStarted />
        <Mechanics />
        <PlayButton pid={pid} />
      </NavigationMenuList>
    </NavigationMenu>
  );
}
