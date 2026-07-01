type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

const AuthButton = ({
  children,
  onClick,
  type = "button",
  disabled = false,
}: Props) => {

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="
        flex
        h-[55px]
        w-full
        items-center
        justify-center

        rounded-xl

        bg-primary
        px-lg

        text-body-md
        font-semibold
        text-light

        shadow-md
        transition-all
        duration-300

        hover:bg-primary-hover
        active:bg-primary-active

        focus:outline-none
        focus:ring-2
        focus:ring-primary-light

        disabled:cursor-not-allowed
        disabled:bg-normal
        disabled:text-light-active
        disabled:opacity-70
      "
    >
      {children}
    </button>
  );
};

export default AuthButton;