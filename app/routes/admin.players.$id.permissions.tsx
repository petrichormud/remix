import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  redirect,
} from "@remix-run/node";
import {
  useLoaderData,
  useRouteLoaderData,
  useFetcher,
  useParams,
} from "@remix-run/react";

import { loader as rootPlayersLoader } from "~/routes/admin.players.$id";
import { getSession } from "~/lib/sessions.server";
import { PlayerPermissions } from "~/lib/permissions";
import {
  playerPermissions,
  playerPermissionDefinitions,
  grantPlayerPermission,
  revokePlayerPermission,
} from "~/lib/mirror.server";
import { Switch } from "~/components/ui/switch";
import type { PlayerPermissionDefinitionsReplyPermission } from "~/proto/mirror";

type PermissionActionInput = {
  name?: string;
  grant?: string;
};

export async function action({ params, request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("pid")) {
    return redirect("/");
  }
  const pid = session.get("pid");
  if (!pid) {
    return redirect("/");
  }
  const playerPermissionsReply = await playerPermissions(pid);
  const permissions = new PlayerPermissions(playerPermissionsReply.names);
  const { id } = params;
  if (!id) {
    return redirect("/");
  }

  const form = await request.formData();
  const { name, grant }: PermissionActionInput = Object.fromEntries(form);
  if (!name) {
    return redirect("/");
  }

  if (grant === "true") {
    if (!permissions.canGrant(name)) {
      return redirect("/");
    }
    const grantPlayerPermissionReply = await grantPlayerPermission(
      parseInt(id),
      pid,
      name
    );
    if (grantPlayerPermissionReply.id) {
      return { ok: true, grant: grant === "true" };
    }
  } else {
    if (!permissions.canRevoke(name)) {
      return redirect("/");
    }
    const revokePlayerPermissionReply = await revokePlayerPermission(
      parseInt(id),
      pid,
      name
    );
    if (revokePlayerPermissionReply.id) {
      return { ok: true, grant: grant === "true" };
    }
  }

  return null;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  if (!id) {
    return redirect("/");
  }
  const playerPermissionsReply = await playerPermissions(parseInt(id));
  const playerPermissionDefinitionsReply = await playerPermissionDefinitions();
  return {
    playerPermissionNames: playerPermissionsReply.names,
    definitions: playerPermissionDefinitionsReply.permissions,
  };
}

export default function PlayerPermissionsComponent() {
  const { definitions, playerPermissionNames } = useLoaderData<typeof loader>();
  const data =
    useRouteLoaderData<typeof rootPlayersLoader>("routes/players.$id");
  const viewerPermissions = new PlayerPermissions(data?.permissionNames || []);
  const playerPermissions = new PlayerPermissions(playerPermissionNames);

  const permissionsByCategory: {
    [index: string]: PlayerPermissionDefinitionsReplyPermission[];
  } = {};
  for (const definition of definitions) {
    permissionsByCategory[definition.category] ||= [];
    permissionsByCategory[definition.category].push(definition);
  }
  const permissionCategories = [];
  for (const category in permissionsByCategory) {
    const permissions = permissionsByCategory[category];
    permissionCategories.push({ category, permissions });
  }

  return (
    <div className="space-y-6">
      {permissionCategories.map(({ category, permissions }) => {
        return (
          <div key={category} className="space-y-4">
            <h3 className="text-base font-semibold leading-none">
              {category} Permissions
            </h3>
            {permissions.map(({ name, title, about }) => {
              return (
                <PlayerPermissionCard
                  key={name}
                  name={name}
                  title={title}
                  about={about}
                  granted={playerPermissions.has(name)}
                  canGrant={viewerPermissions.canGrant(name)}
                  canRevoke={viewerPermissions.canRevoke(name)}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

interface PlayerPermissionCardProps {
  title: string;
  name: string;
  about: string;
  granted: boolean;
  canGrant: boolean;
  canRevoke: boolean;
}

function PlayerPermissionCard({
  name,
  title,
  about,
  granted,
  canGrant,
  canRevoke,
}: PlayerPermissionCardProps) {
  const { id } = useParams();
  const disabled = granted ? !canRevoke : !canGrant;

  const fetcher = useFetcher<{ name: string; grant: boolean }>();
  const calculatedGranted = fetcher.data?.grant || granted;

  return (
    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
      <div className="space-y-1">
        <h4 className="text-sm leading-none">{title}</h4>
        <p className="text-xs text-muted-foreground">{about}</p>
      </div>
      <Switch
        checked={calculatedGranted}
        onCheckedChange={(checked) => {
          if (disabled) return;
          if (!id) return;

          fetcher.submit(
            { name, grant: checked },
            { method: "post", action: `/players/${id}/permissions` }
          );
        }}
        disabled={disabled}
      />
    </div>
  );
}
