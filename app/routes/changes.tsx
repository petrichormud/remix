import { useState } from "react";
import {
  type LoaderFunctionArgs,
  type MetaFunction,
  type LinksFunction,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

import { PlayerPermissions } from "~/lib/permissions";
import { playerPermissions } from "~/lib/mirror.server";
import { getSession } from "~/lib/sessions.server";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";

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
  if (session.has("pid")) {
    const pid = session.get("pid");
    if (!pid) {
      return {
        pid: 0,
        permissionNames: [],
      };
    }
    const permissionsReply = await playerPermissions(pid);
    const permissions = new PlayerPermissions(permissionsReply.names);
    if (
      !permissions ||
      !(permissions.has("grant-all") && permissions.has("revoke-all"))
    ) {
      // TODO: Make this a 404 page instead
      return redirect("/");
    }

    return { pid, permissionNames: permissionsReply.names };
  } else {
    // TODO: Make this a 404 page instead
    return redirect("/");
  }
}

export default function Changes() {
  const [changes, setChanges] = useState([
    {
      id: 1,
      title: "Updated movement",
      description: "Everyone is now red; 10x faster!",
    },
    {
      id: 2,
      title: "Removed the retroencabulator",
      description: "It was too confusing, so we took it out.",
    },
    {
      id: 3,
      title: "Added combat",
      description: "All your based are belong to us",
    },
  ]);
  const { pid, permissionNames } = useLoaderData<typeof loader>();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const permissions = pid ? new PlayerPermissions(permissionNames) : undefined;
  if (
    !permissions ||
    !(permissions.has("grant-all") && permissions.has("revoke-all"))
  ) {
    return (
      <>
        <Header pid={pid} permissions={permissions} />
        <main></main>
      </>
    );
  }

  return (
    <>
      <Header pid={pid} permissions={permissions} />
      <main>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={changes}
            strategy={verticalListSortingStrategy}
          >
            <section className="mx-auto max-w-screen-2xl flex flex-col items-center gap-4">
              {changes.map((change) => (
                <Change key={change.id} {...change} />
              ))}
            </section>
          </SortableContext>
        </DndContext>
      </main>
      <Footer />
    </>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setChanges((changes) => {
        const oldIndex = changes.findIndex((change) => change.id === active.id);
        const newIndex = changes.findIndex((change) => change.id === over?.id);

        return arrayMove(changes, oldIndex, newIndex);
      });
    }
  }
}

type ChangeProps = {
  id: number;
  title: string;
  description: string;
};

function Change({ id, title, description }: ChangeProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="w-[450px] px-6 py-3 flex gap-2 justify-between"
    >
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        <p className="text-sm text-muted-foreground overflow-hidden text-nowrap text-ellipsis">
          {description}
        </p>
      </div>
      <Button
        {...attributes}
        {...listeners}
        variant="outline"
        size="icon"
        className="cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="h-6 w-6 text-muted-foreground" />
      </Button>
    </Card>
  );
}
