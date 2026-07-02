// Components
import { Button } from "../ui/button";

function IconButton({
  children,
  title,
  className = "",
  onClickFn = () => {},
}: {
  children: React.ReactElement;
  title: string;
  className?: string;
  onClickFn?: () => void;
}) {
  return (
    <Button
      size="icon"
      title={title}
      className={`bg-input w-12 h-12 rounded-full [&_svg]:h-6! [&_svg]:w-6! hover:bg-light-hover ${className}`}
      onClick={() => onClickFn()}
    >
      {children}
    </Button>
  );
}

export default IconButton;
