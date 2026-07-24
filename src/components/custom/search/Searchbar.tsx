import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Input } from "../../ui/input";
import SearchDropdown from "./SearchDropdown";
import { APP_ROUTES } from "../../../constants";

import {
  searchAll,
  saveRecentSearch,
} from "../../../Services/search.service";

import type { SearchResult } from "../../../Services/search.service";

const Searchbar = () => {
  const [query, setQuery] = useState("");

  const [open, setOpen] =
    useState(false);

  const [results, setResults] =
    useState<SearchResult[]>([]);

  const wrapperRef =
    useRef<HTMLDivElement>(null);

  const navigate =
    useNavigate();

  /* ---------------- Search From Tags ---------------- */

  const handleQuickSearch = (
    item: SearchResult
  ) => {
    saveRecentSearch(item);

    setQuery(item.title);

    setResults(
      searchAll(item.title)
    );

    setOpen(true);
  };

  /* ---------------- Select Result ---------------- */

  const handleSelect = (
    item: SearchResult
  ) => {
    saveRecentSearch(item);

    setQuery(item.title);

    setResults([]);

    setOpen(false);

    switch (item.type) {
      case "job":
        navigate(
          `/student/jobs/${item.id}`
        );
        break;

      case "internship":
        navigate(
          `/student/internships/${item.id}`
        );
        break;

      case "company":
        navigate(
          `/student/community/company/${item.id}`
        );
        break;

      case "person":
        navigate(
          `/student/community/profile/${item.id}`
        );
        break;

      case "course":
        navigate(
          `/student/learning/${item.id}`
        );
        break;

      default:
        break;
    }
  };

  /* ---------------- Search ---------------- */

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setResults(
      searchAll(query)
    );
  }, [query]);

  /* ---------------- Close Dropdown ---------------- */

  useEffect(() => {
    const handler = (
      event: MouseEvent
    ) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handler
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handler
      );
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative hidden md:block md:w-[440px] lg:w-[560px] xl:ml-11 xl:w-[690px]"
    >
      <Search className="text-normal absolute left-4 top-1/2 -translate-y-1/2" />

      <Input
        type="search"
        value={query}
        placeholder="Search..."
        onFocus={() =>
          setOpen(true)
        }
        onClick={() =>
          setOpen(true)
        }
        onChange={(e) =>
          setQuery(
            e.target.value
          )
        }
        className="bg-input h-12 rounded-full pl-14 hover:bg-light-hover"
      />

      {open && (
        <SearchDropdown
          query={query}
          results={results}
          onSelect={
            handleSelect
          }
          onSearch={
            handleQuickSearch
          }
        />
      )}
    </div>
  );
};

export default Searchbar;