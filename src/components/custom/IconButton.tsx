// Components
import { Button } from "../ui/button";

function IconButton({
  children,
  title,
  className = "",
}: {
  children: React.ReactElement;
  title: string;
  className?: string;
}) {
  return (
    <Button
      size="icon"
      title={title}
      className={`bg-input w-12 h-12 rounded-full [&_svg]:h-6! [&_svg]:w-6! hover:bg-light-hover ${className}`}
    >
      {children}
    </Button>
  );
}

export default IconButton;
