import jobs from "../../public/mocked/jobs/jobs.json";
import internships from "../../public/mocked/jobs/internships.json";
import companies from "../../public/mocked/community/companies.json";
import people from "../../public/mocked/community/profiles.json";
import { trackKeywords } from "../constants/trackKeywords";
import { learningCourses } from "../../public/mocked/learning/learning";

export interface SearchResult {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type:
    | "job"
    | "internship"
    | "company"
    | "person"
    | "course";
}

const RECENT_SEARCHES_KEY = "recent-searches";

/* ---------------- Jobs ---------------- */

const getAllJobs = (): SearchResult[] => {
  const jobResults = jobs.matchingJobs.map((job) => ({
    id: job.id,
    title: job.title,
    company: job.company,
    companyLogo: job.companyLogo,
    location: job.location,
    type: "job" as const,
  }));

  const internshipResults = internships.map((internship) => ({
    id: internship.id,
    title: internship.title,
    company: internship.company,
    companyLogo: internship.companyLogo,
    location: internship.location,
    type: "internship" as const,
  }));

  return [...jobResults, ...internshipResults];
};

/* ---------------- Companies ---------------- */

const getAllCompanies = (): SearchResult[] => {
  return companies.sections.flatMap((section) =>
    section.cards.map((company) => ({
      id: company.id,
      title: company.name,
      company: company.role,
      companyLogo: company.avatarUrl,
      location: "",
      type: "company" as const,
    }))
  );
};

/* ---------------- People ---------------- */

const getAllPeople = (): SearchResult[] => {
  return people.sections.flatMap((section) =>
    section.cards.map((person) => ({
      id: person.id,
      title: person.name,
      company: `${person.role} ${person.subtitle}`,
      companyLogo: person.avatarUrl,
      location: "",
      type: "person" as const,
    }))
  );
};

/* ---------------- Courses ---------------- */

const getAllCourses = (): SearchResult[] => {
  return learningCourses.map(
    (course) => ({
      id: course.id,
      title: course.title,
      company: `${course.track} ${course.category} ${course.instructor}`,
      companyLogo: course.image,
      location: "",
      type: "course" as const,
    })
  );
};

/* ---------------- All Search Items ---------------- */

const getAllSearchItems = (): SearchResult[] => {
  return [
    ...getAllJobs(),
    ...getAllCompanies(),
    ...getAllPeople(),
    ...getAllCourses()
  ];
};

/* ---------------- Search ---------------- */

export const searchAll = (
  query: string
): SearchResult[] => {
  if (!query.trim()) return [];

  const value = query.toLowerCase();

  return getAllSearchItems().filter(
    (item) =>
      item.title.toLowerCase().includes(value) ||
      item.company.toLowerCase().includes(value)
  );
};

/* ---------------- Recent ---------------- */

export const getRecentSearches =
  (): SearchResult[] => {
    const data = localStorage.getItem(
      RECENT_SEARCHES_KEY
    );

    if (!data) return [];

    return JSON.parse(data);
  };

export const saveRecentSearch = (
  item: SearchResult
) => {
  const recent = getRecentSearches();

  const filtered = recent.filter(
    (search) =>
      search.title.toLowerCase() !==
      item.title.toLowerCase()
  );

  const updated = [item, ...filtered];

  localStorage.setItem(
    RECENT_SEARCHES_KEY,
    JSON.stringify(updated.slice(0, 5))
  );
};

export const clearRecentSearches = () => {
  localStorage.removeItem(
    RECENT_SEARCHES_KEY
  );
};

/* ---------------- Trending ---------------- */

export const getTrendingJobs =
  (): SearchResult[] => {
    return getAllSearchItems().slice(0, 8);
  };

/* ---------------- Recommended ---------------- */

export const getRecommendedJobs = (
  tracks: string[]
): SearchResult[] => {
  const allItems = getAllSearchItems();

  if (!tracks.length) {
    return allItems.slice(0, 8);
  }

  const keywords = tracks.flatMap(
    (track) =>
      trackKeywords[
        track.toLowerCase()
      ] || [track]
  );

  const recommendations =
    allItems.filter((item) =>
      keywords.some((keyword) =>
        item.title
          .toLowerCase()
          .includes(keyword.toLowerCase())
      )
    );

  return recommendations.length
    ? recommendations
    : allItems.slice(0, 8);
};