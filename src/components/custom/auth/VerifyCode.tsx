import { useEffect, useRef, useState } from "react";

import AuthButton from "./AuthButton";
import AuthError from "./AuthError";
import BackButton from "./BackButton";

import { sendOtpEmail } from "../../../Services/email";

import type { AuthStep } from "../../../types/auth.types";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<AuthStep>>;
};

const VerifyCode = ({ setStep }: Props) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(40);
  const [resendCount, setResendCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const MAX_RESENDS = 5;

  // TIMER
  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  // HANDLE INPUT CHANGE
  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    setError("");

    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1);
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // BACKSPACE NAVIGATION
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // VERIFY OTP
  const handleVerify = async () => {
    try {
      setLoading(true);
      setError("");

      const storedOtp = sessionStorage.getItem("otp");
      const enteredOtp = otp.join("");

      if (enteredOtp.length !== 6) {
        setError("Verification code must be 6 digits");
        return;
      }

      if (!storedOtp) {
        setError("OTP expired, please request a new code");
        return;
      }

      if (enteredOtp !== storedOtp) {
        setError("Invalid verification code");
        return;
      }

      setStep("reset");
    } catch (err) {
      setError("Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  };

  // RESEND OTP
  const handleResendCode = async () => {
    if (resendCount >= MAX_RESENDS) return;

    try {
      const email = sessionStorage.getItem("resetEmail");

      if (!email) {
        setError("Session expired. Go back and try again.");
        return;
      }

      const newOtp = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      await sendOtpEmail({
        email,
        otp: newOtp,
      });

      sessionStorage.setItem("otp", newOtp);

      setResendCount((prev) => prev + 1);
      setSeconds(40);
      setOtp(Array(6).fill(""));
      setError("");

      inputRefs.current[0]?.focus();
    } catch (err) {
      setError("Failed to resend code");
    }
  };

  // FORMAT TIMER
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-xl px-lg py-xl md:flex-row">
      
      {/* LEFT SIDE */}
      <div className="relative w-full lg:w-1/2 lg:max-w-[45%]">
        <BackButton onClick={() => setStep("forgot")} />

        <div className="space-y-md">
          <p className="text-h2 font-bold leading-none tracking-[-2px] text-light sm:text-display">
            Verify Your
            <br />
            Account
          </p>

          <p className="max-w-[500px] text-body-lg leading-relaxed text-light-active">
            We've sent a verification code to your email. Enter the code below
            to continue.
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="w-full rounded-2xl bg-card p-lg shadow-card sm:p-xl lg:w-[40%] lg:p-2xl">
        <div className="space-y-xl">
          
          <p className="text-body-md font-semibold text-text-primary">
            Enter the 6-digit verification code
          </p>

          {/* OTP INPUTS */}
          <div className="flex items-center justify-between gap-sm">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="h-[52px] w-[52px] rounded-xl border border-border bg-background text-center text-body-lg font-semibold text-text-primary outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary-light sm:h-[60px] sm:w-[60px]"
              />
            ))}
          </div>

          <AuthError message={error} />

          {/* TIMER / RESEND */}
          {seconds > 0 ? (
            <p className="text-center text-body-sm text-normal">
              Didn't receive the code?{" "}
              <span className="font-semibold text-primary">
                {formatTime(seconds)}
              </span>
            </p>
          ) : resendCount < MAX_RESENDS ? (
            <button
              type="button"
              onClick={handleResendCode}
              className="w-full text-center text-body-sm font-semibold text-primary transition-all hover:text-primary-hover"
            >
              Resend Code ({MAX_RESENDS - resendCount} left)
            </button>
          ) : (
            <p className="text-center text-body-sm font-medium text-danger">
              Maximum resend attempts reached
            </p>
          )}

          <AuthButton onClick={handleVerify} disabled={loading}>
            {loading ? "Verifying..." : "Verify Code"}
          </AuthButton>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;