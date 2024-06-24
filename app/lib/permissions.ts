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
}
