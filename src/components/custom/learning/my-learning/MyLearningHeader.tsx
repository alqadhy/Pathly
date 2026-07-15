type Props = {
  totalCourses: number;
};

const MyLearningHeader = ({
  totalCourses,
}: Props) => {
  return (
    <div
      className="
        mb-md
        flex
        flex-col
        gap-md
      "
    >
      <h1
        className="
          text-h2
          font-bold
          text-text-primary
          md:text-display
        "
      >
        My Courses
      </h1>

      <div
        className="
          mt-sm
          inline-flex
          w-fit
          items-center
          rounded-xl
          bg-primary/10
          px-lg
          py-sm
        "
      >
        <span
          className="
            text-body-lg
            font-semibold
            text-primary
          "
        >
          {totalCourses}{" "}
          {totalCourses === 1
            ? "Course"
            : "Courses"}{" "}
          Enrolled
        </span>
      </div>
    </div>
  );
};

export default MyLearningHeader;