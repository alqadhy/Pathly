import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  signUpSchema,
} from "../../../schemas/auth.schema";

import {
  checkEmailExists,
} from "../../../Services/auth.service";

import type {
  AuthStep,
} from "../../../types/auth.types";

import AuthButton from "./AuthButton";
import AuthInput from "./AuthInput";
import AuthError from "./AuthError";
import Divider from "./Divider";
import SocialAuth from "./SocialAuth";

type Props = {
  setStep: React.Dispatch<
    React.SetStateAction<AuthStep>
  >;
};

type SignUpErrors = {
  fullName?: string[];
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
  phone?: string[];
  general?: string[];
};

const SignUp = ({
  setStep,
}: Props) => {

  const navigate =
    useNavigate();

  const [
    fullName,
    setFullName,
  ] = useState("");

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    countryCode,
    setCountryCode,
  ] = useState("+20");

  const [phone, setPhone] =
    useState("");

  const [errors, setErrors] =
    useState<SignUpErrors>(
      {}
    );

  const [loading, setLoading] =
    useState(false);

  const handleSignUp =
    async () => {

      const formData = {
        fullName,
        email,
        password,
        confirmPassword,
        countryCode,
        phone,
      };

      const result =
        signUpSchema.safeParse(
          formData
        );

      if (!result.success) {

        setErrors(
          result.error.flatten()
            .fieldErrors as SignUpErrors
        );

        return;
      }

      setErrors({});

      try {

        setLoading(true);

        const existingUser =
          await checkEmailExists(
            email
          );

        if (
          existingUser.length > 0
        ) {

          setErrors({
            email: [
              "You already have an account with this email",
            ],
          });

          return;
        }

        const pendingUser = {
          fullName,
          email,
          password,
          countryCode,
          phone,
        };

        sessionStorage.setItem(
          "pendingUser",
          JSON.stringify(
            pendingUser
          )
        );

        setStep("role");

      }  catch (err) {

  console.error("Signup Error:", err);

  setErrors({
    general: [
      "Something went wrong",
    ],
  });
      } finally {

        setLoading(false);
      }
    };

  return (
    <div
      className=" flex w-full flex-col items-center justify-center gap-xl px-lg py-sm md:flex-row
      "
    >

      {/* LEFT */}
      <div
        className=" w-full lg:w-1/2 lg:max-w-[45%]
        "
      >

        <div className="space-y-md">

          <p
            className="text-h2 font-bold leading-none tracking-[-2px] text-light sm:text-display
            "
          >
            Create Your
            <br />
            Account
          </p>

          <p
            className="
              max-w-[500px]
              text-body-lg
              leading-relaxed
              text-light-active
            "
          >
            Welcome aboard!
            Let’s grow your
            skills and connect
            you to the right
            opportunities
          </p>

        </div>
      </div>

      {/* FORM */}
      <div
        className=" w-full rounded-xl bg-card p-lg shadow-card sm:p-md lg:w-[45%]
        "
      >

        <div className="space-y-md">

          <AuthInput
            label="Full Name"
            type="text"
            value={fullName}
            placeholder="Mai Mohamed"
            error={
              errors.fullName?.[0]
            }
            onChange={(e) =>
              setFullName(
                e.target.value
              )
            }
          />

          <AuthInput
            label="Email"
            type="email"
            value={email}
            placeholder="mai@gmail.com"
            error={
              errors.email?.[0]
            }
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <AuthInput
            label="Password"
            type="password"
            value={password}
            placeholder="********"
            error={
              errors.password?.[0]
            }
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <AuthInput
            label="Confirm Password"
            type="password"
            value={
              confirmPassword
            }
            placeholder="********"
            error={
              errors
                .confirmPassword?.[0]
            }
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />

          {/* PHONE */}
          <div className="space-y-sm">

            <label
              className="
                text-body-sm
                font-semibold
                text-text-primary
              "
            >
              Phone
            </label>

            <div className="flex gap-sm">

              <input
                type="text"
                value={
                  countryCode
                }
                onChange={(e) =>
                  setCountryCode(
                    e.target.value
                  )
                }
                className=" h-[64px] w-[90px] rounded-xl border border-border bg-background px-md text-body-sm text-text-primary outline-none transition-all focus:border-primary
                "
              />

              <input
                type="tel"
                placeholder="1000000000"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
                className=" h-[64px] flex-1 rounded-xl border border-border bg-background px-lg text-body-sm text-text-primary outline-none transition-all focus:border-primary
                "
              />

            </div>

            <AuthError
              message={
                errors.phone?.[0]
              }
            />

          </div>

          <AuthError
            message={
              errors.general?.[0]
            }
          />

          <AuthButton
            onClick={
              handleSignUp
            }
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </AuthButton>

          <Divider />

          <SocialAuth />

          <p
            className="
              text-center
              text-body-sm
              text-normal
            "
          >
            Already have an
            account?{" "}

            <button
              onClick={() =>
                navigate("/auth")
              }
              className="
                font-semibold
                text-primary
                transition-all
                hover:text-primary-hover
              "
            >
              Login
            </button>

          </p>

        </div>
      </div>
    </div>
  );
};

export default SignUp;