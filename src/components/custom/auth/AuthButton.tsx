type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
};

const AuthButton = ({ children, onClick, type = "button" }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        h-[64px]
        w-full
        rounded-xl
        bg-primary
        text-body-md
        font-semibold
        text-light
        transition-all
        hover:bg-primary-hover
      "
    >
      {children}
    </button>
  );
};

export default AuthButton;