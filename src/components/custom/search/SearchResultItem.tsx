import { BriefcaseBusiness, Building2, GraduationCap, UserRound } from "lucide-react";

import type { SearchResult } from "../../../Services/search.service";

type Props = {
  item: SearchResult;
  onClick: () => void;
};

const SearchResultItem = ({
  item,
  onClick,
}: Props) => {
  const getTypeIcon = () => {
    switch (item.type) {
      case "job":
      case "internship":
        return <BriefcaseBusiness size={18} />;

      case "course":
        return <GraduationCap size={18} />;

      case "company":
        return <Building2 size={18} />;

      case "person":
      default:
        return <UserRound size={18} />;
    }
  };

  const getBadgeColor = () => {
    switch (item.type) {
      case "job":
        return "bg-blue-100 text-blue-700";

      case "internship":
        return "bg-cyan-100 text-cyan-700";

      case "course":
        return "bg-purple-100 text-purple-700";

      case "company":
        return "bg-orange-100 text-orange-700";

      case "person":
        return "bg-green-100 text-green-700";

      default:
        return "bg-muted text-text-secondary";
    }
  };

  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-md rounded-2xl px-md py-md transition-all duration-200 hover:bg-light-hover"
    >
      {item.companyLogo ? (
        <img
          src={item.companyLogo}
          alt={item.title}
          className="!h-12 !w-12 rounded-xl object-cover"
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-text-secondary">
          {getTypeIcon()}
        </div>
      )}

      <div className="min-w-0 flex-1 text-left">
        <div className="flex items-center gap-sm">
          <p className="truncate text-body-md font-semibold text-text-primary">
            {item.title}
          </p>

          <span
            className={`rounded-full px-sm py-[2px] text-[10px] font-semibold uppercase ${getBadgeColor()}`}
          >
            {item.type}
          </span>
        </div>

        <p className="truncate text-body-sm text-text-secondary">
          {item.company}
        </p>

        {item.location && (
          <p className="text-xs text-text-secondary/70">
            {item.location}
          </p>
        )}
      </div>
    </button>
  );
};

export default SearchResultItem;