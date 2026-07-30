import { useState, useEffect, useRef } from "react";

export type MediaItem = {
  url: string;
  type: "image" | "video" | "file";
  name: string;
};

export const useCreatePostLogic = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [postVisibility, setPostVisibility] = useState<
    "Anyone" | "Connections only"
  >("Anyone");
  const [commentVisibility, setCommentVisibility] = useState<
    "Anyone" | "Connections only" | "No one"
  >("Anyone");

  const [postText, setPostText] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedDraft = localStorage.getItem("postDraft");
    if (savedDraft) setPostText(savedDraft);
  }, []);

  // Handle main modal open/close
  const handleMainModalChange = (open: boolean) => {
    if (isSettingsOpen) return;
    if (!open) {
      if (postText.trim().length > 0 || selectedMedia.length > 0) {
        setIsAlertDialogOpen(true);
      } else {
        setIsPostModalOpen(false);
      }
    } else {
      setIsPostModalOpen(true);
    }
  };

  // دالة جديدة مخصصة للنشر المباشر بدون إظهار رسالة الـ Draft
  const handlePublishDirect = (onSuccess?: () => void) => {
    localStorage.removeItem("postDraft");
    setPostText("");
    setSelectedMedia([]);
    setErrorMsg("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsPostModalOpen(false);

    if (onSuccess) onSuccess();

    setTimeout(() => {
      document.body.style.pointerEvents = "";
    }, 50);
  };

  // Handle discard
  const handleDiscard = () => {
    setIsAlertDialogOpen(false);

    setTimeout(() => {
      localStorage.removeItem("postDraft");
      setPostText("");
      setSelectedMedia([]);
      setErrorMsg("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      setIsPostModalOpen(false);

      setTimeout(() => {
        document.body.style.pointerEvents = "";
      }, 50);
    }, 100);
  };

  // Save draft to localStorage
  const handleSaveDraft = () => {
    localStorage.setItem("postDraft", postText);
    setIsAlertDialogOpen(false);

    setTimeout(() => {
      setIsPostModalOpen(false);

      setTimeout(() => {
        document.body.style.pointerEvents = "";
      }, 50);
    }, 100);
  };

  // Handle media upload
  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    let hasLargeFile = false;
    const validFiles = files.filter((file) => {
      if (file.type.startsWith("video/")) return true;
      if (file.size > 10 * 1024 * 1024) {
        hasLargeFile = true;
        return false;
      }
      return true;
    });

    if (hasLargeFile)
      setErrorMsg(
        "Some images/files exceed the 10MB limit and were not added.",
      );
    else setErrorMsg("");

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = (event.target as FileReader).result;
        if (result) {
          let mediaType: MediaItem["type"] = "file";
          if (file.type.startsWith("image/")) mediaType = "image";
          else if (file.type.startsWith("video/")) mediaType = "video";

          setSelectedMedia((prev) => [
            ...prev,
            { url: result as string, type: mediaType, name: file.name },
          ]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // remove media
  const removeMedia = (indexToRemove: number) => {
    setSelectedMedia((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const isPostDisabled =
    postText.trim().length === 0 && selectedMedia.length === 0;

  return {
    isPostModalOpen,
    setIsPostModalOpen,
    isAlertDialogOpen,
    setIsAlertDialogOpen,
    isSettingsOpen,
    setIsSettingsOpen,
    postVisibility,
    setPostVisibility,
    commentVisibility,
    setCommentVisibility,
    postText,
    setPostText,
    selectedMedia,
    setSelectedMedia,
    errorMsg,
    setErrorMsg,
    fileInputRef,
    handleMainModalChange,
    handlePublishDirect,
    handleDiscard,
    handleSaveDraft,
    handleMediaUpload,
    removeMedia,
    isPostDisabled,
  };
};
