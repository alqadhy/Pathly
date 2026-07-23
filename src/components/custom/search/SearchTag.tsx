type Props = {
  title: string;
  onClick?: () => void;
};

const SearchTag = ({
  title,
  onClick,
}: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full bg-primary/10 px-md py-xs text-body-sm text-primary transition-colors hover:bg-primary hover:text-white"
    >
      {title}
    </button>
  );
};

export default SearchTag;