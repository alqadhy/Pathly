// Icons
import { FileHeart, Inbox, Search, UsersRound } from "lucide-react";

// Components
import { SelectBox } from "../../components/custom/onBoarding/company";
import JobPostCard from "../../components/custom/JobPostCard";

// Services
import {
  applicationsService,
  type JobPost,
} from "./../../Services/applications.service";

// Hooks
import { useState, useEffect } from "react";

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-8 text-normal">
      <Inbox size={28} className="opacity-50" />
      <p className="text-sm">{message}</p>
    </div>
  );
}

function ApplicationsPage() {
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);

  const [searchKeyword, setSearchKeyword] = useState("");

  const [status, setStatus] = useState("All");
  const [department, setDepartment] = useState("All");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    async function getJobPosts() {
      const jobPosts = await applicationsService.getApplications();
      setJobPosts(jobPosts);
    }
    getJobPosts();
  }, []);

  const filteredJobPosts = [...jobPosts]
    // Search
    .filter((post) =>
      post.title.toLowerCase().includes(searchKeyword.toLowerCase()),
    )
    // Status
    .filter((post) =>
      status === "All"
        ? true
        : post.status.toLowerCase() === status.toLowerCase(),
    )
    // Department
    .filter((post) =>
      department === "All" ? true : post.department === department,
    )
    // Sort
    .sort((a, b) => {
      switch (sortBy) {
        case "Newest":
          return (
            new Date(b.postedAt.date).getTime() -
            new Date(a.postedAt.date).getTime()
          );
        case "Oldest":
          return (
            new Date(a.postedAt.date).getTime() -
            new Date(b.postedAt.date).getTime()
          );
        case "Most Applicants":
          return b.totalApplications - a.totalApplications;
        default:
          return 0;
      }
    });

  return (
    <main className="grid gap-10">
      <section className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-6">
        <div className="box bg-card p-5 rounded-lg border border-muted">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-light">
              <FileHeart size={20} className="text-primary" />
            </div>
            <div className="bg-primary-light rounded-full px-2 py-1 text-primary text-[11px]">
              5 Months
            </div>
          </div>
          <h3 className="mt-4">{jobPosts.length}</h3>
          <p className="text-sm text-normal">Total Job Posts</p>
        </div>

        <div className="box bg-card p-5 rounded-lg border border-muted">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-success-light">
              <span className="w-5 h-5 rounded-xs bg-success"></span>
            </div>
            <div className="bg-primary-light rounded-full px-2 py-1 text-primary text-[11px]">
              5 Months
            </div>
          </div>
          <h3 className="mt-4">
            {jobPosts.filter((j) => j.status == "active").length}
          </h3>
          <p className="text-sm text-normal">Active Jobs</p>
        </div>

        <div className="box bg-card p-5 rounded-lg border border-muted">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-warning-light">
              <span className="w-5 h-5 rounded-xs bg-warning"></span>
            </div>
            <div className="bg-primary-light rounded-full px-2 py-1 text-primary text-[11px]">
              5 Months
            </div>
          </div>
          <h3 className="mt-4">
            {jobPosts.filter((j) => j.status == "draft").length}
          </h3>
          <p className="text-sm text-normal">Draft Jobs</p>
        </div>

        <div className="box bg-card p-5 rounded-lg border border-muted">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-danger-light">
              <span className="w-5 h-5 rounded-xs bg-danger"></span>
            </div>
            <div className="bg-primary-light rounded-full px-2 py-1 text-primary text-[11px]">
              5 Months
            </div>
          </div>
          <h3 className="mt-4">
            {jobPosts.filter((j) => j.status == "closed").length}
          </h3>
          <p className="text-sm text-normal">Closed Jobs</p>
        </div>

        <div className="box bg-card p-5 rounded-lg border border-muted">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-light">
              <UsersRound size={20} className="text-primary" />
            </div>
            <div className="bg-primary-light rounded-full px-2 py-1 text-primary text-[11px]">
              5 Months
            </div>
          </div>
          <h3 className="mt-4">
            {jobPosts.reduce((acc, cur) => acc + cur.totalApplications, 0)}
          </h3>
          <p className="text-sm text-normal">Total Applications</p>
        </div>
      </section>

      <section className="flex items-center gap-2 flex-wrap">
        <div className="search-bar flex-grow relative">
          <Search
            size={24}
            className="absolute top-[50%] left-4 translate-y-[-50%] text-normal"
          />
          <input
            type="text"
            placeholder="Search"
            className="bg-white h-12 px-4 rounded-sm border-none outline-none block w-full pl-14"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
        <div className="w-50">
          <SelectBox
            items={["All", "Active", "Draft", "Closed"]}
            placeholder="Status"
            value={status}
            onValueChange={(value) => setStatus(value)}
          />
        </div>
        <div className="w-50">
          <SelectBox
            items={["All", "Design", "Engineering", "Marketing", "HR"]}
            placeholder="Department"
            value={department}
            onValueChange={(value) => setDepartment(value)}
          />
        </div>
        <div className="w-50">
          <SelectBox
            items={["Newest", "Oldest", "Most Applicants"]}
            placeholder="Sort By"
            value={sortBy}
            onValueChange={(value) => setSortBy(value)}
          />
        </div>
      </section>

      <section className="grid gap-5">
        {filteredJobPosts.length === 0 ? (
          <EmptyState message="No job posts found." />
        ) : (
          filteredJobPosts.map((post) => (
            <JobPostCard key={post.id} jobPost={post} />
          ))
        )}
      </section>
    </main>
  );
}

export default ApplicationsPage;
