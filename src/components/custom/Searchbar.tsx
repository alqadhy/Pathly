// Components
import { Input } from "../ui/input";

// Icons
import { Search } from "lucide-react";

function Searchbar() {
  return (
    <div className="relative hidden md:block md:w-[240px] lg:w-[560px] xl:w-[690px] xl:ml-11">
      <Search className="text-normal absolute top-[50%] left-4 translate-y-[-50%]" />
      <Input
        type="search"
        placeholder="Search..."
        className="bg-input h-10 pl-14 hover:bg-light-hover lg: h-12"
      />
    </div>
  );
}

export default Searchbar;
