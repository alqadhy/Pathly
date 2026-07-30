import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type {
  AddCourseFormData,
  InstructorCourse,
} from "../../../../types/instructor.types";
import { instructorService } from "../../../../Services/instructor.service";
import { APP_ROUTES } from "../../../../constants";

import CourseInfo from "./CourseInfo";
import CourseThumbnail from "./CourseThumbnail";
import LearningObjectives from "./LearningObjectives";
import Assignments from "./Assignments";
import CourseContent from "./CourseContent";
import PublishSection from "./PublishSection";

type Props = {
  isEditing?: boolean;
  courseId?: number;
};
const CourseForm = ({
  isEditing = false,
  courseId,
}: Props) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

const [form, setForm] = useState<AddCourseFormData>({
  title: "",
  description: "",
  category: "",
  level: "Beginner",
  duration: "",
  price: 0,
  image: "",

  learningObjectives: [""],

  assignments: [],

  tasks: [],

  modules: [
    {
      id: 1,
      title: "Introduction",
      lessons: [
        {
          id: 1,
          title: "",
          description: "",
          youtubeId: "",
          duration: "",
          isPreview: false,
        },
      ],
    },
  ],
});

  useEffect(() => {
    if (!isEditing || !courseId) return;

    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "{}"
    );

    if (!currentUser.email) return;

    const course = instructorService.getCourse(
      currentUser.email,
      courseId
    );

    if (!course) return;

setForm({
  title: course.title,
  description: course.description,
  category: course.category ?? "",
  level:
    course.level === "All Levels"
      ? "Beginner"
      : course.level,

  duration: course.duration,

  price: course.price,

  image: course.image,

  learningObjectives: course.learn,

  assignments: [],

  tasks: [],

  modules:
  course.modules?.length
    ? course.modules
    : [
        {
          id: 1,
          title: "Introduction",
          lessons: [
            {
              id: 1,
              title: "",
              description: "",
              youtubeId: "",
              duration: "",
              isPreview: false,
            },
          ],
        },
      ],
});

  }, [isEditing, courseId]);

  const updateField = (
    field: keyof AddCourseFormData,
    value: any
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateArray = (
    field:
      | "learningObjectives"
      | "assignments"
      | "tasks",
    index: number,
    value: string
  ) => {
    const updated = [...form[field]];
    updated[index] = value;

    setForm((prev) => ({
      ...prev,
      [field]: updated,
    }));
  };

  const addItem = (
    field:
      | "learningObjectives"
      | "assignments"
      | "tasks"
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeItem = (
    field:
      | "learningObjectives"
      | "assignments"
      | "tasks",
    index: number
  ) => {
    const updated = [...form[field]];

    updated.splice(index, 1);

    setForm((prev) => ({
      ...prev,
      [field]:
        updated.length > 0
          ? updated
          : [""],
    }));
  };

const buildCourse = (
  published: boolean,
  currentUser: any
): InstructorCourse => ({
  id: isEditing && courseId ? courseId : Date.now(),

  instructorEmail: currentUser.email,

  title: form.title,
  instructor: currentUser.name || "Instructor",

  description: form.description,

  category: form.category,
  track: form.category,

  level: form.level,

  duration: form.duration,

  hasCertificate: true,

  price: form.price,

  image: form.image,

  tag: "New",

  rating: 0,
  reviews: "0",

  students: 0,

  about: form.description,

  learn: form.learningObjectives,
  modules: form.modules,
  totalLessons: form.modules.reduce(
  (total, module) =>
    total + module.lessons.length,
  0
),

  revenue: 0,

  published,
  status: published ? "published" : "draft",

});

const handleSaveDraft = () => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "{}"
  );

  if (!currentUser.email) return;

  const course = buildCourse(
    false,
    currentUser
  );

  if (isEditing) {
    instructorService.updateCourse(
      currentUser.email,
      course
    );
  } else {
    instructorService.addCourse(
      currentUser.email,
      course
    );
  }

  navigate(APP_ROUTES.instructor.myCourses);
};

const handlePublish = async () => {
  try {
    setLoading(true);

    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "{}"
    );

    if (!currentUser.email) return;

    const course = buildCourse(
      true,
      currentUser
    );

    if (isEditing) {
      instructorService.updateCourse(
        currentUser.email,
        course
      );
    } else {
      instructorService.addCourse(
        currentUser.email,
        course
      );
    }

    navigate(APP_ROUTES.instructor.myCourses);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="space-y-2xl">
      <CourseInfo
        title={form.title}
        description={
          form.description
        }
        category={form.category}
        level={form.level}
        duration={form.duration}
        price={form.price}
        onChange={updateField}
      />

      <CourseThumbnail
        image={form.image}
        onChange={(value) =>
          updateField(
            "image",
            value
          )
        }
      />

      <LearningObjectives
        objectives={
          form.learningObjectives
        }
        onAdd={() =>
          addItem(
            "learningObjectives"
          )
        }
        onRemove={(index) =>
          removeItem(
            "learningObjectives",
            index
          )
        }
        onChange={(
          index,
          value
        ) =>
          updateArray(
            "learningObjectives",
            index,
            value
          )
        }
      />

      <Assignments
        assignments={
          form.assignments
        }
        onAdd={() =>
          addItem("assignments")
        }
        onRemove={(index) =>
          removeItem(
            "assignments",
            index
          )
        }
        onChange={(
          index,
          value
        ) =>
          updateArray(
            "assignments",
            index,
            value
          )
        }
      />

      <CourseContent
        modules={form.modules}
        onChange={(modules) =>
          updateField(
            "modules",
            modules
          )
        }
      />

      <PublishSection
        loading={loading}
        onSaveDraft={
          handleSaveDraft
        }
        onPublish={
          handlePublish
        }
      />
    </div>
  );
};

export default CourseForm;