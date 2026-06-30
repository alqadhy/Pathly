import { FcGoogle } from "react-icons/fc";
import { Apple } from "lucide-react";

const SocialAuth = () => {
  return (
    <div className="flex items-center justify-center gap-lg">
      <button className="flex h-[60px] w-[60px] items-center justify-center rounded-xl bg-background transition hover:scale-105">
        <FcGoogle size={28} />
      </button>

      <button className="flex h-[60px] w-[60px] items-center justify-center rounded-xl bg-background transition hover:scale-105">
        <Apple size={28} className="text-text-primary" />
      </button>
    </div>
  );
};

export default SocialAuth;