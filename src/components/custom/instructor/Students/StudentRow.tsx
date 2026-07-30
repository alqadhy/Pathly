import ProgressBar from "./ProgressBar";

type Props = {
  name: string;
  email: string;
  avatar: string;
  enrolledDate: string;
  progress: number;
  status: "Active" | "Completed" | "Frozen" | "Dropped";
};

const statusClasses = {
  Active: "bg-success-light text-success",
  Completed: "bg-primary-light text-primary",
  Frozen: "bg-warning-light text-warning",
  Dropped: "bg-destructive/10 text-destructive",
};

const StudentRow = ({
  name,
  email,
  avatar,
  enrolledDate,
  progress,
  status,
}: Props) => {
  return (
    <div className="grid grid-cols-[2fr_1.4fr_1fr_1fr] items-center gap-lg px-xl py-lg transition-colors hover:bg-muted/40">
      <div className="flex items-center gap-md">
        <img
          src={avatar}
          alt={name}
          className="h-12 w-12 rounded-full object-cover"
        />

        <div>
          <h4 className="text-body-md font-semibold text-text-primary">
            {name}
          </h4>

          <p className="text-body-sm text-text-secondary">
            {email}
          </p>
        </div>
      </div>

      <p className="text-body-sm text-text-secondary">
        {enrolledDate}
      </p>

      <div className="w-52">
        <ProgressBar progress={progress} />
      </div>

      <div className="flex justify-center">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[status]}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default StudentRow;