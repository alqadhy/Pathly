import {
  useEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";

import { initializeUsers }
from "../../Services/initUsers";

import type {
  AuthStep,
} from "../../types/auth.types";

import Login from "../../components/custom/auth/Login";
import SignUp from "../../components/custom/auth/SignUp";
import ForgotPassword from "../../components/custom/auth/ForgotPassword";
import VerifyCode from "../../components/custom/auth/VerifyCode";
import ResetPassword from "../../components/custom/auth/ResetPassword";
import ChooseRole from "../../components/custom/auth/ChooseRole";

  type Props = {
    initialStep: AuthStep;
  };

  const AuthFlow = ({
    initialStep,
  }: Props) => {

  const [step, setStep] =
    useState<AuthStep>(
      initialStep
    );

  useEffect(() => {

    setStep(initialStep);

  }, [initialStep]);

  const containerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    initializeUsers();

  }, []);

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

      case "signup":
        return (
          <SignUp
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

      case "role":
        return (
          <ChooseRole
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