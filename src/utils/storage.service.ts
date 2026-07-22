const USERS_KEY = "users";

/* ---------------- Get Users ---------------- */

export const getLocalUsers =
  () => {

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