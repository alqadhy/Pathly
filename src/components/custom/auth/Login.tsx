import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthButton from "./AuthButton";
import AuthInput from "./AuthInput";
import Divider from "./Divider";
import SocialAuth from "./SocialAuth";
import AuthError from "./AuthError";

import { loginUser } from "../../../Services/auth.service";

type Props = {
  setStep: React.Dispatch<
    React.SetStateAction<string>
  >;
};

const Login = ({
  setStep,
}: Props) => {  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const users = await loginUser(email, password);

      if (users.length > 0) {
        navigate("/student/dashboard");
      } else {
        setError("Incorrect email or password, Please try again");
      }
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-lg py-xl px-lg md:flex-row">

      {/* LEFT */}
      <div className="w-full lg:w-1/2 lg:max-w-[45%]">
        <div className="space-y-lg">
          <p className="text-[58px] font-bold text-light">Login</p>

          <p className="max-w-[500px] text-body-lg text-light-active">
            Welcome back, Show your opportunities
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-[40%] bg-card p-2xl rounded-md shadow-card space-y-lg">

        <AuthInput
          label="Email"
          type="email"
          value={email}
          placeholder="handydonia@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthInput
          label="Password"
          type="password"
          value={password}
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
        />

        <AuthError message={error} />

        <AuthButton onClick={handleLogin}>
          Login
        </AuthButton>

        <button
          onClick={() => setStep("forgot")}
          className="w-full text-center text-body-sm font-medium text-primary"
        >
          Forgot Password?
        </button>

        <Divider />

        <SocialAuth />

        <p className="text-center text-body-sm text-normal">
          You don't have an account?{" "}
          <button
            onClick={() => navigate("/auth/sign-up")}
            className="font-semibold text-primary"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;