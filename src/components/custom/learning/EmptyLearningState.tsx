import { Rocket } from "lucide-react";

const EmptyLearningState = () => {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-2xl
        bg-card
        p-xl
        shadow-card
      "
    >
      <div
        className="
          absolute
          -right-xl
          -top-xl
          h-[180px]
          w-[180px]
          rounded-full
          bg-primary/10
        "
      />

      <div
        className="
          relative
          z-10
          flex
          flex-col
          gap-lg
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <div className="space-y-md">
          <div
            className="
              flex
              h-[60px]
              w-[60px]
              items-center
              justify-center
              rounded-2xl
              bg-primary/10
            "
          >
            <Rocket
              size={30}
              className="text-primary"
            />
          </div>

          <div className="space-y-sm">
            <h2
              className="
                text-h3
                font-bold
                text-text-primary
              "
            >
              Start Your Learning Journey 🚀
            </h2>

            <p
              className="
                max-w-[500px]
                text-body-md
                text-text-secondary
              "
            >
              Explore top tech courses and build real-world skills with expert
              mentors.
            </p>
          </div>
        </div>

        <button
          className="
            h-[56px]
            rounded-xl
            bg-primary
            px-xl
            text-body-md
            font-semibold
            text-primary-foreground
            transition-all
            duration-300
            hover:bg-primary-hover
            hover:scale-[1.02]
            active:bg-primary-active
            active:scale-[0.98]
          "
        >
          Explore Courses
        </button>
      </div>
    </div>
  );
};

export default EmptyLearningState;