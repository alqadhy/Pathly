import useLearningPlayerContext from "../../../../hooks/useLearningPlayerContext";

const CurrentLessonInfo = () => {
  const { currentLesson } = useLearningPlayerContext();

  if (!currentLesson) return null;

  return (
    <div className="p-lg">
      {/* Header */}
      <div className="mb-md flex flex-col gap-md md:flex-row md:items-center md:justify-between">
        <p className="flex-1 text-h3 font-bold text-text-primary md:text-h2 xl:text-h1">
          {currentLesson.title}
        </p>

        <button className="shrink-0 rounded-full border border-primary bg-primary px-lg py-sm text-body-md font-semibold text-white transition hover:bg-white hover:text-primary md:px-xl md:py-md md:text-[20px]">
          Overview
        </button>
      </div>

      {/* Description */}
      <p className="text-body-md text-text-secondary">
        {currentLesson.description}
      </p>

      {/* Meta */}
      <div className="mt-md flex flex-wrap items-center gap-lg text-body-sm text-text-secondary">
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