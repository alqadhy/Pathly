// Type
import type {
  SavedItemsType,
  SavedFeed,
  SavedJob,
  SavedProfile,
  SavedCourse,
} from "../../../types/saved.types";

import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../constants";

// Components
import SavedWrapper from "./SavedWrapper";
import SavedFeedCard from "../SavedFeedCard";
import ProfileCard from "../ProfileCard";
import CourseCard from "../CourseCard";

function SavedResults({
  
  savedItemsCategory,
  savedItems,
}: {
  savedItemsCategory: string;
  savedItems: SavedItemsType;
}) {
  const navigate = useNavigate();
  return (
    <div className="grid gap-lg sm:grid-cols-2 xl:grid-cols-3">
      {savedItemsCategory == "Feeds"
        ? savedItems.feeds.map((feed: SavedFeed) => (
            <SavedWrapper key={feed.id} category="feeds" itemId={feed.id}>
              <SavedFeedCard feed={feed} />
            </SavedWrapper>
          ))
        : savedItemsCategory == "Jobs"
          ? savedItems.jobs.map((job: SavedJob) => (
              <SavedWrapper key={job.id} category="jobs" itemId={job.id}>
                <ProfileCard
                  type="Job"
                  picture={job.companyPic}
                  username={job.jobTitle}
                  headline={job.desc}
                  connections={job.connections}
                />
              </SavedWrapper>
            ))
          : savedItemsCategory == "Profiles"
            ? savedItems.profiles.map((profile: SavedProfile) => (
                <SavedWrapper
                  key={profile.id}
                  category="profiles"
                  itemId={profile.id}
                >
                  <ProfileCard
                    type={"User"}
                    picture={profile.picture}
                    username={profile.name}
                    headline={profile.headline}
                    connections={profile.connections}
                  />
                </SavedWrapper>
              ))
            : savedItems.courses.map((course: SavedCourse) => (
                <SavedWrapper
                  key={course.id}
                  category="courses"
                  itemId={course.id}
                >
<CourseCard
  id={course.id}
  image={course.img}
  title={course.title}
  instructor={course.instructor}
  rating={course.rating}
  reviews={course.review}
  duration={course.duration}
  level={course.level}
  hasCertificate={course.hasCertificate}
  price={course.price}
  tag={course.tag}
  buttonText="View Details"
  onClickFn={() =>
        navigate(
          APP_ROUTES.Learning.courseDetails.replace(
            ":id",
            String(course.id)
          )
        )
      }
/>
                </SavedWrapper>
              ))}
    </div>
  );
}

export default SavedResults;
