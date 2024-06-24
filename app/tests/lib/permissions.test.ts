import { describe, test, expect } from "vitest";

import { PlayerPermissions } from "../../lib/permissions";

describe("PlayerPermissions", () => {
  test("has permission returns true and false correctly", () => {
    const names = ["grant-all", "revoke-all"];
    const permissions = new PlayerPermissions(names);

    expect(permissions.has("grant-all")).toBe(true);
    expect(permissions.has("revoke-all")).toBe(true);
    expect(permissions.has("view-all-rooms")).toBe(false);
  });
});
