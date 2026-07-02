import {
  BadgeCheck,
  CircleCheck,
  Star,
  Clock3,
} from "lucide-react";

const LearningDetails = () => {
  return (
    <section
      className="
        min-h-screen
        bg-background
        px-4
        py-6
        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          max-w-[1180px]
        "
      >
        {/* PAGE TITLE */}
        <h1
          className="
            mb-lg
            text-h3
            font-bold
            text-text-primary
            md:text-display
          "
        >
          Course Details
        </h1>

        {/* HERO IMAGE */}
        <div
          className="
            overflow-hidden
            rounded-2xl
            shadow-card
          "
        >
          <img
            src="https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1600"
            alt="course"
            className="
              h-[240px]
              w-full
              object-cover
              md:h-[420px]
              lg:h-[500px]
            "
          />
        </div>

        {/* MAIN CONTENT */}
        <div
          className="
            mt-2xl
            flex
            flex-col
            gap-2xl
            lg:flex-row
            lg:justify-between
          "
        >
          {/* LEFT SIDE */}
          <div className="flex-1">

            {/* TITLE */}
            <h2
              className="
                max-w-[760px]
                text-[32px]
                font-bold
                leading-[120%]
                text-text-primary
                md:text-[54px]
              "
            >
              Python Programming
              Fundamentals
            </h2>

            {/* AUTHOR + BUTTON */}
            <div
              className="
                mt-xl
                flex
                flex-col
                gap-lg
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              {/* AUTHOR */}
              <div
                className="
                  flex
                  items-center
                  gap-md
                "
              >
                <img
                  src="https://i.pravatar.cc/100"
                  alt="mentor"
                  className="
                    h-[72px]
                    w-[72px]
                    rounded-full
                    object-cover
                  "
                />

                <div>
                  <h3
                    className="
                      text-[34px]
                      font-semibold
                      text-text-secondary
                    "
                  >
                    Adam Rami
                  </h3>

                  <div
                    className="
                      mt-xs
                      flex
                      items-center
                      gap-xs
                    "
                  >
                    <Star
                      size={18}
                      className="
                        fill-yellow-400
                        text-yellow-400
                      "
                    />

                    <span
                      className="
                        text-[20px]
                        text-text-secondary
                      "
                    >
                      4.9 (4.3k)
                    </span>
                  </div>
                </div>
              </div>

              {/* BUTTON */}
              <button
                className="
                  h-[72px]
                  w-full
                  rounded-xl
                  border-2
                  border-primary
                  bg-card
                  text-[24px]
                  font-semibold
                  text-primary
                  transition-all
                  hover:bg-primary-hover
                  hover:text-primary-foreground
                  active:bg-primary-active
                  lg:w-[230px]
                "
              >
                View Profile
              </button>
            </div>

            {/* BADGES */}
            <div
              className="
                mt-lg
                flex
                flex-wrap
                gap-md
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-xs
                  rounded-lg
                  bg-muted
                  px-md
                  py-sm
                  text-[18px]
                  text-foreground
                "
              >
                <Clock3 size={18} />
                10 Weeks
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-xs
                  rounded-lg
                  bg-muted
                  px-md
                  py-sm
                  text-[18px]
                  text-foreground
                "
              >
                Beginner
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-xs
                  rounded-lg
                  bg-muted
                  px-md
                  py-sm
                  text-[18px]
                  text-foreground
                "
              >
                <BadgeCheck size={18} />
                Certificate
              </div>
            </div>

            {/* ABOUT */}
            <div className="mt-2xl">
              <h3
                className="
                  mb-lg
                  text-[32px]
                  font-bold
                  text-text-primary
                "
              >
                About This Course
              </h3>

              <p
                className="
                  max-w-[980px]
                  text-[22px]
                  leading-[190%]
                  text-text-secondary
                "
              >
                This foundational
                course is your
                gateway to the
                world of programming
                with Python.
                Designed for
                complete beginners,
                it will cover all
                the essential core
                concepts, syntax,
                and best practices
                using hands-on
                projects.
              </p>
            </div>

            {/* LEARN */}
            <div className="mt-2xl">
              <h3
                className="
                  mb-lg
                  text-[32px]
                  font-bold
                  text-text-primary
                "
              >
                You will learn
              </h3>

              <div className="space-y-md">
                {[
                  "Python setup and basic syntax",
                  "Data types (integers, strings, lists)",
                  "Functions and modules",
                  "File I/O operations",
                ].map((item) => (
                  <div
                    key={item}
                    className="
                      flex
                      items-center
                      gap-sm
                    "
                  >
                    <CircleCheck
                      size={22}
                      className="
                        fill-primary
                        text-primary
                      "
                    />

                    <span
                      className="
                        text-[22px]
                        text-text-secondary
                      "
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM ACTIONS */}
        <div
          className="
            mt-2xl
            flex
            flex-col-reverse
            gap-md
            md:flex-row
            md:justify-end
          "
        >
          {/* TAKE COURSE */}
          <button
            className="
              h-[78px]
              w-full
              rounded-xl
              bg-primary
              text-[28px]
              font-bold
              text-primary-foreground
              transition-all
              hover:bg-primary-hover
              active:bg-primary-active
              md:w-[300px]
            "
          >
            Take Course
          </button>

          {/* PRICE */}
          <div
            className="
              flex
              h-[78px]
              w-full
              items-center
              justify-center
              rounded-xl
              border-2
              border-primary
              bg-card
              text-[30px]
              font-bold
              text-primary
              md:w-[160px]"
            >
              1500 EGP
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningDetails;