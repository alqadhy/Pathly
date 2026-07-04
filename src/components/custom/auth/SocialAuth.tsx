import { FcGoogle } from "react-icons/fc";

import { Apple } from "lucide-react";

const SocialAuth = () => {

  return (
    <div
      className="
        flex
        items-center
        justify-center
        gap-md
      "
    >

      <button
        type="button"
        className="
          flex
          h-[54px]
          w-[64px]
          items-center
          justify-center
          rounded-xl
          border
          border-border
          bg-background
          transition-all
          hover:border-primary
          hover:bg-primary-light
          active:scale-[0.97]
        "
      >
        <FcGoogle size={28} />
      </button>

      <button
        type="button"
        className="
          flex
          h-[54px]
          w-[64px]
          items-center
          justify-center
          rounded-xl
          border
          border-border
          bg-background
          transition-all
          hover:border-primary
          hover:bg-primary-light
          active:scale-[0.97]
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
  );
};

export default SocialAuth;