import { Search } from "lucide-react";

type Props = {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
};

const statuses = [
  "All",
  "Active",
  "Completed",
  "Frozen",
  "Dropped",
];

const StudentFilters = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: Props) => {
  return (
    <div className="flex flex-col gap-lg rounded-2xl border border-border bg-card p-xl md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:max-w-md">
        <Search size={18} className="absolute left-md top-1/2 -translate-y-1/2 text-text-secondary" />

        <input
          type="text"
          value={search}
          placeholder="Search students..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-md text-body-md outline-none transition-all focus:border-primary"
        />
      </div>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="h-12 rounded-xl border border-border bg-background px-lg text-body-md outline-none transition-all focus:border-primary"
      >
        {statuses.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StudentFilters;