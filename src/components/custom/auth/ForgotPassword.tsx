import { useState } from "react";

import { getUserByEmail } from "../../../Services/auth.service";
import { sendOtpEmail } from "../../../Services/email";
import { generateOtp } from "../../../lib/otp";

import type { AuthStep } from "../../../types/auth.types";

import AuthButton from "./AuthButton";
import AuthInput from "./AuthInput";
import BackButton from "./BackButton";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<AuthStep>>;
};

const ForgotPassword = ({ setStep }: Props) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    try {
      setLoading(true);
      setError("");

      // 1. check user exists
      const users = await getUserByEmail(email);

      if (!users || users.length === 0) {
        setError("No account found with this email");
        return;
      }

      // 2. generate OTP
      const generatedOtp = generateOtp();

      // 3. send email via EmailJS
      await sendOtpEmail({
        email,
        otp: generatedOtp,
      });

      // 4. store only email + otp temporarily (better than alert)
      sessionStorage.setItem("resetEmail", email);
      sessionStorage.setItem("otp", generatedOtp);

      // 5. go to verify step
      setStep("verify");
    } catch (err) {
      console.log(err);
      setError("Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-lg px-lg py-xl md:flex-row">
      {/* LEFT SIDE */}
      <div className="relative w-full lg:w-1/2 lg:max-w-[45%]">
        <BackButton onClick={() => setStep("login")} />

        <div className="space-y-lg">
          <p className="text-[34px] font-bold leading-none tracking-[-2px] text-light sm:text-[48px] lg:text-[58px]">
            Forgot Password
          </p>

          <p className="max-w-[500px] text-body-lg leading-relaxed text-light-active">
            Enter your email address to receive a verification code
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="w-full rounded-md bg-card p-lg shadow-card sm:p-2xl lg:w-[40%]">
        <div className="space-y-lg">
          <AuthInput
            label="Email"
            type="email"
            value={email}
            placeholder="example@gmail.com"
            error={error}
            onChange={(e) => setEmail(e.target.value)}
          />

          <AuthButton onClick={handleSendCode} disabled={loading}>
            {loading ? "Sending..." : "Send Code"}
          </AuthButton>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;