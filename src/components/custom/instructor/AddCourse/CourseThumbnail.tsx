import { ImagePlus } from "lucide-react";

type Props = {
  image: string;
  onChange: (value: string) => void;
};

const CourseThumbnail = ({
  image,
  onChange,
}: Props) => {
  const handleUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      onChange(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-xl rounded-3xl border border-border bg-card p-2xl shadow-card">
      <h3 className="text-h4 font-bold text-text-primary">
        Course Thumbnail
      </h3>

      <label className="flex h-72 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-background transition-all hover:border-primary">
        {image ? (
          <img
            src={image}
            alt="Course"
            className="h-full w-full rounded-2xl object-cover"
          />
        ) : (
          <>
            <div className="mb-lg flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <ImagePlus
                size={30}
                className="text-primary"
              />
            </div>

            <p className="text-body-lg font-semibold text-text-primary">
              Upload Thumbnail
            </p>

            <span className="mt-xs text-body-sm text-text-secondary">
              PNG, JPG or JPEG
            </span>
          </>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default CourseThumbnail;