import { type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { playerPermissions } from "~/lib/mirror.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  if (!id) {
    return redirect("/");
  }
  const playerPermissionsReply = await playerPermissions(parseInt(id));
  return { playerPermissionNames: playerPermissionsReply.names };
}

export default function PlayerPermissions() {
  const { playerPermissionNames } = useLoaderData<typeof loader>();
  return (
    <div>
      {playerPermissionNames.map((name) => (
        <div key={name}>{name}</div>
      ))}
    </div>
  );
}
