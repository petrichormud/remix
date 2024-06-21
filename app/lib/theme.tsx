import { useMemo, useLayoutEffect } from "react";
import { useRouteLoaderData, useNavigation } from "@remix-run/react";

import { loader as rootLoader } from "~/root";

export const THEME_LIGHT = "light";
export const THEME_DARK = "dark";
export const THEME_SYSTEM = "system";
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

export function ThemeScript({
  forceConsistentTheme,
}: {
  forceConsistentTheme?: boolean;
}) {
  return forceConsistentTheme ? null : <ThemeScriptImpl />;
}

function ThemeScriptImpl() {
  const theme = useTheme();

  const script = useMemo(
    () => `
        const theme = ${JSON.stringify(theme)};
        if (theme === "system") {
          const media = window.matchMedia("(prefers-color-scheme: dark)")
          if (media.matches) document.documentElement.classList.add(${THEME_DARK});
        }
      `,
    [] // eslint-disable-line
  );

  useLayoutEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    switch (theme) {
      case THEME_LIGHT:
        document.documentElement.classList.remove("dark");
        break;
      case THEME_DARK:
        document.documentElement.classList.add("dark");
        break;
      case THEME_SYSTEM:
        syncTheme(media);
        media.addEventListener("change", syncTheme);
        return () => media.removeEventListener("change", syncTheme);
      default:
        console.error("impossible theme state:", theme);
    }
  }, [theme]);

  useLayoutEffect(() => {
    if (theme === THEME_SYSTEM) {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      syncTheme(media);
    }
  });

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

function syncTheme(media: MediaQueryList | MediaQueryListEvent) {
  if (media.matches) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
