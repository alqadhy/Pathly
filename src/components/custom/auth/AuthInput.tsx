import { useState } from "react";

import {
  Eye,
  EyeOff,
} from "lucide-react";

type Props = {
  label?: string;
  type?: string;
  value: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

const AuthInput = ({
  label,
  type = "text",
  value,
  placeholder,
  error,
  disabled = false,
  onChange,
}: Props) => {

  const [show, setShow] =
    useState(false);

  const isPassword =
    type === "password";

  return (
    <div className="space-y-sm">

      {label && (
        <label
          className="
            text-body-sm
            font-semibold
            text-text-primary
          "
        >
          {label}
        </label>
      )}

      <div className="relative">

        <input
          type={
            isPassword
              ? show
                ? "text"
                : "password"
              : type
          }
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          className={`
            h-[64px]
            md:h-[45px]
            w-full
            rounded-xl
            border
            bg-background
            px-lg
            text-body-md
            text-text-primary
            placeholder:text-normal
            outline-none
            transition-all
            duration-300
            focus:border-primary
            focus:ring-2
            focus:ring-primary-light

            ${
              isPassword
                ? "pr-[52px]"
                : ""
            }

            ${
              error
                ? `
                  border-danger
                  focus:border-danger
                  focus:ring-danger-light
                `
                : "border-border"
            }

            ${
              disabled
                ? `
                  cursor-not-allowed
                  bg-muted
                  text-normal
                  opacity-70
                `
                : ""
            }
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() =>
              setShow(!show)
            }
            disabled={disabled}
            className="
              absolute
              right-md
              top-1/2
              -translate-y-1/2
              text-normal
              transition-colors
              hover:text-primary
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {show ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        )}

      </div>

      {error && (
        <p
          className="
            text-body-sm
            font-medium
            text-danger
          "
        >
          {error}
        </p>
      )}

    </div>
  );
};

export default AuthInput;