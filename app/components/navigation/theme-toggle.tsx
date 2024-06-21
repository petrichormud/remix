import { useFetcher } from "@remix-run/react";
import { Switch } from "@headlessui/react";
import { Sun, Moon } from "lucide-react";

import { cn } from "~/lib/utils";
import { type Theme, THEME_LIGHT, THEME_DARK, useTheme } from "~/lib/theme";

export function ThemeToggle() {
  const usedTheme = useTheme();
  const fetcher = useFetcher<{ theme: Theme }>({ key: "theme" });
  const theme = fetcher.formData?.get("theme") ?? usedTheme;
  const enabled = theme === THEME_LIGHT;

  return (
    <Switch
      checked={theme === THEME_LIGHT}
      onChange={(checked) => {
        const theme = checked ? THEME_LIGHT : THEME_DARK;
        fetcher.submit(
          { theme },
          {
            method: "post",
            action: "/action/set-theme",
          }
        );
      }}
      onMouseDown={(e) => e.preventDefault()}
      className={cn(
        enabled ? "bg-primary" : "bg-muted",
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        className={cn(
          enabled ? "translate-x-5" : "translate-x-0",
          "pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white dark:bg-black shadow ring-0 transition duration-200 ease-in-out"
        )}
      >
        <span
          className={cn(
            enabled
              ? "opacity-0 duration-100 ease-out"
              : "opacity-100 duration-200 ease-in",
            "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
          )}
          aria-hidden="true"
        >
          <Moon className="h-4 w-4 text-gray-400" />
        </span>
        <span
          className={cn(
            enabled
              ? "opacity-100 duration-200 ease-in"
              : "opacity-0 duration-100 ease-out",
            "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
          )}
          aria-hidden="true"
        >
          <Sun className="h-4 w-4 text-primary" />
        </span>
      </span>
    </Switch>
  );
}
