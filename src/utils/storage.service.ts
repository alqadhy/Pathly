import type { User } from "../types/auth.types";
const USERS_KEY = "users";

/* ---------------- Get Users ---------------- */

export const getLocalUsers = (): User[] => {

    const users =
      localStorage.getItem(
        USERS_KEY
      );

    return users
      ? JSON.parse(users)
      : [];
  };

/* ---------------- Save Users ---------------- */

export const saveLocalUsers =
  (users: any[]) => {

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(users)
    );
  };

  /* ---------------- Update Current User ---------------- */

export const updateCurrentUser = (
  updatedUser: User
) => {
  localStorage.setItem(
    "currentUser",
    JSON.stringify(updatedUser)
  );

  const users = getLocalUsers();

  const updatedUsers = users.map((user: User) =>
    user.id === updatedUser.id
      ? updatedUser
      : user
  );

  saveLocalUsers(updatedUsers);
};

/* ---------------- Get Current User ---------------- */

export const getCurrentUser =
  (): User | null => {
  const user = localStorage.getItem("currentUser");

  return user ? JSON.parse(user) : null;
};