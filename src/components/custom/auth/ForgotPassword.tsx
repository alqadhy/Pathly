import { useState } from "react";

import { getUserByEmail } from "../../../Services/auth.service";

import AuthButton from "./AuthButton";
import AuthError from "./AuthError";
import AuthInput from "./AuthInput";
import BackButton from "./BackButton";

type Props = {
  setStep: React.Dispatch<
    React.SetStateAction<string>
  >;
};

const ForgotPassword = ({
  setStep,
}: Props) => {
  const [email, setEmail] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSendCode =
    async () => {
      try {
        const users =
          await getUserByEmail(
            email
          );

        if (
          users.length === 0
        ) {
          setError(
            "No account found with this email"
          );

          return;
        }

        setError("");

        const generatedOtp =
          Math.floor(
            100000 +
              Math.random() *
                900000
          ).toString();

        localStorage.setItem(
          "otp",
          generatedOtp
        );

        localStorage.setItem(
          "resetEmail",
          email
        );

        alert(
          `Verification Code: ${generatedOtp}`
        );

        setStep("verify");
      } catch (error) {
        console.log(error);

        setError(
          "Something went wrong"
        );
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
            setStep("login")
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
              lg:text-[58px]
            "
          >
            Forgot Password
          </p>

          <p
            className="
              max-w-[500px]
              text-body-lg
              leading-relaxed
              text-light-active
            "
          >
            Enter your email
            address to receive
            a verification code
          </p>
        </div>
      </div>

      {/* FORM */}
      <div
        className="
          w-full
          rounded-md
          bg-card
          p-2xl
          shadow-card
          lg:w-[40%]
        "
      >
        <div className="space-y-lg">
          <AuthInput
            label="Email"
            type="email"
            value={email}
            placeholder="example@gmail.com"
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <AuthError
            message={error}
          />

          <AuthButton
            onClick={
              handleSendCode
            }
          >
            Send Code
          </AuthButton>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;