// Icons
import { LoaderCircle } from "lucide-react";

function Loader() {
  return (
    <div className="min-h-screen">
      <div className="flex items-center gap-2">
        <LoaderCircle className="text-primary animate-spin" /> Loading...
      </div>
    </div>
  );
}

export default Loader;
