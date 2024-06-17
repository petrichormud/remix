import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ params }: LoaderFunctionArgs) {
  const { username } = params;

  const reserved = username === "test";

  const status = reserved ? 299 : 298;

  return new Response(null, {
    status,
    headers: {
      "Content-Length": "0",
    },
  });
}
