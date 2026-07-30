import StudentRow from "./StudentRow";

import type { InstructorStudent } from "../../../../types/instructor.types";

type Props = {
  students: InstructorStudent[];
};

const StudentsTable = ({ students }: Props) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="grid grid-cols-[2fr_1.4fr_1fr_1fr] gap-lg border-b border-border bg-muted px-xl py-lg text-body-sm font-semibold text-text-secondary">
        <p>Student</p>
        <p>Enrolled</p>
        <p>Progress</p>
        <p className="text-center">Status</p>
      </div>

      <div className="divide-y divide-border">
        {students.length > 0 ? (
          students.map((student) => (
            <StudentRow
              key={student.id}
              {...student}
            />
          ))
        ) : (
          <div className="flex h-52 items-center justify-center text-body-lg text-text-secondary">
            No students found.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsTable;