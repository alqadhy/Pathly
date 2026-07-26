type Props = {
  active: "all" | "unread";
  onChange: (
    value: "all" | "unread"
  ) => void;
};

const NotificationTabs = ({
  active,
  onChange,
}: Props) => {
  return (
    <div className="flex gap-md border-b border-border py-sm">
      <button
        onClick={() =>
          onChange("all")
        }
        className={`rounded-full px-lg py-sm text-body-sm font-semibold transition ${
          active === "all"
            ? "bg-primary text-white"
            : "bg-muted text-text-secondary hover:bg-light-hover"
        }`}
      >
        All
      </button>

      <button
        onClick={() =>
          onChange("unread")
        }
        className={`rounded-full px-lg py-sm text-body-sm font-semibold transition ${
          active === "unread"
            ? "bg-primary text-white"
            : "bg-muted text-text-secondary hover:bg-light-hover"
        }`}
      >
        Unread
      </button>
    </div>
  );
};

export default NotificationTabs;