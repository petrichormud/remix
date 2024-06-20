import { Separator } from "~/components/ui/separator";

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
    </div>
  );
}