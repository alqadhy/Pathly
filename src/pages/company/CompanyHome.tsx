import { useState, useEffect } from "react";
import dashboardData from "../../../public/mocked/home/CompanyDashboard.json";

import CreatePost from "../../components/custom/home/dashboard/CreatePost";
import { PostCard } from "../../components/custom/home/dashboard/postsfeed/PostCard";
import UpcomingInterviewsWidget from "../../components/custom/company-home/UpcomingInterviewsWidget";
import SuggestionsList from "./../../components/custom/home/dashboard/postsfeed/SuggestionList";

export default function CompanyHome() {
  const [posts, setPosts] = useState(() => {
    if (typeof window !== "undefined") {
      const savedPosts = localStorage.getItem("company_feed_posts");
      if (savedPosts) {
        return JSON.parse(savedPosts);
      }
    }
    return dashboardData.feed.posts;
  });

  const suggestions = dashboardData.feed.suggestions;

  useEffect(() => {
    localStorage.setItem("company_feed_posts", JSON.stringify(posts));
  }, [posts]);

  const handleNewPostCreated = (newPost: any) => {
    setPosts((prevPosts: any) => [newPost, ...prevPosts]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Main Feed Section */}
      <div className="lg:col-span-8 space-y-6">
        {/* Create Post */}
        <CreatePost onPostCreated={handleNewPostCreated} />

        {/*  Posts Feed */}
        <div className="space-y-6">
          {posts.map((post: any, index: number) => (
            <div key={post.id} className="space-y-6">
              <PostCard post={post} />

              {/* Suggestions List */}
              {post.id === dashboardData.feed.posts[0].id && (
                <SuggestionsList initialSuggestions={suggestions} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar Widget */}
      <div className="lg:col-span-4 space-y-4">
        <UpcomingInterviewsWidget />
      </div>
    </div>
  );
}
