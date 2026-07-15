import { Progress } from "../../../ui/progress";

type Props = {
  completed: number;

  totalLessons: number;
};

const CourseProgress = ({
  completed,
  totalLessons,
}: Props) => {
  const percentage =
    totalLessons === 0
      ? 0
      : (completed /
          totalLessons) *
        100;

  return (
    <div
      className="mb-sm "
    >
      <Progress
        value={percentage}
        className="h-3"
      />

      <div className="mt-md flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          {completed} / {totalLessons} Lessons Completed
        </p>

        <span className="text-sm font-semibold text-primary">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
};

export default CourseProgress;