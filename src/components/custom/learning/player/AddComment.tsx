import { useState } from "react";
import { SendHorizontal } from "lucide-react";

import { Button } from "../../../ui/button";
import { Textarea } from "../../../ui/textarea";

const AddComment = () => {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!comment.trim()) return;

    console.log(comment);

    setComment("");
  };

  return (
    <div className="mt-lg rounded-2xl bg-card p-xl ">
      <h3 className="mb-lg text-[24px] font-semibold text-text-primary">
        Leave a Comment
      </h3>

      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your thoughts about this lesson..."
        className="min-h-[80px] resize-none"
      />

      <div className="mt-lg flex justify-end">
        <Button
          onClick={handleSubmit}
          className="flex items-center gap-sm text-xl p-md"
        >
          <SendHorizontal size={18} />
          Post Comment
        </Button>
      </div>
    </div>
  );
};

export default AddComment;