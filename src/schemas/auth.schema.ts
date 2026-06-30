import { z } from "zod";

/* ---------------- Login ---------------- */

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),

  password: z
    .string()
    .min(
      8,
      "Password must be at least 8 characters"
    )
    .regex(
      /[A-Z]/,
      "Password must contain one uppercase letter"
    )
    .regex(
      /[0-9]/,
      "Password must contain one number"
    ),
});

/* ---------------- Sign Up ---------------- */

export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .min(
        3,
        "Full name must be at least 3 characters"
      ),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    password: z
      .string()
      .min(
        8,
        "Password must be at least 8 characters"
      )
      .regex(
        /[A-Z]/,
        "Password must contain one uppercase letter"
      )
      .regex(
        /[0-9]/,
        "Password must contain one number"
      ),

    confirmPassword:
      z.string(),

    countryCode: z
      .string()
      .min(
        1,
        "Country code is required"
      ),

    phone: z
      .string()
      .regex(
        /^[0-9]{10,14}$/,
        "Invalid phone number"
      ),
  })

  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,

    {
      message:
        "Passwords do not match",

      path: [
        "confirmPassword",
      ],
    }
  );

/* ---------------- Reset Password ---------------- */

export const resetPasswordSchema =
  z
    .object({
      password: z
        .string()
        .min(
          8,
          "Password must be at least 8 characters"
        )
        .regex(
          /[A-Z]/,
          "Password must contain one uppercase letter"
        )
        .regex(
          /[0-9]/,
          "Password must contain one number"
        ),

      confirmPassword:
        z.string(),
    })

    .refine(
      (data) =>
        data.password ===
        data.confirmPassword,

      {
        message:
          "Passwords do not match",

        path: [
          "confirmPassword",
        ],
      }
    );
