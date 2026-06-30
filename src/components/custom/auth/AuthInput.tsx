import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AuthInput = ({
  label,
  type = "text",
  value,
  placeholder,
  onChange,
}: Props) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-sm">
      <label className="text-body-sm font-semibold text-text-primary">
        {label}
      </label>

      <div className="relative">
        <input
          type={isPassword ? (show ? "text" : "password") : type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="
            h-[64px]
            w-full
            rounded-xl
            border
            border-border
            bg-background
            px-lg
            pr-12
            text-text-primary
            outline-none
            focus:border-primary
          "
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthInput;