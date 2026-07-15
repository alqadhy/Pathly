type Props = {
  image: string;
  title: string;
};

const LearningHero = ({
  image,
  title,
}: Props) => {
  return (
    <>
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
          src={image}
          alt={title}
          className="
            h-[240px]
            w-full
            object-cover
            md:h-[420px]
            lg:h-[500px]
          "
        />
      </div>
    </>
  );
};

export default LearningHero;