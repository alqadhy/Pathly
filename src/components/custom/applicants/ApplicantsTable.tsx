import { Eye, CalendarDays, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useApplications } from '@/hooks/useApplications';
import { useApplicationsUIStore } from '@/store/useApplicationsUIStore';
import { ApplicationStatusBadge } from './ApplicationStatusBadge';
import { getAiScreening } from '@/constants/aiScreeningOverlay';
import type { ApplicationStatus } from '@/types/application.types';

interface ApplicantsTableProps {
  jobId?: string; // omit to show every application across jobs
}

const STATUS_OPTIONS: { value: ApplicationStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All statuses' },
  { value: 'pending', label: 'New' },
  { value: 'reviewed', label: 'Screening' },
  { value: 'interview', label: 'Interview' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'hired', label: 'Hired' },
];

export function ApplicantsTable({ jobId }: ApplicantsTableProps) {
  const {
    search,
    statusFilter,
    sortBy,
    setSearch,
    setStatusFilter,
    setSortBy,
    openDetails,
    openInterview,
  } = useApplicationsUIStore();

  const { data: applications, isLoading } = useApplications({
    jobId,
    search,
    status: statusFilter,
    sortBy,
  });

  return (
    <div className="overflow-hidden rounded-2xl  bg-white shadow-sm">
      <div className="flex flex-wrap items-center gap-3 p-5">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="rounded-lg border-none bg-muted/50 ps-9 shadow-none focus-visible:ring-1"
          />
        </div>

        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as ApplicationStatus | 'all')}
        >
          <SelectTrigger className="w-[150px] rounded-lg border-none bg-muted/50 shadow-none">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
          <SelectTrigger className="w-[160px] rounded-lg border-none bg-muted/50 shadow-none">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="submittedAt">Applied on</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-none">
            <TableHead className="pl-5 text-body-md font-semibold!  tracking-wide text-black">
              Applicant
            </TableHead>
            <TableHead className="text-body-md font-semibold  tracking-wide text-black">
              Status
            </TableHead>
            <TableHead className="text-body-md font-semibold  tracking-wide text-black">
              Match
            </TableHead>
            <TableHead className="text-body-md font-semibold  tracking-wide text-black">
              Applied on
            </TableHead>
            <TableHead className="pr-5 text-end text-body-md font-semibold  tracking-wide text-black">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={5} className="h-16 animate-pulse bg-muted/40" />
              </TableRow>
            ))}

          {!isLoading && applications?.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="py-14 text-center text-black ">
                No applicants match your filters.
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            applications?.map((application) => {
              const { matchScore } = getAiScreening(application.id);
              return (
                <TableRow key={application.id} className="group border-none">
                  <TableCell className="py-3.5 pl-5">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={application.avatarUrl} alt={application.name} />
                        <AvatarFallback>{application.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium leading-tight">{application.name}</p>
                        <p className="text-sm text-black">{application.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <ApplicationStatusBadge status={application.status} />
                  </TableCell>
                  <TableCell className="font-medium">{matchScore}%</TableCell>
                  <TableCell className="text-black">
                    {new Date(application.submittedAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                    })}
                  </TableCell>
                  <TableCell className="pr-5">
                    <div className="flex justify-end gap-1 opacity-70 transition-opacity group-hover:opacity-100">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-muted"
                        onClick={() => openDetails(application.id)}
                        aria-label="View applicant"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-muted"
                        onClick={() => openInterview(application.id)}
                        aria-label="Schedule interview"
                      >
                        <CalendarDays className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}