type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

const SettingsSection = ({
  title,
  description,
  children,
}: Props) => {
  return (
    <section className="w-full space-y-xl rounded-2xl bg-card p-xl">
      <div className="space-y-xs">
        <h2 className="text-[36px] font-bold text-text-primary">
          {title}
        </h2>

        {description && (
          <p className="text-body-md text-text-secondary">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
};

export default SettingsSection;