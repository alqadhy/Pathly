import { useEffect } from "react";
import YouTube, {
  type YouTubeEvent,
  type YouTubeProps,
} from "react-youtube";

import useLearningPlayerContext from "../../../../hooks/useLearningPlayerContext";

const VideoPlayer = () => {
  const {
    currentLesson,
    currentTime,
    updateTime,
    setDuration,
    player,
    setPlayer,
    completeCurrentLesson,
    goToNextLesson,
  } = useLearningPlayerContext();

  useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      updateTime(player.getCurrentTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [player, updateTime]);

  if (!currentLesson) return null;

  const opts: YouTubeProps["opts"] = {
    width: "100%",
    height: "580",
    playerVars: {
      autoplay: 0,
      rel: 0,
      controls: 1,
      modestbranding: 1,
    },
  };

  const handleReady = (event: YouTubeEvent) => {
    setPlayer(event.target);

    setDuration(event.target.getDuration());

    if (currentTime > 0) {
      event.target.seekTo(currentTime, true);
    }
  };

  const handleStateChange = (event: YouTubeEvent) => {
    if (event.data === 0) {
      completeCurrentLesson();
      goToNextLesson();
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl bg-black">
      <YouTube
        videoId={currentLesson.youtubeId}
        opts={opts}
        onReady={handleReady}
        onStateChange={handleStateChange}
        className="h-[580px] w-full"
        iframeClassName="h-full w-full rounded-3xl"
      />
    </div>
  );
};

export default VideoPlayer;