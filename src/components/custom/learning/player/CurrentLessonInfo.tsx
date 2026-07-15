import useLearningPlayerContext from "../../../../hooks/useLearningPlayerContext";

const CurrentLessonInfo = () => {
  const { currentLesson } = useLearningPlayerContext();

  if (!currentLesson) return null;

  return (
    <div className="p-lg">
      {/* Header */}
      <div className="mb-md flex flex-col gap-md md:flex-row md:items-center md:justify-between">
        <p className="flex-1 text-2xl font-bold text-text-primary md:text-3xl xl:text-4xl">
          {currentLesson.title}
        </p>

        <button className="shrink-0 rounded-full border border-primary bg-primary px-lg py-sm text-base font-semibold text-white transition hover:bg-white hover:text-primary md:px-xl md:py-md md:text-xl">
          Overview
        </button>
      </div>

      {/* Description */}
      <p className="text-body-md text-text-secondary">
        {currentLesson.description}
      </p>

      {/* Meta */}
      <div className="mt-md flex flex-wrap items-center gap-lg text-sm text-text-secondary">
        <span>Lesson {currentLesson.order}</span>

        <span>•</span>

        <span>{currentLesson.duration}</span>

        {currentLesson.isPreview && (
          <>
            <span>•</span>

            <span className="font-medium text-primary">
              Preview
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default CurrentLessonInfo;