import RevenueBadge from "./RevenueBadge";

type Props = {
  students: number;
  revenue: number;
  courses: number;
  rating: number;
};

const CourseStats = ({
  students,
  revenue,
  courses,
  rating,
}: Props) => {
  return (
    <div className="grid grid-cols-1 gap-lg md:grid-cols-2 xl:grid-cols-4">
      <RevenueBadge label="Total Students" value={students} />

      <RevenueBadge label="Total Revenue" value={`$${revenue}`} />

      <RevenueBadge label="Published Courses" value={courses} />

      <RevenueBadge label="Average Rating" value={rating} />
    </div>
  );
};

export default CourseStats;