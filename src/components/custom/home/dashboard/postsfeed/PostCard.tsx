import React from "react";
// icons
import {
  MoreVertical,
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Send,
} from "lucide-react";
// mock data
import dashboardData from "../../../../../../public/mocked/home/StudentDashboard.json";
// types
import type { PostProps } from "../../../../../types/studentDashboard";

export const PostCard: React.FC<PostProps> = ({ post }) => {
  const currentUser = dashboardData.currentUser;

  return (
    <div className="bg-card border border-border rounded-2xl p-5 md:p-6 shadow-sm flex flex-col w-full">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-border bg-light shrink-0">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-h5  md:text-h4 font-bold leading-tight">
              {post.author.name}
            </h3>
            <p className="text-sm text-normal mt-0.5 max-w-[250px] md:max-w-[350px] line-clamp-2">
              {post.author.headline}
            </p>
            <p className="text-sm text-normal mt-0.5">{post.author.timeAgo}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Follow */}
          <button className="hidden sm:block border border-primary text-primary px-4 py-1 rounded-full text-xs font-bold hover:bg-primary hover:text-white transition-colors">
            Follow
          </button>
          <button className="text-normal hover:text-foreground transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/*  Content  */}
      <div className="mt-4">
        <p className="text-[14px] font-medium text-foreground whitespace-pre-wrap leading-[1.6]">
          {post.content}
        </p>
      </div>

      {/*  Media */}
      {post.image && (
        <div className="mt-4 rounded-xl overflow-hidden bg-light">
          <img
            src={post.image}
            alt="Post media"
            className="w-full h-auto object-cover max-h-[450px]"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between sm:justify-start sm:gap-8 mt-5 mb-4">
        <button className="flex items-center gap-2 text-[14px] font-bold text-normal hover:text-primary transition-colors">
          <ThumbsUp className="w-5 h-5" strokeWidth={1.5} />
          <span className="hidden sm:inline">Like</span>
        </button>
        <button className="flex items-center gap-2 text-[14px] font-bold text-normal hover:text-primary transition-colors">
          <MessageSquare className="w-5 h-5" strokeWidth={1.5} />
          <span className="hidden sm:inline">Comment</span>
        </button>
        <button className="flex items-center gap-2 text-[14px] font-bold text-normal hover:text-primary transition-colors">
          <Repeat2 className="w-5 h-5" strokeWidth={1.5} />
          <span className="hidden sm:inline">Repost</span>
        </button>
        <button className="flex items-center gap-2 text-[14px] font-bold text-normal hover:text-primary transition-colors">
          <Send className="w-5 h-5" strokeWidth={1.5} />
          <span className="hidden sm:inline">Send</span>
        </button>
      </div>

      {/*  Add Comment Input */}
      <div className="flex items-center gap-3 mt-2">
        <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
          <img
            src={currentUser.avatar}
            alt="Current User"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 bg-light border border-border/50 rounded-full px-4 py-2.5 cursor-text hover:bg-slate-100 transition-colors">
          <span className="text-[13px] font-semibold text-normal">
            Add Comment
          </span>
        </div>
      </div>

      {/* Comments List  */}
      {post.comments && post.comments.length > 0 && (
        <div className="mt-5 space-y-5">
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 mt-1">
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-h6 font-bold text-foreground">
                      {comment.author.name}
                    </h4>
                    <p className="text-sm text-normal line-clamp-1 max-w-[200px] md:max-w-[300px]">
                      {comment.author.headline}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-normal">
                    <span>{comment.author.timeAgo}</span>
                    <span>•</span>
                    <button className="text-primary hover:text-primary-dark transition-colors font-bold">
                      + Follow
                    </button>
                  </div>
                </div>
                <p className="text-[13px] font-medium text-foreground mt-1.5">
                  {comment.content}
                </p>
                <div className="flex items-center gap-3 mt-2 text-[11px] font-bold text-normal">
                  <span className="text-foreground">{comment.likes}</span>
                  <button className="hover:text-primary transition-colors">
                    <ThumbsUp className="w-3.5 h-3.5" strokeWidth={2} />
                  </button>
                  <button className="hover:text-primary transition-colors">
                    <MessageSquare className="w-3.5 h-3.5" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
