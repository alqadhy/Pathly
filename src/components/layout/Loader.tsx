// Icons
import { LoaderCircle } from "lucide-react";

// Hooks
import { useLocation } from "react-router-dom";

function Loader() {
  const route = useLocation().pathname;

  return (
    <div
      className={`w-full min-h-screen ${route.startsWith("/auth") && "flex justify-center items-center text-white text-2xl"}`}
    >
      <div className="flex items-center gap-2">
        <LoaderCircle className="text-primary animate-spin" /> Loading...
      </div>
    </div>
  );
}

export default Loader;
