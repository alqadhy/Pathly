import { useState } from "react";

import SettingsSection from "../common/SettingsSection";
import NotificationGroup from "./NotificationGroup";
import NotificationItem from "./NotificationItem";

const NotificationSection = () => {
  const [notifications, setNotifications] =
    useState({
      newMatchingJobs: true,
      recruiterMessages: false,
      savedJobDeadline: true,

      newRecommendedCourses: true,
      courseCompletionReminder: true,
      newLearningPath: false,

      newPosts: true,
      likesComments: true,
      mentions: false,
      newConnections: false,

      careerInsights: true,
      roadmapUpdates: true,
      skillGapReports: true,
      weeklySummary: true,
    });

  const handleToggle = (
    key: keyof typeof notifications,
    checked: boolean
  ) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: checked,
    }));
  };

  return (
    <SettingsSection title="Notifications">
      <div className="space-y-2xl">
        <NotificationGroup title="Job Notifications">
          <NotificationItem
            label="New Matching Jobs"
            checked={
              notifications.newMatchingJobs
            }
            onCheckedChange={(checked) =>
              handleToggle(
                "newMatchingJobs",
                checked
              )
            }
          />

          <NotificationItem
            label="Recruiter Messages"
            checked={
              notifications.recruiterMessages
            }
            onCheckedChange={(checked) =>
              handleToggle(
                "recruiterMessages",
                checked
              )
            }
          />

          <NotificationItem
            label="Saved Job Deadline Reminders"
            checked={
              notifications.savedJobDeadline
            }
            onCheckedChange={(checked) =>
              handleToggle(
                "savedJobDeadline",
                checked
              )
            }
          />
        </NotificationGroup>

        <NotificationGroup title="Course Notifications">
          <NotificationItem
            label="New Recommended Courses"
            checked={
              notifications.newRecommendedCourses
            }
            onCheckedChange={(checked) =>
              handleToggle(
                "newRecommendedCourses",
                checked
              )
            }
          />

          <NotificationItem
            label="Course Completion Reminder"
            checked={
              notifications.courseCompletionReminder
            }
            onCheckedChange={(checked) =>
              handleToggle(
                "courseCompletionReminder",
                checked
              )
            }
          />

          <NotificationItem
            label="New Learning Path"
            checked={
              notifications.newLearningPath
            }
            onCheckedChange={(checked) =>
              handleToggle(
                "newLearningPath",
                checked
              )
            }
          />
        </NotificationGroup>

        <NotificationGroup title="Feed Notifications">
          <NotificationItem
            label="New Posts"
            checked={
              notifications.newPosts
            }
            onCheckedChange={(checked) =>
              handleToggle(
                "newPosts",
                checked
              )
            }
          />

          <NotificationItem
            label="Likes & Comments"
            checked={
              notifications.likesComments
            }
            onCheckedChange={(checked) =>
              handleToggle(
                "likesComments",
                checked
              )
            }
          />

          <NotificationItem
            label="Mentions"
            checked={
              notifications.mentions
            }
            onCheckedChange={(checked) =>
              handleToggle(
                "mentions",
                checked
              )
            }
          />

          <NotificationItem
            label="New Connections"
            checked={
              notifications.newConnections
            }
            onCheckedChange={(checked) =>
              handleToggle(
                "newConnections",
                checked
              )
            }
          />
        </NotificationGroup>

        <NotificationGroup title="AI Notifications">
          <NotificationItem
            label="New Career Insights"
            checked={
              notifications.careerInsights
            }
            onCheckedChange={(checked) =>
              handleToggle(
                "careerInsights",
                checked
              )
            }
          />

          <NotificationItem
            label="Roadmap Updates"
            checked={
              notifications.roadmapUpdates
            }
            onCheckedChange={(checked) =>
              handleToggle(
                "roadmapUpdates",
                checked
              )
            }
          />

          <NotificationItem
            label="Skill Gap Reports"
            checked={
              notifications.skillGapReports
            }
            onCheckedChange={(checked) =>
              handleToggle(
                "skillGapReports",
                checked
              )
            }
          />

          <NotificationItem
            label="Weekly Progress Summary"
            checked={
              notifications.weeklySummary
            }
            onCheckedChange={(checked) =>
              handleToggle(
                "weeklySummary",
                checked
              )
            }
          />
        </NotificationGroup>
      </div>
    </SettingsSection>
  );
};

export default NotificationSection;