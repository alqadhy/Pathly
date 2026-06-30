import { axiosInstance }
from "../lib/axios";

interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  countryCode: string;
  phone: string;
}

/* ---------------- Login ---------------- */

export const loginUser =
  async (
    email: string,
    password: string
  ) => {

    const response =
      await axiosInstance.get(
        `/users?email=${email}&password=${password}`
      );

    return response.data;
  };
  /* ---------------- get user by Email ---------------- */


  export const getUserByEmail =
  async (email: string) => {

    const response =
      await axiosInstance.get(
        `/users?email=${email}`
      );

    return response.data;
  };

/* ---------------- Check Email ---------------- */

export const checkEmailExists =
  async (email: string) => {

    const response =
      await axiosInstance.get(
        `/users?email=${email}`
      );

    return response.data;
  };

/* ---------------- Sign Up ---------------- */

export const signUpUser =
  async (data: SignUpData) => {

    const response =
      await axiosInstance.post(
        "/users",
        data
      );

    return response.data;
  };
