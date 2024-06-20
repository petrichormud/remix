import type { ActionFunction } from "@remix-run/node";

type ThemeChange = {
  theme?: string;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const { theme }: ThemeChange = Object.fromEntries(form);
  return { theme };
};
