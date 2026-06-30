import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpSchema }
from "../../../schemas/auth.schema";
import {
  checkEmailExists,
  signUpUser,
} from "../../../Services/auth.service";
import {
  Eye,
  EyeOff,
  Apple,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
    const [fullName, setFullName] =
  useState("");

const [email, setEmail] =
  useState("");

const [password, setPassword] =
  useState("");

const [
  confirmPassword,
  setConfirmPassword,
] = useState("");

const [countryCode, setCountryCode] =
  useState("+20");

const [phone, setPhone] =
  useState("");

const [errors, setErrors] =
  useState<any>({});

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

const handleSignUp = async () => {

  const formData = {
    fullName,
    email,
    password,
    confirmPassword,
    countryCode,
    phone,
  };

  const result =
    signUpSchema.safeParse(
      formData
    );

  /*  Validation Failed */
  if (!result.success) {

    setErrors(
      result.error.flatten()
        .fieldErrors
    );

    return;
  }

  /*  Validation Success */

  setErrors({});

  /* ---------------- Check Existing Email ---------------- */ 
  const existingUser = await checkEmailExists( email ); 

  if ( existingUser.length > 0 ) { 
    setErrors({ email: [ "You already have an account on this email", ], 
    }); 
    return; 
    }

/* ---------------- Create Account ---------------- */ 

    await signUpUser({ fullName, email, password, countryCode, phone, }); 
    console.log( "Account Created" );
    navigate("/auth");

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
        py-sm
        px-lg
        md:flex-row
      "
    >
      {/* Left Side */}
      <div
        className="
          w-full
          lg:w-1/2
          lg:max-w-[45%]
          lg:text-left
        "
      >
        <div className="space-y-sm">

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
            Create Your Account
          </p>

          <p
            className="
              mx-auto
              max-w-[500px]
              text-body-lg
              leading-relaxed
              text-light-active
              lg:mx-0
            "
          >
            Welcome aboard! Let’s grow your skills and connect you to the right opportunities
          </p>

        </div>
      </div>

      {/* Form */}
      <div
        className="
          w-full
          rounded-md
          bg-card
          py-md
          px-lg
          shadow-card
          lg:w-[45%]
        "
      >
        <div className="space-y-sm">

          {/* Full Name */}
          <div className="space-y-sm">

            <label
              className="
                text-body-sm
                font-semibold
                text-text-primary
              "
            >
              Full Name
            </label>

            <input
            type="text"
            placeholder="Mai Mohamed"
            value={fullName}
            onChange={(e) =>
                setFullName(e.target.value)
            }
            className="
                h-[40px]
                w-full
                rounded-xl
                border
                border-border
                bg-background
                px-lg
                text-body-sm
                text-text-primary
                outline-none
                transition-all
                placeholder:text-normal
                focus:border-primary
            "
            />
            {errors.fullName && (
            <p className="text-red-500 text-sm">
                {errors.fullName[0]}
            </p>
            )}

          </div>

          {/* Email */}
          <div className="space-y-sm">

            <label
              className="
                text-body-sm
                font-semibold
                text-text-primary
              "
            >
              Email
            </label>

            <input
              type="email"
              placeholder="mai@gmail.com"
              className="
                h-[64px]
                w-full
                rounded-xl
                border
                border-border
                bg-background
                px-lg
                text-body-sm
                text-text-primary
                outline-none
                transition-all
                placeholder:text-normal
                focus:border-primary
              "
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }

            />
            {errors.email && (
            <p className="text-red-500 text-sm">
                {errors.email[0]}
            </p>
            )}

          </div>

          {/* Password */}
          <div className="space-y-sm">

            <label
              className="
                text-body-sm
                font-semibold
                text-text-primary
              "
            >
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="**************"
                className="
                  h-[64px]
                  w-full
                  rounded-xl
                  border
                  border-border
                  bg-background
                  px-lg
                  pr-4xl
                  text-body-sm
                  text-text-primary
                  outline-none
                  transition-all
                  placeholder:text-normal
                  focus:border-primary
                "
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                    {errors.password[0]}
                </p>
                )}

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  absolute
                  right-lg
                  top-1/2
                  -translate-y-1/2
                  text-normal
                "
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          {/* Confirm Password */}
          <div className="space-y-sm">

            <label
              className="
                text-body-sm
                font-semibold
                text-text-primary
              "
            >
              Confirm Password
            </label>

            <div className="relative">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="**************"
                className="
                  h-[64px]
                  w-full
                  rounded-xl
                  border
                  border-border
                  bg-background
                  px-lg
                  pr-4xl
                  text-body-sm
                  text-text-primary
                  outline-none
                  transition-all
                  placeholder:text-normal
                  focus:border-primary
                "
                value={confirmPassword}
                onChange={(e) =>
                    setConfirmPassword(e.target.value)
                }
              />
              {errors.confirmPassword  && (
                <p className="text-red-500 text-sm">
                    {errors.confirmPassword [0]}
                </p>
                )}

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="
                  absolute
                  right-lg
                  top-1/2
                  -translate-y-1/2
                  text-normal
                "
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          {/* Phone */}
          <div className="space-y-sm">

            <label
              className="
                text-body-sm
                font-semibold
                text-text-primary
              "
            >
              Phone
            </label>

            <div className="flex gap-sm">

            <input
                type="text"
                value={countryCode}
                onChange={(e) =>
                setCountryCode(
                    e.target.value
                )
                }
                className="
                h-[64px]
                w-[90px]
                rounded-xl
                border
                border-border
                bg-background
                px-md
                text-body-sm
                text-text-primary
                outline-none
                focus:border-primary
                "
            />

            <input
                type="tel"
                placeholder="1000000000"
                value={phone}
                onChange={(e) =>
                setPhone(
                    e.target.value
                )
                }
                className="
                h-[64px]
                flex-1
                rounded-xl
                border
                border-border
                bg-background
                px-lg
                text-body-sm
                text-text-primary
                outline-none
                focus:border-primary
                "
            />

            </div>
            {errors.phone && (
            <p className="text-red-500 text-sm">
                {errors.phone[0]}
            </p>
            )}

          </div>

          {/* Create Account */}
          <button
           onClick={handleSignUp}
            className="
              h-[64px]
              w-full
              rounded-xl
              bg-primary
              text-body-md
              font-semibold
              text-light
              transition-all
              hover:bg-primary-hover
            "
          >
            Create Account
          </button>

          {/* Divider */}
          <div
            className="
              flex
              items-center
              gap-lg
            "
          >
            <div className="h-px flex-1 bg-border" />

            <span
              className="
                text-body-sm
                text-normal
              "
            >
              OR
            </span>

            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Social */}
          <div
            className="
              flex
              items-center
              justify-center
              gap-lg
            "
          >
            {/* Google */}
            <button
              className="
                flex
                h-[60px]
                w-[60px]
                items-center
                justify-center
                rounded-xl
                bg-background
                transition-all
                hover:scale-105
              "
            >
              <FcGoogle size={28} />
            </button>

            {/* Apple */}
            <button
              className="
                flex
                h-[60px]
                w-[60px]
                items-center
                justify-center
                rounded-xl
                bg-background
                transition-all
                hover:scale-105
              "
            >
              <Apple
                size={28}
                className="
                  text-text-primary
                "
              />
            </button>

          </div>

          {/* Login */}
          <p
            className="
              text-center
              text-body-sm
              text-normal
            "
          >
            Already have an account?{" "}

            <button
              onClick={() =>
                navigate("/auth")
              }
              className="
                font-semibold
                text-primary
              "
            >
              Login
            </button>

          </p>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
