import { FcGoogle } from "react-icons/fc";
import { Apple } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../constants";
import { signInWithGoogle } from "../../../Services/firebaseAuth.service";

const SocialAuth = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );

      navigate(APP_ROUTES.student.dashboard);
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center gap-md">
      {/* Google */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="flex h-[54px] w-[64px] items-center justify-center rounded-xl border border-border bg-background transition-all hover:border-primary hover:bg-primary-light active:scale-[0.97]"
      >
        <FcGoogle size={28} />
      </button>

      {/* Apple */}
      <button
        type="button"
        className="flex h-[54px] w-[64px] items-center justify-center rounded-xl border border-border bg-background transition-all hover:border-primary hover:bg-primary-light active:scale-[0.97]"
      >
        <Apple
          size={28}
          className="text-text-primary"
        />
      </button>
    </div>
  );
};

export default SocialAuth;