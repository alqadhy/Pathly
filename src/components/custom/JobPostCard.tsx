import {
  AppWindow,
  CheckCircle2,
  CircleX,
  Copy,
  EllipsisVertical,
  Mail,
  Pencil,
  Share2,
  Timer,
  Trash2,
  UsersRound,
  X,
} from "lucide-react";
import type { JobPost } from "../../Services/applications.service";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";

function JobPostCard({ jobPost }: { jobPost: JobPost }) {
  const statusColor =
    jobPost.status == "active"
      ? "success"
      : jobPost.status == "draft"
        ? "warning"
        : "danger";

  const [openDelete, setOpenDelete] = useState(false);
  const [openShare, setOpenShare] = useState(false);

  return (
    <>
      <div className="bg-card px-6 py-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-14 h-14 flex items-center justify-center bg-background rounded-sm">
              <img
                src={jobPost.company.companyLogo}
                alt={jobPost.company.name}
                className="w-10!"
              />
            </span>
            <h6>{jobPost.company.name}</h6>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button>
                <EllipsisVertical />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setOpenShare(true)}>
                <Share2 className="mr-2 h-4 w-4" />
                Share Job
              </DropdownMenuItem>

              <DropdownMenuItem>
                <UsersRound className="mr-2 h-4 w-4" />
                Show Applicants
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-danger focus:text-danger group"
                onClick={() => setOpenDelete(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Job
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-6 py-6">
          <div className="text">
            <h3>{jobPost.title}</h3>
            <p className="font-[500] mt-2 mb-6">
              {jobPost.location} · {jobPost.postedAt.text} ·
            </p>
            <div className="flex items-center flex-wrap gap-2">
              <span className="bg-primary text-white px-4 py-3 rounded-sm text-sm flex items-center gap-1">
                {jobPost.workType.type}
                <CheckCircle2 size={14} />
              </span>
              <span className="bg-primary text-white px-4 py-3 rounded-sm text-sm flex items-center gap-1">
                {jobPost.workType.time}
                <CheckCircle2 size={14} />
              </span>
              <span className="bg-primary text-white px-4 py-3 rounded-sm text-sm flex items-center gap-1">
                {jobPost.workType.location}
                <CheckCircle2 size={14} />
              </span>
            </div>
          </div>
          <div className="flex gap-6 font-[500]">
            <p className="flex items-center gap-1">
              <UsersRound size={16} /> {jobPost.totalApplications} Total
              Applications
            </p>
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-xl bg-${statusColor}-light`}
            >
              <span className={`w-5 h-5 rounded-xs bg-${statusColor}`}></span>
            </div>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-x-6 gap-y-3 font-[500]">
          <p className="flex items-center gap-1">
            <AppWindow size={16} /> Posted {jobPost.postedAt.date}
          </p>
          <p className="flex items-center gap-1">
            <Timer size={16} /> Deadline {jobPost.deadline}
          </p>
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={openShare} onOpenChange={setOpenShare}>
        <DialogContent className="w-200 max-w-[calc(100%-30px)] p-8">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Share {jobPost.title}</DialogTitle>
            <DialogClose className="bg-background rounded-full w-12 h-12 flex items-center justify-center">
              <CircleX />
            </DialogClose>
          </DialogHeader>

          <div className="my-8">
            <span className="font-[500] block mb-2">Copy Link</span>
            <div className="flex items-center gap-8">
              <Input
                readOnly
                value={`https://pathly.com/jobs/${jobPost.id}`}
                className="bg-input! text-text-light border-none! ring-0! w-[calc(100%-76px)]"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://pathly.com/jobs/${jobPost.id}`,
                  );
                }}
                title="Copy link to clipboard"
                className="w-11 h-11 rounded-full border-2 border-primary text-primary flex items-center justify-center"
              >
                <Copy size={24} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-[500]">Share Via</span>
            <button className="text-normal">
              <Mail size={40} />
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className="w-200 max-w-[calc(100%-30px)] p-8">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Delete {jobPost.title}</DialogTitle>
            <DialogClose className="bg-background rounded-full w-12 h-12 flex items-center justify-center">
              <CircleX />
            </DialogClose>
          </DialogHeader>

          <p className="my-8 text-center font-bold text-normal">
            Are you sure you want to delete Senior Product Designer job
          </p>

          <div className="ml-auto w-fit">
            <Button className="bg-danger! text-white rounded-sm w-fit ml-auto p-6">
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default JobPostCard;
