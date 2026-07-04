const Divider = () => {
  return (
    <div className="flex items-center gap-lg">
      <div className="h-px flex-1 bg-border" />
      <span className="text-body-sm text-normal">
        OR
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
};

export default Divider;