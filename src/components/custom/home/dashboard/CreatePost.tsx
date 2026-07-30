import React from "react";
import {
  Image as ImageIcon,
  Clapperboard,
  FileText,
  Sparkles,
  ChevronDown,
  X,
} from "lucide-react";
import dashboardData from "../../../../../public/mocked/home/StudentDashboard.json";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../ui/dialog";
import { useCreatePostLogic } from "../../../../hooks/useCreatePost";
import { PostSettingsModal } from "./PostSettingsModal";
import { DraftAlertDialog } from "./DraftAlertDialog";

interface CreatePostProps {
  onPostCreated?: (newPost: {
    id: string;
    author: {
      id: string;
      name: string;
      headline: string;
      avatar: string;
      timeAgo: string;
    };
    content: string;
    image?: string;
    video?: string;
    file?: string;
    engagement: {
      likes: number;
      comments: number;
      reposts: number;
    };
  }) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const logic = useCreatePostLogic();
  const user = dashboardData.currentUser;

  const handlePublish = () => {
    if (!logic.postText.trim() && logic.selectedMedia.length === 0) return;

    const mediaItem =
      logic.selectedMedia.length > 0 ? logic.selectedMedia[0] : null;

    const newPostObj = {
      id: "p_" + Date.now(),
      author: {
        id: user.id || "c1",
        name: user.name,
        headline: "Technology Company",
        avatar: user.avatar,
        timeAgo: "Just now",
      },
      content: logic.postText,

      image: mediaItem?.type === "image" ? mediaItem.url : undefined,
      video: mediaItem?.type === "video" ? mediaItem.url : undefined,
      file: mediaItem?.type === "file" ? mediaItem.url : undefined,
      engagement: {
        likes: 0,
        comments: 0,
        reposts: 0,
      },
    };

    if (onPostCreated) {
      onPostCreated(newPostObj);
    }

    logic.handlePublishDirect();
  };

  return (
    <>
      {/* Widget Trigger */}
      <div className="bg-card border border-border rounded-2xl p-4 md:p-6 shadow-sm flex flex-col gap-4 w-full">
        <div className="flex items-center gap-3 w-full">
          <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden border border-border bg-light">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={() => logic.setIsPostModalOpen(true)}
            className="flex-1 w-full text-left bg-background border border-border rounded-full px-5 py-3 text-normal text-sm cursor-text hover:bg-light transition-colors"
          >
            Start a post......
          </button>
        </div>

        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => logic.setIsPostModalOpen(true)}
              className="text-primary hover:text-primary-dark transition-colors"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => logic.setIsPostModalOpen(true)}
              className="text-primary hover:text-primary-dark transition-colors"
            >
              <Clapperboard className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => logic.setIsPostModalOpen(true)}
              className="text-primary hover:text-primary-dark transition-colors"
            >
              <FileText className="w-5 h-5" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => logic.setIsPostModalOpen(true)}
            className="bg-primary text-white px-6 py-1.5 rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors"
          >
            Post
          </button>
        </div>
      </div>

      {/* Main Post Dialog */}
      <Dialog
        open={logic.isPostModalOpen}
        onOpenChange={logic.handleMainModalChange}
      >
        <DialogContent
          className="w-[90vw]! max-w-[700px]! p-0 border-none bg-card rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] [&>button]:hidden"
          onPointerDownOutside={(e) => {
            if (logic.isSettingsOpen) e.preventDefault();
          }}
          onInteractOutside={(e) => {
            if (logic.isSettingsOpen) e.preventDefault();
          }}
        >
          <DialogTitle className="sr-only">Create a new post</DialogTitle>

          <DialogHeader className="p-6 pb-2 text-left shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden border border-border bg-light">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-h4 font-bold text-foreground">
                    {user.name}
                  </h3>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      logic.setIsSettingsOpen(true);
                    }}
                    className="flex items-center gap-1 text-body-sm font-medium text-normal hover:text-foreground mt-0.5"
                  >
                    {logic.postVisibility === "Anyone"
                      ? "Post to anyone"
                      : "Post to connections"}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  logic.handleMainModalChange(false);
                }}
                className="p-2 hover:bg-light rounded-full transition-colors text-normal hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </DialogHeader>

          <div className="p-6 overflow-y-auto flex-1">
            <textarea
              value={logic.postText}
              onChange={(e) => logic.setPostText(e.target.value)}
              placeholder="Start a post..........."
              className="w-full min-h-[120px] resize-none border-none outline-none text-h3 bg-transparent text-foreground placeholder:text-normal focus:ring-0"
              autoFocus
            />

            {logic.errorMsg && (
              <p className="text-danger text-sm font-medium mt-2">
                {logic.errorMsg}
              </p>
            )}

            {logic.selectedMedia.length > 0 && (
              <div
                className={`mt-4 grid gap-3 ${logic.selectedMedia.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}
              >
                {logic.selectedMedia.map((media, index) => (
                  <div
                    key={index}
                    className={`relative rounded-xl overflow-hidden border border-border bg-light group ${media.type === "file" ? "col-span-full h-[400px]" : "h-[200px]"}`}
                  >
                    {media.type === "image" && (
                      <img
                        src={media.url}
                        alt="upload"
                        className="w-full h-full object-cover"
                      />
                    )}
                    {media.type === "video" && (
                      <video
                        src={media.url}
                        controls
                        className="w-full h-full object-cover bg-black"
                      />
                    )}
                    {media.type === "file" && (
                      <iframe
                        src={`${media.url}#toolbar=0`}
                        title={media.name}
                        className="w-full h-full bg-white"
                      />
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        logic.removeMedia(index);
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black text-white rounded-full transition-colors z-10"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 pt-3 flex items-center justify-between shrink-0 border-t border-border/50">
            <div className="flex items-center gap-4">
              <input
                type="file"
                multiple
                accept="image/*,video/*,.pdf"
                ref={logic.fileInputRef}
                onChange={logic.handleMediaUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => logic.fileInputRef.current?.click()}
                className="text-primary hover:text-primary-dark transition-colors"
              >
                <ImageIcon className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={() => logic.fileInputRef.current?.click()}
                className="text-primary hover:text-primary-dark transition-colors"
              >
                <Clapperboard className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={() => logic.fileInputRef.current?.click()}
                className="text-primary hover:text-primary-dark transition-colors"
              >
                <FileText className="w-6 h-6" />
              </button>
              <button
                type="button"
                className="ml-2 flex items-center gap-1.5 bg-[#171721] text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-black transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" /> Rewrite AI
              </button>
            </div>
            <button
              type="button"
              onClick={handlePublish}
              disabled={logic.isPostDisabled}
              className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${
                !logic.isPostDisabled
                  ? "bg-primary text-white hover:bg-primary-dark shadow-md cursor-pointer"
                  : "bg-primary/50 text-white/70 cursor-not-allowed"
              }`}
            >
              Post
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <PostSettingsModal
        isOpen={logic.isSettingsOpen}
        setIsOpen={logic.setIsSettingsOpen}
        postVisibility={logic.postVisibility}
        setPostVisibility={logic.setPostVisibility}
        commentVisibility={logic.commentVisibility}
        setCommentVisibility={logic.setCommentVisibility}
      />

      {/* Alert Modal */}
      <DraftAlertDialog
        isOpen={logic.isAlertDialogOpen}
        setIsOpen={logic.setIsAlertDialogOpen}
        onDiscard={logic.handleDiscard}
        onSave={logic.handleSaveDraft}
      />
    </>
  );
};

export default CreatePost;
