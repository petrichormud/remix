import { useState } from "react";
import type {
  MetaFunction,
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { Check, Bell, ArrowRight, Inbox, Users, Trash } from "lucide-react";

import { getSession } from "~/lib/sessions.server";
import { playerPermissions } from "~/lib/mirror.server";
import { releasedPatches } from "~/lib/data.server";
import type {
  ReleasedPatchesReply,
  ReleasedPatchesReplyPatch,
} from "~/proto/data";
import { PlayerPermissions } from "~/lib/permissions";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import { Separator } from "~/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import tailwind from "~/styles/tailwind.css?url";

export const meta: MetaFunction = () => {
  return [
    { title: "PetrichorMUD" },
    { name: "description", content: "A modern take on a retro-style MUD" },
  ];
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwind }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const gamePatches = await releasedPatches("game");
  const clientPatches = await releasedPatches("client");
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("pid")) {
    const pid = session.get("pid");
    if (!pid) {
      return {
        pid: 0,
        permissionNames: [],
        patches: { game: gamePatches, client: clientPatches },
      };
    }
    const permissionsReply = await playerPermissions(pid);
    return {
      pid,
      permissionNames: permissionsReply.names,
      patches: { game: gamePatches, client: clientPatches },
    };
  } else {
    return {
      pid: 0,
      permissionNames: [],
      patches: { game: gamePatches, client: clientPatches },
    };
  }
}

export default function Index() {
  const { pid, permissionNames, patches } = useLoaderData<typeof loader>();
  const permissions = pid ? new PlayerPermissions(permissionNames) : undefined;
  return (
    <>
      <Header pid={pid} permissions={permissions} noBlur />
      <main className="flex flex-col items-center">
        <TestHeroTwo />
        <TestGettingStarted />
        <Newsletter />
        <ChangelogSection patches={patches} />
      </main>
      <Footer />
    </>
  );
}

function TestHeroTwo() {
  return (
    <div className="w-full max-w-screen-2xl">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <div className="hidden sm:mt-32 sm:flex lg:mt-16">
              <Link to="#changelog">
                <div className="rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-muted-foreground/10 hover:ring-muted-foreground/20">
                  There&apos;s a change log. Here is where changes get posted.
                  <Button type="button" variant="link">
                    Read More <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </Link>
            </div>
            <h1 className="mt-24 text-4xl font-bold tracking-tight text-primary sm:mt-10 sm:text-6xl">
              A World Rife With Unchecked Powers
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              This is the tagline for the game. It kind of sucks right now, but
              if you&apos;d like to improve it, please let me know!
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button type="button">Play</Button>
              <Button type="button" variant="link">
                Learn More <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
        {/* <div className="lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0 overflow-hidden"></div> */}
      </div>
    </div>
  );
}

function TestGettingStarted() {
  const features = [
    {
      name: "New to MUDs?",
      description: "If you're brand-new or just curious, start here",
      href: "/",
      icon: Inbox,
    },
    {
      name: "Creating a Character",
      description: "Hey, you. You're finally awake.",
      href: "/",
      icon: Users,
    },
    {
      name: "The World",
      description: "A world rife with unchecked powers",
      href: "/",
      icon: Trash,
    },
  ];

  return (
    <div className="bg-primary w-full py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-foreground">
            Getting Started
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Everything you need to Get Started
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
            Suspendisse eget egestas a elementum pulvinar et feugiat blandit at.
            In mi viverra elit nunc.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-primary-foreground">
                  <feature.icon
                    className="h-5 w-5 flex-none text-primary-foreground"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-2 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-4">
                    <Button
                      type="button"
                      variant="link"
                      className="px-0 text-primary-foreground"
                    >
                      Learn More <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

// TODO: Make this a floating header left and card right
function Newsletter() {
  return (
    <div className="w-full bg-primary/90 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="max-w-xl text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:col-span-7">
          <h2 className="inline sm:block lg:inline xl:block">
            Want updates and announcements?
          </h2>{" "}
          <p className="inline sm:block lg:inline xl:block">
            Join our newsletter.
          </p>
        </div>
        <form className="w-full max-w-md lg:col-span-5 lg:pt-2">
          <div className="flex gap-x-4">
            <Label htmlFor="newsletter-email-address" className="sr-only">
              Email address
            </Label>
            <Input
              id="newsletter-email-address"
              name="email"
              type="email"
              autoComplete="email"
              className="text-primary-foreground"
            />
            <Button
              type="submit"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Subscribe
            </Button>
          </div>
          <Button
            type="button"
            variant="link"
            className="text-primary-foreground px-0"
          >
            We&apos;ll never share your information.
          </Button>
        </form>
      </div>
    </div>
  );
}

type ChangelogPatchSelectProps = {
  patches: ReleasedPatchesReplyPatch[];
  patch: string;
  setPatch: React.Dispatch<React.SetStateAction<string>>;
};

function ChangelogPatchSelect({
  patches,
  patch,
  setPatch,
}: ChangelogPatchSelectProps) {
  const versions = patches.map((patch) => {
    return `${patch.major}.${patch.minor}.${patch.patch}`;
  });
  return (
    <Select value={patch} onValueChange={setPatch}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a patch" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {versions.map((version) => {
            return (
              <SelectItem key={version} value={version}>
                Patch {version}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

interface ChangelogProps extends React.ComponentProps<typeof Card> {
  title: string;
  patches: ReleasedPatchesReplyPatch[];
}

function Changelog({ title, patches, className, ...props }: ChangelogProps) {
  const [patch, setPatch] = useState("0.1.1");
  const { pid } = useLoaderData<typeof loader>();

  if (!patches.length) {
    return (
      <Card className={className} {...props}>
        <CardHeader className="p-4">{title}</CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
            <Check className="h-4 w-4" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                You&apos;re so early, there haven&apos;t been any changes yet!
              </p>
              <p className="text-sm text-muted-foreground overflow-hidden text-nowrap text-ellipsis">
                Check back soon to see what&apos;s happening.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // const threeChanges = [
  //   {
  //     title: "Updated movement",
  //     description: "Everyone is now red; 10x faster!",
  //     when: "1 hour ago",
  //   },
  //   {
  //     title: "Removed the retroencabulator",
  //     description: "It was too confusing, so we took it out.",
  //     when: "2 hours ago",
  //   },
  //   {
  //     title: "Added combat",
  //     description: "All your based are belong to us",
  //     when: "2 hours ago",
  //   },
  // ];
  // const twoChanges = [
  //   {
  //     title: "Made rooms",
  //     description: "Made some rooms",
  //     when: "2 weeks ago",
  //   },
  // ];
  // const oneChanges = [
  //   {
  //     title: "Added movement",
  //     description: "You can move now",
  //     when: "1 month ago",
  //   },
  //   {
  //     title: "Added the retroencabulator",
  //     description: "This won't be confusing at all.",
  //     when: "2 months ago",
  //   },
  // ];
  const initialPatchMap: { [index: string]: ReleasedPatchesReplyPatch } = {};
  const patchMap = patches.reduce((patchMap, patch) => {
    const version = `${patch.major}.${patch.minor}.${patch.patch}`;
    patchMap[version] = {
      ...patch,
    };
    return patchMap;
  }, initialPatchMap);
  const changes = patchMap[patch].changes || [];

  return (
    <Card className={className} {...props}>
      <CardHeader className="p-4">
        <CardTitle>{title}</CardTitle>
        <CardDescription>Changes for patch {patch}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ChangelogPatchSelect
          patches={patches}
          patch={patch}
          setPatch={setPatch}
        />
        {pid ? (
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <Bell />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Patch Notifications
              </p>
              <p className="text-sm text-muted-foreground">
                Receive Patch Notifications
              </p>
            </div>
            <Switch />
          </div>
        ) : null}
        <div className="h-48">
          {changes.map((change, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <Check className="h-4 w-4" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {change.title}
                </p>
                <p className="text-sm text-muted-foreground overflow-hidden text-nowrap text-ellipsis">
                  {change.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button className="px-0" variant="link">
          <ArrowRight className="mr-2 h-4 w-4" /> View full changelog
        </Button>
      </CardFooter>
    </Card>
  );
}

interface ChangelogSectionProps {
  patches: {
    game: ReleasedPatchesReply;
    client: ReleasedPatchesReply;
  };
}

function ChangelogSection({ patches }: ChangelogSectionProps) {
  const announcements = [
    {
      title: "Announcement One",
      description:
        "In this announcement we'll be announcing some really cool stuff and so on and so forth",
    },
    {
      title: "Announcement Two",
      description:
        "In this announcement we'll be announcing some really cool stuff and so on and so forth",
    },
  ];
  return (
    <div id="changelog" className="w-full sm:py-24 lg:py-32">
      <div className="mx-auto max-w-screen-2xl md:flex md:justify-between md:gap-24">
        <div className="md:grow w-full py-12 px-24">
          <header>
            <div className="mx-auto pb-2 max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Announcements
              </h2>
              <p className="mt-2 text-lg leading-8 text-muted-foreground">
                Here ye, here ye, announcements large and small
              </p>
            </div>
            <Separator />
          </header>
          <div className="sm:flex sm:justify-between pt-6">
            {announcements.map(({ title, description }) => {
              return (
                <article
                  key={title}
                  className="flex max-w-xl flex-col items-start justify-between"
                >
                  <div className="flex items-center gap-x-4 text-xs">
                    <time className="text-muted-foreground">Mar 22, 2020</time>
                  </div>
                  <div className="group">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-primary group-hover:text-primary/90">
                      <a href="/">{title}</a>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-base leading-6 text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <Tabs defaultValue="game-changelog" className="w-full md:max-w-[500px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="game-changelog">Changelog</TabsTrigger>
            <TabsTrigger value="client-changelog">Client Changelog</TabsTrigger>
          </TabsList>
          <TabsContent value="game-changelog">
            <Changelog patches={patches.game.patches} title="Changelog" />
          </TabsContent>
          <TabsContent value="client-changelog">
            <Changelog
              patches={patches.client.patches}
              title="Client Changelog"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
