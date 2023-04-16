// Path: src/types/index.ts
// AuthContextType
export type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
};
// Path: src/types/index.ts
// User
export type User = {
  id: number;
  email: string;
  name: string;
};
