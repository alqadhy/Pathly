import { useMemo, useState } from "react";

import EmptyLearningState from "../../components/custom/learning/EmptyLearningState";
import ContinueLearning from "../../components/custom/learning/ContinueLearning";
import LearningCard from "../../components/custom/learning/LearningCard";

import { learningCourses } from "../../../public/mocked/learning/learning";
import { getAllPlayerStates } from "../../../public/mocked/learning/learningPlayerStorage";

import { getStoredProfile } from "../../components/custom/Profile/crud/profileStorage";

import { Button } from "../../components/ui/button";

const normalizeTrack = (track: string) => {
  switch (track.toLowerCase().trim()) {
    case "artificial intelligence":
      return "ai";

    case "ui/ux design":
      return "ui/ux";

    default:
      return track.toLowerCase().trim();
  }
};

const Learning = () => {
  const [showAll, setShowAll] = useState(false);

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "{}"
  );

  const profile = useMemo(() => getStoredProfile(), []);

  const userTracks =
    profile?.tracks.map((track) =>
      normalizeTrack(track.name)
    ) ?? [];

  const playerStates = useMemo(() => {
    if (!currentUser.email) return [];

    return getAllPlayerStates().filter(
      (item) => item.userEmail === currentUser.email
    );
  }, [currentUser.email]);

  const lastLearningCourse = useMemo(() => {
    if (!playerStates.length) return null;

    const sorted = [...playerStates].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime()
    );

    const latest = sorted[0];

    const course = learningCourses.find(
      (item) => item.id === latest.courseId
    );

    if (!course) return null;

    return {
      ...course,
      progress: latest,
    };
  }, [playerStates]);

  const filteredCourses = useMemo(() => {
    if (!userTracks.length) return learningCourses;

    return learningCourses.filter((course) =>
      userTracks.includes(
        normalizeTrack(course.track)
      )
    );
  }, [userTracks]);

  const displayedCourses = showAll
    ? filteredCourses
    : filteredCourses.slice(0, 6);

return (
  <div className="space-y-2xl p-lg lg:p-2xl">
    {/* HERO */}
    {lastLearningCourse ? (
      <ContinueLearning
        course={lastLearningCourse}
        progress={lastLearningCourse.progress}
      />
    ) : (
      <EmptyLearningState />
    )}

    {/* COURSES */}
    <div className="space-y-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-h3 font-bold text-text-primary">
          Recommended Courses
        </h2>
      </div>

      <div className="grid gap-lg sm:grid-cols-2 xl:grid-cols-3">
        {displayedCourses.map((course) => {
          const state = playerStates.find(
            (item) => item.courseId === course.id
          );

          return (
            <LearningCard
              key={course.id}
              course={course}
              progress={state}
            />
          );
        })}
      </div>

      <div className="mt-2xl flex justify-center">
        <Button
          onClick={() => setShowAll(!showAll)}
          className="h-[68px] min-w-[260px] rounded-xl bg-primary text-body-lg font-bold text-primary-foreground hover:bg-primary-hover active:bg-primary-active"
        >
          {showAll ? "Show Less" : "View All"}
        </Button>
      </div>
    </div>
  </div>
);
};

export default Learning;