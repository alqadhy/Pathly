import type {
  CourseModule,
  CourseLesson,
} from "../../../../types/learning-content.types";

type Props = {
  modules: CourseModule[];

  onChange: (
    modules: CourseModule[]
  ) => void;
};

const CourseContent = ({
  modules,
  onChange,
}: Props) => {

  const addModule = () => {
    const newModule: CourseModule = {
      id: Date.now(),

      title: `Module ${modules.length + 1}`,

      lessons: [
        {
          id: Date.now(),

          title: "",

          description: "",

          youtubeId: "",

          duration: "",

          isPreview: false,
        },
      ],
    };

    onChange([
      ...modules,
      newModule,
    ]);
  };


  const removeModule = (
    moduleId: number
  ) => {
    onChange(
      modules.filter(
        (module) =>
          module.id !== moduleId
      )
    );
  };


  const updateModuleTitle = (
    moduleId: number,
    value: string
  ) => {
    onChange(
      modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              title: value,
            }
          : module
      )
    );
  };


  const addLesson = (
    moduleId: number
  ) => {
    onChange(
      modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,

              lessons: [
                ...module.lessons,

                {
                  id: Date.now(),

                  title: "",

                  description: "",

                  youtubeId: "",

                  duration: "",

                  isPreview: false,
                },
              ],
            }
          : module
      )
    );
  };


const removeLesson = (
  moduleId: number,
  lessonId: number
) => {
  onChange(
    modules.map((module) =>
      module.id === moduleId
        ? {
            ...module,

            lessons: module.lessons.filter(
              (lesson: CourseLesson) =>
                lesson.id !== lessonId
            ),
          }
        : module
    )
  );
};


  const updateLesson = (
  moduleId: number,
  lessonId: number,
  field: string,
  value: any
) => {
  onChange(
    modules.map((module) =>
      module.id === moduleId
        ? {
            ...module,

            lessons: module.lessons.map(
              (lesson: CourseLesson) =>
                lesson.id === lessonId
                  ? {
                      ...lesson,
                      [field]: value,
                    }
                  : lesson
            ),
          }
        : module
    )
  );
  };


  return (
    <div className="space-y-xl rounded-xl bg-card p-xl shadow-card">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-h4 font-bold text-text-primary">
            Course Content
          </h2>

          <p className="text-body-sm text-text-secondary">
            Add modules and video lessons
          </p>
        </div>


        <button
          type="button"
          onClick={addModule}
          className="rounded-lg bg-primary px-lg py-sm text-white"
        >
          Add Module
        </button>

      </div>


      {modules.map((module) => (

        <div
          key={module.id}
          className="space-y-lg rounded-xl border border-border p-lg"
        >

          <div className="flex gap-md">

            <input
              value={module.title}
              onChange={(e) =>
                updateModuleTitle(
                  module.id,
                  e.target.value
                )
              }
              placeholder="Module title"
              className="h-12 flex-1 rounded-lg border px-md"
            />


            <button
              type="button"
              onClick={() =>
                removeModule(
                  module.id
                )
              }
              className="rounded-lg border border-red-500 px-md text-red-500"
            >
              Delete
            </button>

          </div>


          {module.lessons.map(
            (lesson: CourseLesson) => (

            <div
              key={lesson.id}
              className="space-y-md rounded-lg bg-background p-lg"
            >

              <input
                value={lesson.title}
                onChange={(e) =>
                  updateLesson(
                    module.id,
                    lesson.id,
                    "title",
                    e.target.value
                  )
                }
                placeholder="Lesson title"
                className="h-12 w-full rounded-lg border px-md"
              />


              <textarea
                value={lesson.description}
                onChange={(e) =>
                  updateLesson(
                    module.id,
                    lesson.id,
                    "description",
                    e.target.value
                  )
                }
                placeholder="Lesson description"
                className="min-h-24 w-full rounded-lg border p-md"
              />


              <input
                value={lesson.youtubeId}
                onChange={(e) =>
                  updateLesson(
                    module.id,
                    lesson.id,
                    "youtubeId",
                    e.target.value
                  )
                }
                placeholder="YouTube Video ID"
                className="h-12 w-full rounded-lg border px-md"
              />


              <input
                value={lesson.duration}
                onChange={(e) =>
                  updateLesson(
                    module.id,
                    lesson.id,
                    "duration",
                    e.target.value
                  )
                }
                placeholder="Duration (ex: 10:30)"
                className="h-12 w-full rounded-lg border px-md"
              />


              <label className="flex items-center gap-sm">

                <input
                  type="checkbox"
                  checked={
                    lesson.isPreview
                  }
                  onChange={(e) =>
                    updateLesson(
                      module.id,
                      lesson.id,
                      "isPreview",
                      e.target.checked
                    )
                  }
                />

                <span className="text-body-sm">
                  Allow Preview
                </span>

              </label>


              <button
                type="button"
                onClick={() =>
                  removeLesson(
                    module.id,
                    lesson.id
                  )
                }
                className="text-sm text-red-500"
              >
                Delete Lesson
              </button>


            </div>

          ))}


          <button
            type="button"
            onClick={() =>
              addLesson(
                module.id
              )
            }
            className="rounded-lg border border-primary px-lg py-sm text-primary"
          >
            Add Lesson
          </button>


        </div>

      ))}

    </div>
  );
};

export default CourseContent;