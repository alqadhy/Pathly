import { ArrowLeft } from "lucide-react";

type Props = {
  onClick: () => void;
};

const BackButton = ({
  onClick,
}: Props) => {

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
        shadow-md
        transition-all
        duration-300
        hover:bg-primary-hover
        hover:scale-105
        active:bg-primary-active
        active:scale-95
        focus:outline-none
        focus:ring-2
        focus:ring-primary-light
      "
    >
      <ArrowLeft size={24} />
    </button>
  );
};

export default BackButton;