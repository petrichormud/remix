export type Player = {
  id: number;
  username: string;
  primaryEmail: string;
  currentCharacter: string;
};

export const players: Player[] = [
  {
    id: 1,
    username: "testify",
    primaryEmail: "email@web.site",
    currentCharacter: "Test",
  },
  {
    id: 2,
    username: "tested",
    primaryEmail: "test@test.com",
    currentCharacter: "",
  },
];
