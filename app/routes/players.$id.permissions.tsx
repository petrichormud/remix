import { type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData, useRouteLoaderData } from "@remix-run/react";

import { loader as rootPlayersLoader } from "~/routes/players.$id";
import { PlayerPermissions } from "~/lib/permissions";
import {
  playerPermissions,
  playerPermissionDefinitions,
} from "~/lib/mirror.server";
import { Switch } from "~/components/ui/switch";
import type { PlayerPermissionDefinitionsReplyPermission } from "~/proto/mirror";

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
                <PlayerPermissionComponent
                  key={name}
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

type AdminPlayerPermissionProps = {
  title: string;
  about: string;
  granted: boolean;
  canGrant: boolean;
  canRevoke: boolean;
};

function PlayerPermissionComponent({
  title,
  about,
  granted,
  canGrant,
  canRevoke,
}: AdminPlayerPermissionProps) {
  const disabled = granted ? !canRevoke : !canGrant;
  return (
    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
      <div className="space-y-1">
        <h4 className="text-sm leading-none">{title}</h4>
        <p className="text-xs text-muted-foreground">{about}</p>
      </div>
      <Switch checked={granted} disabled={disabled} />
    </div>
  );
}