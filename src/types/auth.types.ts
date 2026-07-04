export type AuthStep =
  | "login"
  | "signup"
  | "forgot"
  | "verify"
  | "reset"
  | "role";

export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
  countryCode: string;
  phone: string;
  role: string;
}