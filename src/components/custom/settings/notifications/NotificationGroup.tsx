type Props = {
  title: string;
  children: React.ReactNode;
};

const NotificationGroup = ({
  title,
  children,
}: Props) => {
  return (
    <div className="space-y-md">
      <h3 className="text-body-lg font-semibold text-text-primary">
        {title}
      </h3>

      <div className="space-y-xs">
        {children}
      </div>
    </div>
  );
};

export default NotificationGroup;