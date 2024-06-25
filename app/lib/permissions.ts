export class PlayerPermissions {
  private byName: { [index: string]: boolean };

  constructor(names: string[]) {
    this.byName ||= {};
    for (const name of names) {
      this.byName[name] = true;
    }
  }

  has(name: string) {
    return name in this.byName;
  }

  canGrant(name: string) {
    if (name === "grant-all" || name === "revoke-all") {
      return false;
    }

    return this.has("grant-all");
  }

  canRevoke(name: string) {
    if (name === "grant-all" || name === "revoke-all") {
      return false;
    }

    return this.has("revoke-all");
  }
}
