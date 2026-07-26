import {
  addNotification,
} from "./notificationStorage";

import { getRecommendedJobs } from "../Services/search.service";
import { getStoredProfile } from "../components/custom/Profile/crud/profileStorage";
import { learningCourses } from "../../public/mocked/learning/learning";
import { getAllPlayerStates } from "../../public/mocked/learning/learningPlayerStorage";

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

export const generateNotifications = () => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "{}"
  );

  if (!currentUser.email) return;

  console.log(
    "GENERATING FOR:",
    currentUser.email
  );

  generateProfileReminder();

  generateLearningReminder(
    currentUser.email
  );

  generateCompletedCourseNotification(
    currentUser.email
  );

  generateCourseRecommendation();

  generateJobRecommendation();
};

const generateProfileReminder = () => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "{}"
  );

  const profileData =
    localStorage.getItem(
      `pathly.profile.${currentUser.email}`
    );

  const profile = profileData
    ? JSON.parse(profileData)
    : null;

  if (!profile) {
    addNotification({
      id: "profile-reminder",
      title: "Complete your profile",
      description:
        "Complete your profile to receive better job and course recommendations.",
      type: "profile",
      targetRoute:
        "/student/profile",
      createdAt:
        new Date().toISOString(),
      isRead:false,
      generated:true,
    });

    return;
  }

  const isComplete =
    profile.about?.trim() &&
    profile.skills?.length &&
    profile.tracks?.length &&
    profile.experience?.length &&
    profile.education?.length &&
    profile.cv;

  if(isComplete) return;

  addNotification({
    id:"profile-reminder",
    title:"Complete your profile",
    description:
      "Complete your profile to receive better job and course recommendations.",
    type:"profile",
    targetRoute:"/student/profile",
    createdAt:
      new Date().toISOString(),
    isRead:false,
    generated:true,
  });
};

const generateLearningReminder = (
  email:string
) => {
  const states =
    getAllPlayerStates().filter(
      item =>
        item.userEmail === email
    );

  states.forEach(state=>{
    const course =
      learningCourses.find(
        item =>
          item.id === state.courseId
      );

    if(!course) return;

    const completed =
      state.completedLessons.length;

    if(
      completed === 0 ||
      completed === course.totalLessons
    )
      return;

    addNotification({
      id:
        `continue-course-${course.id}`,
      title:
        "Continue Learning",
      description:
        `Continue "${course.title}" where you left off.`,
      type:"course",
      image:
        course.image,
      targetId:
        course.id,
      targetRoute:
        "/student/learning",
      createdAt:
        new Date().toISOString(),
      isRead:false,
      generated:true,
    });
  });
};

const generateCompletedCourseNotification = (
  email:string
) => {
  const states =
    getAllPlayerStates().filter(
      item =>
        item.userEmail === email
    );

  states.forEach(state=>{
    const course =
      learningCourses.find(
        item =>
          item.id === state.courseId
      );

    if(!course) return;

    if(
      state.completedLessons.length !==
      course.totalLessons
    )
      return;

    addNotification({
      id:
        `certificate-${course.id}`,
      title:
        "Congratulations 🎉",
      description:
        `You successfully completed "${course.title}".`,
      type:"certificate",
      image:
        course.image,
      targetId:
        course.id,
      targetRoute:
        "/student/learning",
      createdAt:
        new Date().toISOString(),
      isRead:false,
      generated:true,
    });
  });
};

const generateCourseRecommendation = () => {
  const profile =
    getStoredProfile();

  if(!profile) return;

  const tracks =
    profile.tracks?.map(
      track =>
        normalizeTrack(track.name)
    ) ?? [];

  const courses =
    learningCourses.filter(
      course =>
        course.track &&
        tracks.includes(
          normalizeTrack(course.track)
        )
    );

  courses.slice(0,3).forEach(course=>{
    addNotification({
      id:
        `course-recommend-${course.id}`,
      title:
        "New Course Recommendation",
      description:
        `"${course.title}" matches your interests.`,
      type:"course",
      image:
        course.image,
      targetId:
        course.id,
      targetRoute:
        "/student/learning",
      createdAt:
        new Date().toISOString(),
      isRead:false,
      generated:true,
    });
  });
};

const generateJobRecommendation = () => {
  const profile =
    getStoredProfile();

  if(!profile) return;

  const tracks =
    profile.tracks?.map(
      track =>
        normalizeTrack(track.name)
    ) ?? [];

  const jobs =
    getRecommendedJobs(tracks);

  if(!jobs.length) return;

  jobs.slice(0,3).forEach(job=>{
    addNotification({
      id:
        `job-recommend-${job.id}`,
      title:
        "New Job Recommendation",
      description:
        `${job.title} at ${job.company} matches your interests.`,
      type:"job",
      image:
        job.companyLogo,
      targetId:
        job.id,
      targetRoute:
        "/student/jobs",
      createdAt:
        new Date().toISOString(),
      isRead:false,
      generated:true,
    });
  });
};

export const clearGeneratedNotifications = () => {
  return;
};