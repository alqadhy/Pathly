import React from "react";
import { PostCard } from "./PostCard";
import { SuggestionsList, type Suggestion } from "./SuggestionList";

interface Props {
  posts: any[];
  suggestions: Suggestion[];
}

const PostsFeed: React.FC<Props> = ({ posts, suggestions }) => {
  const firstStaticPost = posts.find((p) => !p.id.toString().startsWith("p_"));

  return (
    <div className="flex flex-col gap-6 mt-6">
      {posts.map((post) => (
        <React.Fragment key={post.id}>
          {/* Post */}
          <PostCard post={post} />

          {/* post suggestions */}
          {firstStaticPost &&
            post.id === firstStaticPost.id &&
            suggestions &&
            suggestions.length > 0 && (
              <SuggestionsList initialSuggestions={suggestions} />
            )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default PostsFeed;
