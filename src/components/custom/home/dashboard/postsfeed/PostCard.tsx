import React, { useState, useRef, useEffect } from "react";
// icons
import {
  MoreVertical,
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Send,
  CheckCircle2,
} from "lucide-react";
// mock data
import dashboardData from "../../../../../../public/mocked/home/StudentDashboard.json";
// types
import type { PostProps } from "../../../../../types/studentDashboard";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../ui/dialog";

const sendConnections = [
  {
    id: 1,
    name: "Menna Mohamed",
    role: "Software Engineer",
    avatar: "/src/assets/imgs/home/Profile/img3.png",
  },
  {
    id: 2,
    name: "Mohamed Fawzei",
    role: "Frontend Developer",
    avatar: "/src/assets/imgs/home/Profile/img2.png",
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "UI/UX Designer",
    avatar: "/src/assets/imgs/home/Profile/img1.png",
  },
  {
    id: 4,
    name: "Abdelrahman Khaled",
    role: "Frontend Developer",
    avatar: "/src/assets/imgs/avatar_placeholder.png",
  },
];

const generateMockComments = () => [
  {
    id: `mc_1_${Math.random()}`,
    author: {
      name: "Menna Mohamed",
      avatar: "/src/assets/imgs/home/Profile/img3.png",
      headline: "Software Engineer",
      timeAgo: "2h",
    },
    content: "Great insights! Thanks for sharing this.",
    likes: Math.floor(Math.random() * 15) + 1,
    isUserLiked: false,
    isFollowing: false,
    isFollowHidden: false,
    isReply: false,
  },
  {
    id: `mc_2_${Math.random()}`,
    author: {
      name: "Aisha Patel",
      avatar: "/src/assets/imgs/home/Profile/img1.png",
      headline: "UI/UX Designer",
      timeAgo: "5h",
    },
    content: "Totally agree with your perspective here. Keep it up!",
    likes: Math.floor(Math.random() * 10) + 1,
    isUserLiked: false,
    isFollowing: false,
    isFollowHidden: false,
    isReply: false,
  },
  {
    id: `mc_3_${Math.random()}`,
    author: {
      name: "Mohamed Fawzei",
      avatar: "/src/assets/imgs/home/Profile/img2.png",
      headline: "Frontend Developer",
      timeAgo: "1d",
    },
    content: "Awesome work! Looking forward to seeing more.",
    likes: Math.floor(Math.random() * 20) + 2,
    isUserLiked: false,
    isFollowing: false,
    isFollowHidden: false,
    isReply: false,
  },
];

export const PostCard: React.FC<PostProps> = ({ post }) => {
  const currentUser = dashboardData.currentUser;

  const isNewPost =
    post.author.timeAgo === "Just now" || post.id.toString().startsWith("p_");
  const isMyPost = currentUser.name === post.author.name;

  // States with LocalStorage Persistence

  const [isFollowingPost, setIsFollowingPost] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(`post_${post.id}_isFollowing`) === "true";
    }
    return false;
  });

  const [isLiked, setIsLiked] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(`post_${post.id}_isLiked`) === "true";
    }
    return false;
  });

  const [likesCount, setLikesCount] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`post_${post.id}_likes`);
      if (saved !== null) return parseInt(saved, 10);
    }
    if (isNewPost) return 0;
    return Math.floor(Math.random() * 140) + 10;
  });

  const [comments, setComments] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`post_${post.id}_comments`);
      if (saved) return JSON.parse(saved);
    }

    if (isNewPost) return [];
    if (post.comments && post.comments.length > 0)
      return post.comments.map((c) => ({
        ...c,
        isUserLiked: false,
        isFollowing: false,
        isFollowHidden: false,
        isReply: false,
      }));
    return generateMockComments();
  });

  // Sync States to LocalStorage automatically

  useEffect(() => {
    localStorage.setItem(
      `post_${post.id}_isFollowing`,
      isFollowingPost.toString(),
    );
  }, [isFollowingPost, post.id]);

  useEffect(() => {
    localStorage.setItem(`post_${post.id}_isLiked`, isLiked.toString());
    localStorage.setItem(`post_${post.id}_likes`, likesCount.toString());
  }, [isLiked, likesCount, post.id]);

  useEffect(() => {
    localStorage.setItem(`post_${post.id}_comments`, JSON.stringify(comments));
  }, [comments, post.id]);

  const [commentText, setCommentText] = useState("");
  const [replyingToId, setReplyingToId] = useState<string | null>(null);

  const [showRepostToast, setShowRepostToast] = useState(false);
  const [sendToastMessage, setSendToastMessage] = useState<string | null>(null);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  const commentInputRef = useRef<HTMLInputElement>(null);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleCommentClick = () => {
    setReplyingToId(null);
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

  const handleRepost = () => {
    setShowRepostToast(true);
    setTimeout(() => setShowRepostToast(false), 3000);
  };

  const handleSend = () => setIsSendModalOpen(true);

  const handleSendToUser = (userName: string) => {
    setIsSendModalOpen(false);
    setSendToastMessage(`Sent to ${userName}`);
    setTimeout(() => setSendToastMessage(null), 3000);
  };

  //  Add coment, Like, Follow, Reply functionalities for comments
  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: "c_" + Date.now(),
      author: {
        name: currentUser.name,
        avatar: currentUser.avatar,
        headline: "Technology Company",
        timeAgo: "Just now",
      },
      content: commentText,
      likes: 0,
      isUserLiked: false,
      isFollowing: false,
      isFollowHidden: false,
      isReply: replyingToId !== null,
    };

    let updatedComments = [...comments];
    // replay on comment
    if (replyingToId) {
      const targetIndex = updatedComments.findIndex(
        (c) => c.id === replyingToId,
      );
      if (targetIndex !== -1) {
        updatedComments.splice(targetIndex + 1, 0, newComment);
      } else {
        updatedComments.unshift(newComment);
      }
    } else {
      updatedComments.unshift(newComment);
    }

    setComments(updatedComments);
    setCommentText("");
    setReplyingToId(null);
  };

  const handleCommentLikeToggle = (commentId: string) => {
    setComments((prevComments) =>
      prevComments.map((c) => {
        if (c.id === commentId) {
          return {
            ...c,
            isUserLiked: !c.isUserLiked,
            likes: c.isUserLiked ? c.likes - 1 : c.likes + 1,
          };
        }
        return c;
      }),
    );
  };

  // Follow/Following
  const handleCommentFollowToggle = (commentId: string) => {
    setComments((prevComments) =>
      prevComments.map((c) => {
        if (c.id === commentId) {
          return { ...c, isFollowing: true };
        }
        return c;
      }),
    );

    setTimeout(() => {
      setComments((prevComments) =>
        prevComments.map((c) => {
          if (c.id === commentId) {
            return { ...c, isFollowHidden: true };
          }
          return c;
        }),
      );
    }, 3000);
  };

  const handleCommentReply = (commentId: string, authorName: string) => {
    setCommentText(`@${authorName} `);
    setReplyingToId(commentId);
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 md:p-6 shadow-sm flex flex-col w-full relative">
      {/* Toast Repost */}
      {showRepostToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl flex items-center gap-2 z-[100] animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5" />
          Reposted successfully!
        </div>
      )}

      {/* Toast Send */}
      {sendToastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl flex items-center gap-2 z-[100] animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5" />
          {sendToastMessage}
        </div>
      )}

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
            <h3 className="text-h5 md:text-h4 font-bold leading-tight">
              {post.author.name}
            </h3>
            <p className="text-sm text-normal mt-0.5 max-w-[250px] md:max-w-[350px] line-clamp-2">
              {post.author.headline}
            </p>
            <p className="text-sm text-normal mt-0.5">{post.author.timeAgo}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {!isMyPost && (
            <button
              onClick={() => setIsFollowingPost(!isFollowingPost)}
              className={`hidden sm:block border px-4 py-1 rounded-full text-xs font-bold transition-colors ${
                isFollowingPost
                  ? "border-normal text-normal hover:border-danger hover:text-danger hover:bg-danger/10"
                  : "border-primary text-primary hover:bg-primary hover:text-white"
              }`}
            >
              {isFollowingPost ? "Following" : "+ Follow"}
            </button>
          )}
          <button className="text-normal hover:text-foreground transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">
        <p className="text-[14px] font-medium text-foreground whitespace-pre-wrap leading-[1.6]">
          {post.content}
        </p>
      </div>

      {/* Media */}
      {post.image && (
        <div className="mt-4 rounded-xl overflow-hidden bg-light">
          <img
            src={post.image}
            alt="Post media"
            className="w-full h-auto object-cover max-h-[450px]"
          />
        </div>
      )}

      {(post as any).video && (
        <div className="mt-4 rounded-xl overflow-hidden bg-black flex justify-center">
          <video
            src={(post as any).video}
            controls
            className="w-full h-auto max-h-[450px]"
          />
        </div>
      )}

      {(post as any).file && (
        <div className="mt-4 rounded-xl overflow-hidden bg-light h-[400px]">
          <iframe
            src={`${(post as any).file}#toolbar=0`}
            title={(post as any).fileName || "Document"}
            className="w-full h-full bg-white"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between sm:justify-start sm:gap-8 border-t border-border/40 pt-3 pb-3 mt-5">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-[14px] font-bold transition-colors ${isLiked ? "text-primary" : "text-normal hover:text-primary"}`}
        >
          <ThumbsUp
            className="w-5 h-5"
            strokeWidth={1.5}
            fill={isLiked ? "currentColor" : "none"}
          />
          <span className="hidden sm:inline">Like</span>
          {likesCount > 0 && (
            <span className="text-[13px] ml-0.5">{likesCount}</span>
          )}
        </button>

        <button
          onClick={handleCommentClick}
          className="flex items-center gap-2 text-[14px] font-bold text-normal hover:text-primary transition-colors"
        >
          <MessageSquare className="w-5 h-5" strokeWidth={1.5} />
          <span className="hidden sm:inline">Comment</span>
        </button>

        <button
          onClick={handleRepost}
          className="flex items-center gap-2 text-[14px] font-bold text-normal hover:text-primary transition-colors"
        >
          <Repeat2 className="w-5 h-5" strokeWidth={1.5} />
          <span className="hidden sm:inline">Repost</span>
        </button>

        <button
          onClick={handleSend}
          className="flex items-center gap-2 text-[14px] font-bold text-normal hover:text-primary transition-colors"
        >
          <Send className="w-5 h-5" strokeWidth={1.5} />
          <span className="hidden sm:inline">Send</span>
        </button>
      </div>

      {/* Add Comment Input */}
      <div className="flex items-center gap-3 mt-2">
        <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
          <img
            src={currentUser.avatar}
            alt="Current User"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 bg-light border border-border/50 rounded-full px-4 py-1.5 hover:bg-slate-100 transition-colors focus-within:ring-1 focus-within:ring-primary focus-within:bg-background">
          <input
            ref={commentInputRef}
            type="text"
            placeholder="Add Comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
            className="w-full bg-transparent border-none outline-none text-[13px] font-medium text-foreground placeholder:text-normal py-1"
          />
        </div>
        {commentText.trim() && (
          <button
            onClick={handleAddComment}
            className="text-primary font-bold text-sm hover:text-primary-dark"
          >
            Comment
          </button>
        )}
      </div>

      {/* Comments List */}
      {comments && comments.length > 0 && (
        <div className="mt-5 space-y-5 border-t border-border/40 pt-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className={`flex gap-3 ${comment.isReply ? 'ml-10 md:ml-12 mt-3 relative before:absolute before:content-[""] before:w-6 before:h-px before:bg-border before:-left-8 before:top-5' : ""}`}
            >
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

                    {!comment.isFollowHidden &&
                      comment.author.name !== currentUser.name && (
                        <>
                          <span>•</span>
                          <button
                            onClick={() =>
                              handleCommentFollowToggle(comment.id)
                            }
                            className={`font-bold transition-colors ${
                              comment.isFollowing
                                ? "text-normal"
                                : "text-primary hover:text-primary-dark"
                            }`}
                          >
                            {comment.isFollowing ? "Following" : "+ Follow"}
                          </button>
                        </>
                      )}
                  </div>
                </div>
                <p className="text-[13px] font-medium text-foreground mt-1.5">
                  {comment.content}
                </p>

                {/* Comment Actions */}
                <div className="flex items-center gap-3 mt-2 text-[11px] font-bold text-normal">
                  <span className="text-foreground">
                    {comment.likes > 0 ? comment.likes : ""}
                  </span>
                  <button
                    onClick={() => handleCommentLikeToggle(comment.id)}
                    className={`hover:text-primary transition-colors ${comment.isUserLiked ? "text-primary" : ""}`}
                  >
                    <ThumbsUp
                      className="w-3.5 h-3.5"
                      strokeWidth={2}
                      fill={comment.isUserLiked ? "currentColor" : "none"}
                    />
                  </button>
                  <button
                    onClick={() =>
                      handleCommentReply(comment.id, comment.author.name)
                    }
                    className="hover:text-primary transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Send Post Modal */}
      <Dialog open={isSendModalOpen} onOpenChange={setIsSendModalOpen}>
        <DialogContent className="w-[90vw] sm:w-[450px] bg-card border border-border rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-h4 font-bold">Send to</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4 max-h-[60vh] overflow-y-auto pr-2">
            {sendConnections.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-light shrink-0">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      {user.name}
                    </h4>
                    <p className="text-xs text-normal line-clamp-1">
                      {user.role}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleSendToUser(user.name)}
                  className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white px-5 py-1.5 rounded-full text-xs font-bold transition-all"
                >
                  Send
                </button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
