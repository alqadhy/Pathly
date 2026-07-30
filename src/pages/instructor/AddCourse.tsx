import CourseForm from "../../components/custom/instructor/AddCourse/CourseForm";

const AddCourse = () => {
  return (
    <section className="space-y-2xl">
      <div>
        <h2 className="text-h2 font-bold text-text-primary">
          Add New Course
        </h2>

        <p className="mt-xs text-body-md text-text-secondary">
          Create and publish a new course for your students.
        </p>
      </div>

      <CourseForm />
    </section>
  );
};

export default AddCourse;