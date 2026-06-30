import { useEffect, useState, useRef } from "react";

import AuthButton from "./AuthButton";
import AuthError from "./AuthError";
import BackButton from "./BackButton";

type Props = {
  setStep: React.Dispatch<
    React.SetStateAction<string>
  >;
};

const VerifyCode = ({
  setStep,
}: Props) => {
  const [otp, setOtp] =
    useState<string[]>(
      Array(6).fill("")
    );

  const [error, setError] =
    useState("");

  const [seconds, setSeconds] =
    useState(40);

  const [resendCount, setResendCount] =
    useState(0);

  const inputRefs = useRef<
    (HTMLInputElement | null)[]
  >([]);

  const MAX_RESENDS = 5;

  useEffect(() => {
    if (seconds === 0) return;

    const timer =
      setInterval(() => {
        setSeconds(
          (prev) => prev - 1
        );
      }, 1000);

    return () =>
      clearInterval(timer);
  }, [seconds]);

  const handleChange = (
    value: string,
    index: number
  ) => {
    if (!/^\d*$/.test(value))
      return;

    const newOtp = [...otp];

    newOtp[index] =
      value.slice(-1);

    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[
        index + 1
      ]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[
        index - 1
      ]?.focus();
    }
  };

  const handleVerify = () => {
    const storedOtp =
      localStorage.getItem(
        "otp"
      );

    const enteredOtp =
      otp.join("");

    if (
      enteredOtp.length !== 6
    ) {
      setError(
        "Verification code must be 6 digits"
      );

      return;
    }

    if (
      enteredOtp !== storedOtp
    ) {
      setError(
        "Invalid verification code"
      );

      return;
    }

    setError("");

    setStep("reset");
  };

  const handleResendCode =
    () => {
      if (
        resendCount >=
        MAX_RESENDS
      )
        return;

      const newOtp =
        Math.floor(
          100000 +
            Math.random() *
              900000
        ).toString();

      localStorage.setItem(
        "otp",
        newOtp
      );

      console.log(
        "New OTP:",
        newOtp
      );

      setResendCount(
        (prev) => prev + 1
      );

      setSeconds(40);

      setOtp(
        Array(6).fill("")
      );

      inputRefs.current[0]?.focus();
    };

  const formatTime = (
    totalSeconds: number
  ) => {
    const minutes =
      Math.floor(
        totalSeconds / 60
      );

    const remainingSeconds =
      totalSeconds % 60;

    return `${String(
      minutes
    ).padStart(
      2,
      "0"
    )}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
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
      {/* Left Side */}
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
            setStep("forgot")
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
            Verify Your
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
            We've sent a
            verification code
            to your email.
            Enter the code below
            to continue
          </p>
        </div>
      </div>

      {/* Form */}
      <div
        className="
          w-full
          rounded-2xl
          bg-card
          p-lg
          sm:p-xl
          lg:p-2xl
          shadow-card
          lg:w-[40%]
        "
      >
        <div className="space-y-xl">
          <p
            className="
              text-body-md
              font-semibold
              text-text-primary
            "
          >
            Enter the 6-digit
            code sent to your
            email address
          </p>

          {/* OTP Inputs */}
          <div className="flex justify-between gap-1">
            {otp.map(
              (
                digit,
                index
              ) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[
                      index
                    ] = el;
                  }}
                  type="text"
                  value={digit}
                  maxLength={1}
                  onChange={(e) =>
                    handleChange(
                      e.target.value,
                      index
                    )
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(
                      e,
                      index
                    )
                  }
                  className="
                    h-[48px]
                    w-[48px]
                    sm:h-[56px]
                    sm:w-[56px]
                    md:h-[64px]
                    md:w-[64px]
                    rounded-xl
                    border
                    border-border
                    bg-background
                    text-center
                    text-[24px]
                    font-semibold
                    text-text-primary
                    outline-none
                    transition-all
                    focus:border-primary
                  "
                />
              )
            )}
          </div>

          <AuthError
            message={error}
          />

          {/* Timer */}
          {seconds > 0 ? (
            <p
              className="
                text-center
                text-body-sm
                text-normal
              "
            >
              Didn't receive the
              code?{" "}
              <span
                className="
                  font-semibold
                  text-primary
                "
              >
                {formatTime(
                  seconds
                )}
              </span>
            </p>
          ) : resendCount <
            MAX_RESENDS ? (
            <button
              onClick={
                handleResendCode
              }
              className="
                w-full
                text-center
                font-medium
                text-primary
              "
            >
              Resend Code (
              {MAX_RESENDS -
                resendCount}{" "}
              left)
            </button>
          ) : (
            <p
              className="
                text-center
                font-medium
                text-red-500
              "
            >
              Maximum resend
              attempts reached
            </p>
          )}

          <AuthButton
            onClick={
              handleVerify
            }
          >
            Verify Code
          </AuthButton>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;