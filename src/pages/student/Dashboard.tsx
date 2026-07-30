import React, { useState, useEffect } from "react";

import studentData from "../../../public/mocked/home/StudentDashboard.json";

import CreatePost from "../../components/custom/home/dashboard/CreatePost";
import PostsFeed from "../../components/custom/home/dashboard/postsfeed/index";
import { StreakWidget } from "../../components/custom/home/dashboard/widgets/StreakWidget";
import { ContinueLearningWidget } from "../../components/custom/home/dashboard/widgets/ContinueLearningWidget";
import { RecommendedJobWidget } from "../../components/custom/home/dashboard/widgets/RecommendedJobWidget";

const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState(() => {
    if (typeof window !== "undefined") {
      const savedPosts = localStorage.getItem("student_feed_posts");
      if (savedPosts) {
        return JSON.parse(savedPosts);
      }
    }
    return studentData.feed.posts;
  });

  // save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("student_feed_posts", JSON.stringify(posts));
  }, [posts]);

  // add post
  const handleNewPostCreated = (newPost: any) => {
    setPosts((prevPosts: any) => [newPost, ...prevPosts]);
  };

  return (
    <div className="w-full bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Feed */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Create Post */}
          <CreatePost onPostCreated={handleNewPostCreated} />

          {/* Posts Feed */}
          <PostsFeed posts={posts} suggestions={studentData.feed.suggestions} />
        </div>

        {/* Widgets */}
        <div className="hidden lg:block lg:col-span-1 space-y-6">
          <StreakWidget />
          <ContinueLearningWidget />
          <RecommendedJobWidget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
