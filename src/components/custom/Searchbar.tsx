// Components
import { Input } from "../ui/input";

// Icons
import { Search } from "lucide-react";

function Searchbar() {
  return (
    <div className="relative w-[690px]">
      <Search className="text-normal absolute top-[50%] left-4 translate-y-[-50%]" />
      <Input
        type="search"
        placeholder="Search..."
        className="bg-input h-12 pl-14 hover:bg-light-hover"
      />
    </div>
  );
}

export default Searchbar;
