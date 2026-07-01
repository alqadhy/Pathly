// Icons
import { LoaderCircle } from "lucide-react";

function Loader() {
  return (
    <div className="flex items-center gap-2">
      <LoaderCircle className="text-primary animate-spin" /> Loading...
    </div>
  );
}

export default Loader;
