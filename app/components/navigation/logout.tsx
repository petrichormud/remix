import { useFetcher } from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";

import { action } from "~/routes/logout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";

export function LogoutDialog({
  dialogOpen,
  setDialogOpen,
}: {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const fetcher = useFetcher<typeof action>({ key: "logout" });

  return (
    <ClientOnly>
      {() => (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[425px] p-6">
            <DialogHeader>
              <DialogTitle>Log Out</DialogTitle>
              <DialogDescription>
                Are you sure you&apos;d like to log out?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setDialogOpen(false);
                }}
              >
                Never Mind
              </Button>
              <fetcher.Form method="post" action="/logout">
                <Button type="submit">Log Out</Button>
              </fetcher.Form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </ClientOnly>
  );
}
