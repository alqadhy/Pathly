// Components
import { Button } from "../ui/button";

function IconButton({ children }: { children: React.ReactElement }) {
  return (
    <Button
      size="icon"
      className="bg-input w-12 h-12 rounded-full [&_svg]:h-6! [&_svg]:w-6! hover:bg-light-hover"
    >
      {children}
    </Button>
  );
}

export default IconButton;
