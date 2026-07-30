import { useParams } from "react-router-dom";

import CourseForm from "../../components/custom/instructor/AddCourse/CourseForm";

const EditCourse = () => {
  const { id } = useParams();

  return (
    <section className="space-y-2xl">
      <div>
        <h2 className="text-h2 font-bold text-text-primary">
          Edit Course
        </h2>

        <p className="mt-xs text-body-md text-text-secondary">
          Update your course information.
        </p>
      </div>

      <CourseForm
        courseId={Number(id)}
        isEditing
      />
    </section>
  );
};

export default EditCourse;