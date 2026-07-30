import { Save, Send } from "lucide-react";

import { Button } from "../../../ui/button";

type Props = {
  loading?: boolean;
  onSaveDraft: () => void;
  onPublish: () => void;
};

const PublishSection = ({
  loading = false,
  onSaveDraft,
  onPublish,
}: Props) => {
  return (
    <div className="rounded-3xl border border-border bg-card p-2xl shadow-card">
      <div className="mb-xl">
        <h3 className="text-h4 font-bold text-text-primary">
          Publish Course
        </h3>

        <p className="mt-sm text-body-md text-text-secondary">
          Save your course as a draft or publish it when everything is ready.
        </p>
      </div>

      <div className="flex flex-col gap-md md:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={onSaveDraft}
          disabled={loading}
          className="flex-1"
        >
          <Save size={18} />
          Save Draft
        </Button>

        <Button
          type="button"
          onClick={onPublish}
          disabled={loading}
          className="flex-1"
        >
          <Send size={18} />
          {loading ? "Publishing..." : "Publish Course"}
        </Button>
      </div>
    </div>
  );
};

export default PublishSection;