import { useState } from "react";

import { resetPasswordSchema } from "../../../schemas/auth.schema";

import AuthButton from "./AuthButton";
import AuthError from "./AuthError";
import AuthInput from "./AuthInput";
import BackButton from "./BackButton";

type Props = {
  setStep: React.Dispatch<
    React.SetStateAction<string>
  >;
};

const ResetPassword = ({
  setStep,
}: Props) => {
  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const getPasswordStrength =
    () => {
      let score = 0;

      if (password.length >= 8)
        score++;

      if (/[A-Z]/.test(password))
        score++;

      if (/[0-9]/.test(password))
        score++;

      if (
        /[^A-Za-z0-9]/.test(
          password
        )
      )
        score++;

      if (score <= 1) {
        return {
          text: "Weak",
          color: "bg-red-500",
          width: "25%",
        };
      }

      if (score <= 3) {
        return {
          text: "Medium",
          color: "bg-yellow-500",
          width: "60%",
        };
      }

      return {
        text: "Strong",
        color: "bg-green-500",
        width: "100%",
      };
    };

  const strength =
    getPasswordStrength();

  const handleSubmit =
    async () => {
      const result =
        resetPasswordSchema.safeParse(
          {
            password,
            confirmPassword,
          }
        );

      if (!result.success) {
        setError(
          result.error.issues[0]
            ?.message ||
            "Validation Error"
        );

        return;
      }

      try {
        setLoading(true);

        setError("");

        const email =
          localStorage.getItem(
            "resetEmail"
          );

        if (!email) {
          setError(
            "Session expired. Please try again."
          );

          return;
        }

        const res =
          await fetch(
            `http://localhost:3000/users?email=${email}`
          );

        const users =
          await res.json();

        if (!users.length) {
          setError(
            "User not found"
          );

          return;
        }

        const user = users[0];

        await fetch(
          `http://localhost:3000/users/${user.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              password,
            }),
          }
        );

        localStorage.removeItem(
          "resetEmail"
        );

        localStorage.removeItem(
          "otp"
        );

        setStep("login");
      } catch {
        setError(
          "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      className="
        flex
        w-full
        flex-col
        items-center
        justify-center
        gap-lg
        py-xl
        px-lg
        md:flex-row
      "
    >
      {/* LEFT SIDE */}
      <div
        className="
          relative
          w-full
          lg:w-1/2
          lg:max-w-[45%]
        "
      >
        <BackButton
          onClick={() =>
            setStep("verify")
          }
        />

        <div className="space-y-lg">
          <p
            className="
              text-[34px]
              font-bold
              leading-none
              tracking-[-2px]
              text-light
              sm:text-[48px]
              lg:text-[64px]
            "
          >
            Reset Your
            <br />
            Password
          </p>

          <p
            className="
              max-w-[500px]
              text-body-lg
              leading-relaxed
              text-light-active
            "
          >
            Create a new strong
            password to secure
            your account.
            Make sure it’s unique
            and hard to guess.
          </p>
        </div>
      </div>

      {/* FORM */}
      <div
        className="
          w-full
          rounded-2xl
          bg-card
          p-2xl
          shadow-card
          lg:w-[40%]
        "
      >
        <div className="space-y-xl">
          <div className="space-y-sm">
            <h2
              className="
                text-[32px]
                font-bold
                text-text-primary
              "
            >
              Reset Password
            </h2>

            <p
              className="
                text-body-sm
                text-normal
              "
            >
              Enter your new
              password below
            </p>
          </div>

          <AuthInput
            label="New Password"
            type="password"
            value={password}
            placeholder="********"
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          {/* Strength */}
          {password && (
            <div className="space-y-2">
              <div
                className="
                  h-2
                  w-full
                  overflow-hidden
                  rounded-full
                  bg-gray-200
                "
              >
                <div
                  className={`h-full transition-all ${strength.color}`}
                  style={{
                    width:
                      strength.width,
                  }}
                />
              </div>

              <p
                className="
                  text-sm
                  text-normal
                "
              >
                Password Strength:{" "}
                <span className="font-semibold">
                  {strength.text}
                </span>
              </p>
            </div>
          )}

          <AuthInput
            label="Confirm Password"
            type="password"
            value={
              confirmPassword
            }
            placeholder="********"
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />

          <AuthError
            message={error}
          />

          <AuthButton
            onClick={
              handleSubmit
            }
          >
            {loading
              ? "Saving..."
              : "Save Password"}
          </AuthButton>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;