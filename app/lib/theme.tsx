import { useRouteLoaderData, useNavigation } from "@remix-run/react";

import { loader as rootLoader } from "~/root";

export const THEME_LIGHT = "light";
export const THEME_DARK = "dark";
export const THEME_SYSTEM = "system";
export const THEME_DEFAULT = THEME_LIGHT;
export type Theme =
  | typeof THEME_LIGHT
  | typeof THEME_DARK
  | typeof THEME_SYSTEM;

// eslint-disable-next-line
export function isTheme(theme: any): theme is Theme {
  return (
    theme === THEME_LIGHT || theme === THEME_DARK || theme === THEME_SYSTEM
  );
}

export function useTheme(): Theme {
  const data = useRouteLoaderData<typeof rootLoader>("root");
  const theme = data?.theme ?? THEME_SYSTEM;

  const { formData } = useNavigation();

  if (formData?.has("theme")) {
    const theme = formData.get("theme");
    if (isTheme(theme)) {
      return theme;
    }
  }

  return theme;
}
