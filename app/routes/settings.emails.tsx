import { Separator } from "~/components/ui/separator";

export default function SettingsEmails() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Email Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your email addresses here.
        </p>
      </div>
      <Separator />
    </div>
  );
}
