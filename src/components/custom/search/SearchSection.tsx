type Props = {
  title: string;
  children: React.ReactNode;
};

const SearchSection = ({ title, children }: Props) => {
  return (
    <div className="space-y-md">
      <h3 className="text-body-lg font-semibold text-text-primary">{title}</h3>
      {children}
    </div>
  );
};

export default SearchSection;