import { describe, test, expect } from "vitest";
import { loader } from "../routes/users.reserved.$username";

describe("username reserved loader", async () => {
  test("returns 298 when username is not reserved", async () => {
    const response = await loader({
      request: new Request("https://petrichormud.com/users/reserved/tested"),
      params: { username: "tested" },
      context: {},
    });

    expect(response.status).toBe(298);
  });

  test("returns 299 when username is reserved", async () => {
    const response = await loader({
      request: new Request("https://petrichormud.com/users/reserved/test"),
      params: { username: "test" },
      context: {},
    });

    expect(response.status).toBe(299);
  });
});
