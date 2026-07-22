import { Pencil } from "lucide-react";

type Props = {
  onClick?: () => void;
};

const EditButton = ({ onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className=" flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-primary-light active:scale-95
      "
    >
      <Pencil
        size={18}
        className="text-primary"
      />
    </button>
  );
};

export default EditButton;