import {
  type MetaFunction,
  type LinksFunction,
  type LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import type { PlayersReplyPlayer } from "~/proto/mirror";
import { getSession } from "~/lib/sessions.server";
import { players, playerPermissions } from "~/lib/mirror.server";
import { PlayerPermissions } from "~/lib/permissions";
import { Header } from "~/components/header";
import { RequestsDataTable } from "~/components/requests/data-table";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

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
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("pid")) return redirect("/");
  const pid = session.get("pid");
  if (!pid) {
    return redirect("/");
  }

  // TODO: Get some methods on permissions to encapsulate admin permissions
  const permissionsReply = await playerPermissions(pid);
  if (
    !permissionsReply.names.includes("grant-all") ||
    !permissionsReply.names.includes("revoke-all")
  ) {
    return redirect("/");
  }

  const playersReply = await players();
  const playerRows: Player[] = playersReply.players.map(({ id, ...player }) => {
    return { id: Number(id), ...player };
  });

  return {
    pid,
    permissionNames: permissionsReply.names,
    players: playerRows,
  };
}

export default function Index() {
  const { pid, permissionNames, players } = useLoaderData<typeof loader>();
  const permissions = new PlayerPermissions(permissionNames);

  return (
    <>
      <Header pid={pid} permissions={permissions} />
      <main className="relative z-0 container mx-auto py-10">
        <RequestsDataTable columns={columns} data={players} />
      </main>
    </>
  );
}

type Player = Omit<PlayersReplyPlayer, "id"> & { id: number };

const columns: ColumnDef<Player>[] = [
  {
    accessorKey: "primaryEmail",
    header: "Type",
  },
  {
    accessorKey: "primaryEmail",
    header: "Status",
  },
  {
    accessorKey: "currentCharacter",
    header: "Reviewed By",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { original: player } = row;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link to={`/players/${player.id}`}>
              <DropdownMenuItem>Go to player</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
