import { createCookieSessionStorage } from "@remix-run/node";
import { createThemeSessionResolver } from "remix-themes";

export const themeSessionResolver = createThemeSessionResolver(
  createCookieSessionStorage({
    cookie: {
      name: "__remix-themes",
      // domain: 'remix.run',
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secrets: ["s3cr3t"],
      // secure: true,
    },
  })
);

type SessionData = {
  pid: number;
};

type SessionFlashData = {
  loginError: string;
  registerError: string;
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // TODO: Generate a cookie configuration based on env config
    cookie: {
      name: "__session",

      domain: "localhost",
      // Expires can also be set (although maxAge overrides it when used in combination).
      // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
      //
      // expires: new Date(Date.now() + 60_000),
      httpOnly: true,
      maxAge: 60,
      path: "/",
      sameSite: "lax",
      // TODO: Generate session secret in env
      secrets: ["s3cret1"],
      // TODO: Generate this based on env
      secure: false,
    },
  });

export { getSession, commitSession, destroySession };
