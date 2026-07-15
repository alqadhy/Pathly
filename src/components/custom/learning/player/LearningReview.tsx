import { Star } from "lucide-react";

type Props = {
  name: string;
  image: string;
  rating: number;
  comment: string;
  job?: string;
};

const LearningReview = ({
  name,
  image,
  rating,
  comment,
  job,
}: Props) => {
  return (
    <section className=" rounded-2xl bg-white p-xl ">
      <h2 className="mb-xl text-[32px] font-bold text-text-primary">
        Student Review
      </h2>

      <div className="flex flex-col gap-lg lg:flex-row lg:items-start">
        <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full">
            <img
            src={image}
            alt={name}
            className="h-20 w-20 rounded-full object-cover"
            />
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-md">
            <div>
              <h3 className="text-[24px] font-semibold text-text-primary">
                {name}
              </h3>

              {job && (
                <p className="mt-xs text-body-sm text-text-secondary">
                  {job}
                </p>
              )}
            </div>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={20}
                  className={
                    index < rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-muted text-muted"
                  }
                />
              ))}
            </div>
          </div>

          <p className="mt-lg text-body-md leading-8 text-text-secondary">
            {comment}
          </p>
        </div>
      </div>
    </section>
  );
};

export default LearningReview;