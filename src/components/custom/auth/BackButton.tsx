import { ArrowLeft } from "lucide-react";

type Props = {
  onClick: () => void;
};

const BackButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="
        mb-xl
        flex
        h-[60px]
        w-[60px]
        items-center
        justify-center
        rounded-full
        bg-primary
        text-light
      "
    >
      <ArrowLeft />
    </button>
  );
};

export default BackButton;