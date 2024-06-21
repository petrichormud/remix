import { createCookie } from "@remix-run/node";

import { type Theme, THEME_SYSTEM, isTheme } from "~/lib/theme";

const cookie = createCookie("theme", {
  maxAge: 34560000,
  sameSite: "lax",
});

export async function getTheme(request: Request) {
  const header = request.headers.get("Cookie");
  const { theme } = await cookie.parse(header);

  if (isTheme(theme)) {
    return theme;
  }

  return "system";
}

export function serializeTheme(theme: Theme) {
  const eatCookie = theme === THEME_SYSTEM;
  if (eatCookie) {
    return cookie.serialize({}, { expires: new Date(0), maxAge: 0 });
  } else {
    return cookie.serialize({ theme });
  }
}
