import { useState } from "react";

import { useNavigate } from "react-router-dom";

import type { AuthStep } from "../../../types/auth.types";

import AuthButton from "./AuthButton";
import AuthInput from "./AuthInput";
import Divider from "./Divider";
import SocialAuth from "./SocialAuth";

import { loginUser } from "../../../Services/auth.service";

type Props = {
  setStep: React.Dispatch<
    React.SetStateAction<AuthStep>
  >;
};

const Login = ({
  setStep,
}: Props) => {
  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin =
    async () => {
      setError("");

      try {
        setLoading(true);

        const users =
          await loginUser(
            email,
            password
          );

        if (users.length > 0) {
          const currentUser = users[0];

          localStorage.setItem(
            "currentUser",
            JSON.stringify(currentUser)
          );

          if (currentUser.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/student/dashboard");
          }
        } else {
          setError(
            "Incorrect email or password"
          );
        }
      } catch (err) {
  console.error(err);
  setError("Something went wrong");

      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      className=" flex w-full flex-col items-center justify-center gap-lg px-lg py-xl md:flex-row
      "
    >
      {/* LEFT */}
      <div
        className="
          w-full
          lg:w-1/2
          lg:max-w-[45%]
        "
      >
        <div className="space-y-lg">
          <p
            className="text-[34px]  font-bold  leading-none  tracking-[-2px]  text-light  sm:text-[48px]  lg:text-[58px]
            "
          >
            Login
          </p>

          <p
            className="
              max-w-[500px]
              text-body-lg
              text-light-active
            "
          >
            Welcome back,Show your opportunities
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div
        className=" w-full rounded-md bg-card p-lg shadow-card space-y-lg sm:p-2xl lg:w-[40%]
        "
      >
        <AuthInput
          label="Email"
          type="email"
          value={email}
          placeholder="handydonia@gmail.com"
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
          error={error}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <AuthButton
          onClick={handleLogin}
          disabled={loading}
        >
          {loading
            ? "Loading..."
            : "Login"}
        </AuthButton>

        <button
          onClick={() =>
            setStep("forgot")
          }
          className=" w-full text-center text-body-sm font-medium text-primary
          "
        >
          Forgot Password?
        </button>

        <Divider />

        <SocialAuth />

        <p
          className="
            text-center
            text-body-sm
            text-normal
          "
        >
          You don't have an
          account?{" "}

          <button
            onClick={() =>
              navigate(
                "/auth/sign-up"
              )
            }
            className="
              font-semibold
              text-primary
            "
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;