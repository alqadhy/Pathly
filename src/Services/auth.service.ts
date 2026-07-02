import {
  getLocalUsers,
  saveLocalUsers,
} from "../utils/storage.service";

interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  countryCode: string;
  phone: string;
  role: string;
}

/* ---------------- Login ---------------- */

export const loginUser =
  async (
    email: string,
    password: string
  ) => {

    const users =
      getLocalUsers();

    return users.filter(
      (user: any) =>
        user.email === email &&
        user.password ===
          password
    );
  };

/* ---------------- Get User By Email ---------------- */

export const getUserByEmail =
  async (email: string) => {

    const users =
      getLocalUsers();

    return users.filter(
      (user: any) =>
        user.email === email
    );
  };

/* ---------------- Check Email ---------------- */

export const checkEmailExists =
  async (email: string) => {

    const users =
      getLocalUsers();

    return users.filter(
      (user: any) =>
        user.email === email
    );
  };

/* ---------------- Sign Up ---------------- */

export const signUpUser =
  async (
    data: SignUpData
  ) => {

    const users =
      getLocalUsers();

    const newUser = {
      id: Date.now(),
      ...data,
    };

    users.push(newUser);

    saveLocalUsers(users);

    return newUser;
  };