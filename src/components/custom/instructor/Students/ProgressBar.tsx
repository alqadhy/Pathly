type Props = {
  progress: number;
};

const ProgressBar = ({ progress }: Props) => {
  return (
    <div className="flex items-center gap-md">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          style={{ width: `${progress}%` }}
          className="h-full rounded-full bg-primary transition-all duration-300"
        />
      </div>

      <span className="min-w-[42px] text-right text-body-sm font-medium text-text-secondary">
        {progress}%
      </span>
    </div>
  );
};

export default ProgressBar;