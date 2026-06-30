import {
  useEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";

import Login from "../../components/custom/auth/Login";
import ForgotPassword from "../../components/custom/auth/ForgotPassword";
import VerifyCode from "../../components/custom/auth/VerifyCode";
import ResetPassword from "../../components/custom/auth/ResetPassword";

const AuthFlow = () => {
  const [step, setStep] =
    useState("login");

  const containerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current)
      return;

    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        x: 120,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power3.out",
      }
    );
  }, [step]);

  const renderStep = () => {
    switch (step) {
      case "login":
        return (
          <Login
            setStep={setStep}
          />
        );

      case "forgot":
        return (
          <ForgotPassword
            setStep={setStep}
          />
        );

      case "verify":
        return (
          <VerifyCode
            setStep={setStep}
          />
        );

      case "reset":
        return (
          <ResetPassword
            setStep={setStep}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full"
    >
      {renderStep()}
    </div>
  );
};

export default AuthFlow;