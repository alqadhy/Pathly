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
      <p className="mb-xl text-h3 font-bold text-text-primary ">
        Course Details
      </p>

      {/* HERO IMAGE */}
      <div className="overflow-hidden rounded-2xl shadow-card">
        <img
          src={image}
          alt={title}
          className="h-[240px] w-full object-cover md:h-[420px]"
        />
      </div>

       <p className="mt-lg text-h2 font-bold text-text-primary ">
         {title}
      </p>
    </>
  );
};

export default LearningHero;