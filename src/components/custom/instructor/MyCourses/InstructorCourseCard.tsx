import { Clock3, BookOpen, Star, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../../constants";

type Props = {
  title: string;
  description: string;
  image: string;
  totalLessons: number;
  duration: string;
  students?: number;
  rating: number;
  revenue: number;
  level: string;
  published: boolean;
  category?: string;
  onEdit?: () => void;
};

const InstructorCourseCard = ({
  title,
  description,
  image,
  totalLessons,
  duration,
  students,
  rating,
  revenue,
  level,
  published,
  category,
  onEdit,
}: Props) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-border transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <img src={image} alt={title} className="h-52 w-full object-cover" />

        <span className="absolute left-4 top-4 rounded-full bg-success-light px-3 py-1 text-sm font-medium text-success">
          {published ? "Published" : "Draft"}
        </span>

        <span className="absolute bottom-4 right-4 rounded-full bg-card px-3 py-1 text-sm font-medium text-primary">
          {level}
        </span>
      </div>

      <div className="space-y-4 p-5">
        <div>
            <h3 className="line-clamp-1 text-h5 font-bold text-text-primary">{title}</h3>
            <p className="text-body-sm font-medium text-primary">
                {category}
            </p>

          <p className="mt-2 line-clamp-3 text-body-sm text-text-secondary">{description}</p>
        </div>

        <div className="flex items-center justify-between text-body-sm text-text-secondary">
          <div className="flex items-center gap-2">
            <BookOpen size={18} />
            <span>{totalLessons} Lessons</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock3 size={18} />
            <span>{duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-body-sm">
            <span>
                {students} {students === 1 ? "Student" : "Students"}
            </span>

            <div className="flex items-center gap-1">
                <Star
                    size={16}
                    className="fill-warning text-warning"
                />

                <span className="font-medium text-text-primary">
                    {rating}
                </span>
            </div>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <div>
            <p className="text-xs text-text-secondary">Total Revenue</p>

            <p className="text-h5 font-bold text-primary">{revenue} EGP</p>
          </div>

          {onEdit && (
            <button
              onClick={onEdit}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-medium text-white transition-colors hover:bg-primary-hover"
            >
              <Pencil size={18} />
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorCourseCard;