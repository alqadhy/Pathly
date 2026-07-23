import SearchResultItem from "./SearchResultItem";
import SearchSection from "./SearchSection";
import SearchTag from "./SearchTag";

import {
  getRecentSearches,
  getRecommendedJobs,
} from "../../../Services/search.service";

import type { SearchResult } from "../../../Services/search.service";

import { getStoredProfile } from "../Profile/crud/profileStorage";

type Props = {
  query: string;
  results: SearchResult[];
  onSelect: (item: SearchResult) => void;
  onSearch: (item: SearchResult) => void;
};

const normalizeTrack = (track: string) => {
  switch (track.toLowerCase().trim()) {
    case "artificial intelligence":
      return "ai";

    case "ui/ux design":
      return "ui/ux";

    default:
      return track.toLowerCase().trim();
  }
};

const SearchDropdown = ({
  query,
  results,
  onSelect,
  onSearch,
}: Props) => {
  const recent = getRecentSearches();

  const profile = getStoredProfile();

  const userTracks =
    profile?.tracks?.map((track) =>
      normalizeTrack(track.name)
    ) ?? [];

  const recommended =
    getRecommendedJobs(userTracks);

  const jobs = results.filter(
    (item) =>
      item.type === "job" ||
      item.type === "internship"
  );

  const courses = results.filter(
    (item) => item.type === "course"
  );

  const people = results.filter(
    (item) => item.type === "person"
  );

  const companies = results.filter(
    (item) => item.type === "company"
  );

  return (
    <div className="scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent absolute left-0 top-[110%] z-50 max-h-[550px] w-full overflow-y-auto rounded-3xl border border-border bg-card p-xl shadow-card">      {!!query ? (
        <div className="space-y-xl">
          {!results.length && (
            <p className="py-lg text-center text-body-sm text-text-secondary">
              No results found.
            </p>
          )}

          {!!jobs.length && (
            <SearchSection title="Jobs">
              <div className="space-y-xs">
                {jobs.map((item) => (
                  <SearchResultItem
                    key={`${item.type}-${item.id}`}
                    item={item}
                    onClick={() =>
                      onSelect(item)
                    }
                  />
                ))}
              </div>
            </SearchSection>
          )}

          {!!courses.length && (
            <SearchSection title="Learning">
              <div className="space-y-xs">
                {courses.map((item) => (
                  <SearchResultItem
                    key={`${item.type}-${item.id}`}
                    item={item}
                    onClick={() =>
                      onSelect(item)
                    }
                  />
                ))}
              </div>
            </SearchSection>
          )}

          {!!people.length && (
            <SearchSection title="People">
              <div className="space-y-xs">
                {people.map((item) => (
                  <SearchResultItem
                    key={`${item.type}-${item.id}`}
                    item={item}
                    onClick={() =>
                      onSelect(item)
                    }
                  />
                ))}
              </div>
            </SearchSection>
          )}

          {!!companies.length && (
            <SearchSection title="Companies">
              <div className="space-y-xs">
                {companies.map((item) => (
                  <SearchResultItem
                    key={`${item.type}-${item.id}`}
                    item={item}
                    onClick={() =>
                      onSelect(item)
                    }
                  />
                ))}
              </div>
            </SearchSection>
          )}
        </div>
      ) : (
        <div className="space-y-xl">
          {!!recent.length && (
            <SearchSection title="Recent Searches">
              <div className="flex flex-wrap gap-md">
                {recent.map((item) => (
                  <SearchTag
                    key={`${item.type}-${item.id}`}
                    title={item.title}
                    onClick={() =>
                      onSearch(item)
                    }
                  />
                ))}
              </div>
            </SearchSection>
          )}

          <SearchSection title="Recommended For You">
            <div className="flex flex-wrap gap-md">
              {recommended.map((item) => (
                <SearchTag
                  key={`${item.type}-${item.id}`}
                  title={item.title}
                  onClick={() =>
                    onSearch(item)
                  }
                />
              ))}
            </div>
          </SearchSection>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;