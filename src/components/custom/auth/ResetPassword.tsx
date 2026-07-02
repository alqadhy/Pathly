import { useState } from "react";

import { resetPasswordSchema } from "../../../schemas/auth.schema";

import {
  getLocalUsers,
  saveLocalUsers,
} from "../../../utils/storage.service";

import type { AuthStep } from "../../../types/auth.types";

import AuthButton from "./AuthButton";
import AuthInput from "./AuthInput";
import AuthError from "./AuthError";
import BackButton from "./BackButton";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<AuthStep>>;
};

type User = {
  id: number;
  fullName: string;
  email: string;
  password: string;
  countryCode: string;
  phone: string;
};

const ResetPassword = ({ setStep }: Props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getPasswordStrength = () => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) {
      return { text: "Weak", color: "bg-danger", width: "25%" };
    }

    if (score <= 3) {
      return { text: "Medium", color: "bg-warning", width: "60%" };
    }

    return { text: "Strong", color: "bg-success", width: "100%" };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      const result = resetPasswordSchema.safeParse({
        password,
        confirmPassword,
      });

      if (!result.success) {
        setError(result.error.issues[0]?.message || "Validation Error");
        return;
      }

      // FIX: use sessionStorage (same flow as verify)
      const email = sessionStorage.getItem("resetEmail");

      if (!email) {
        setError("Session expired. Please try again.");
        return;
      }

      const localUsers = getLocalUsers();

      const updatedUsers = localUsers.map((user: User) =>
        user.email === email
          ? { ...user, password }
          : user
      );

      saveLocalUsers(updatedUsers);

      // cleanup
      sessionStorage.removeItem("resetEmail");
      sessionStorage.removeItem("otp");

      setStep("login");
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled =
    !password ||
    !confirmPassword ||
    password !== confirmPassword ||
    loading;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2xl px-lg py-xl md:flex-row">
      
      {/* LEFT SIDE */}
      <div className="relative w-full lg:w-1/2 lg:max-w-[45%]">
        <BackButton onClick={() => setStep("verify")} />

        <div className="space-y-lg">
          <p className="text-h2 font-bold leading-none tracking-[-2px] text-light sm:text-display">
            Reset Your
            <br />
            Password
          </p>

          <p className="max-w-[500px] text-body-lg leading-relaxed text-light-active">
            Create a new strong password to secure your account.
            Make sure it’s unique and hard to guess.
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="w-full rounded-2xl bg-card p-lg shadow-card sm:p-2xl lg:w-[40%]">
        <div className="space-y-xl">

          <div className="space-y-sm">
            <h2 className="text-h4 font-bold text-text-primary">
              Reset Password
            </h2>
            <p className="text-body-sm text-normal">
              Enter your new password below
            </p>
          </div>

          <AuthInput
            label="New Password"
            type="password"
            value={password}
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
          />

          {password && (
            <div className="space-y-sm">
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                  style={{ width: strength.width }}
                />
              </div>

              <p className="text-body-sm text-normal">
                Password Strength:{" "}
                <span className="font-semibold text-text-primary">
                  {strength.text}
                </span>
              </p>
            </div>
          )}

          <AuthInput
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            placeholder="********"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <AuthError message={error} />

          <AuthButton onClick={handleSubmit} disabled={isDisabled}>
            {loading ? "Saving..." : "Save Password"}
          </AuthButton>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;