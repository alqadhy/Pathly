import VideoPlayer from "./VideoPlayer";
import PlayerNavigation from "./PlayerNavigation";
import CurrentLessonInfo from "./CurrentLessonInfo";
import LearningInstructor from "../details/LearningInstructor";

const CoursePlayer = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-black shadow-card">
      <VideoPlayer />

      <div className="border-t border-white/10 bg-black px-lg py-md">
        <PlayerNavigation />
      </div>
    </div>
  );
};

export default CoursePlayer;