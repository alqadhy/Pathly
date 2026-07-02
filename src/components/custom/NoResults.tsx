function NoResults({
  heading,
  text,
  children,
}: {
  heading: string;
  text: string;
  children: React.ReactElement;
}) {
  return (
    <div className="text-center">
      <div className="[&_svg]:h-30 [&_svg]:w-30 sm:[&_svg]:h-50 sm:[&_svg]:w-50 [&_svg]:mx-auto text-normal">
        {children}
      </div>
      <h2>{heading}</h2>
      <p className="text-normal text-body-lg leading-(--h5-line-height) mt-1">
        {text}
      </p>
    </div>
  );
}

export default NoResults;
