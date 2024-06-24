import { ColumnDef } from "@tanstack/react-table";
import { ArrowUp, ArrowDown, ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { Player } from "./data";

function SortArrow({ dir }: { dir: string | boolean }) {
  if (dir === "asc") {
    return <ArrowUp className="h-4 w-4" />;
  } else if (dir === "desc") {
    return <ArrowDown className="h-4 w-4" />;
  } else {
    return <ArrowUpDown className="h-4 w-4" />;
  }
}

export const columns: ColumnDef<Player>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "primaryEmail",
    header: ({ column }) => {
      return (
        <>
          <span>Primary Email</span>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="ml-2 p-2"
          >
            <SortArrow dir={column.getIsSorted()} />
          </Button>
        </>
      );
    },
  },
  {
    accessorKey: "currentCharacter",
    header: "Current Character",
  },
  {
    id: "actions",
    cell: () => {
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
            <DropdownMenuItem>Go to player</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Grant Permissions</DropdownMenuItem>
            <DropdownMenuItem>Revoke Permissions</DropdownMenuItem>
            <DropdownMenuItem>Revoke All Permissions</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
