import { Separator } from "~/components/ui/separator";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export default function Passphrase() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Passphrase</h3>
        <p className="text-sm text-muted-foreground">
          Change your passphrase here.
        </p>
      </div>
      <Separator />
      <div className="space-y-4 md:w-[24rem]">
        <div className="space-y-2">
          <Label>Current Passphrase</Label>
          <Input type="password" />
        </div>
        <div className="space-y-2">
          <Label>New Passphrase</Label>
          <Input type="password" />
        </div>
        <div className="space-y-2">
          <Label>Confirm New Passphrase</Label>
          <Input type="password" />
        </div>
        <footer>
          <Button disabled>Update Passphrase</Button>
        </footer>
      </div>
    </div>
  );
}
