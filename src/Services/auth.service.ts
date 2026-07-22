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

export const loginUser = async (
  email: string,
  password: string
) => {
  const localUsers = getLocalUsers();

  console.log("Local Users:", localUsers);

  const response = await fetch("/mocked/users.json");

  console.log(response);

  const adminUsers = await response.json();

  console.log("Admin Users:", adminUsers);

  const users = [...adminUsers, ...localUsers];

  console.log(users);

  return users.filter(
    (user: any) =>
      user.email === email &&
      user.password === password
  );
};

/* ---------------- Get User By Email ---------------- */

export const getUserByEmail = async (
  email: string
) => {
  const localUsers = getLocalUsers();

  const response = await fetch("/users.json");
  const adminUsers = await response.json();

  const users = [...adminUsers, ...localUsers];

  return users.filter(
    (user: any) =>
      user.email === email
  );
};

/* ---------------- Check Email ---------------- */

export const checkEmailExists = async (
  email: string
) => {
  const localUsers = getLocalUsers();

  const response = await fetch("/users.json");
  const adminUsers = await response.json();

  const users = [...adminUsers, ...localUsers];

  return users.filter(
    (user: any) =>
      user.email === email
  );
};

/* ---------------- Sign Up ---------------- */

export const signUpUser = async (
  data: SignUpData
) => {
  const users = getLocalUsers();

  const newUser = {
    id: Date.now(),
    ...data,
  };

  users.push(newUser);

  saveLocalUsers(users);

  return newUser;
};