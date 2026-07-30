import { useEffect, useMemo, useState } from "react";

import StudentFilters from "../../components/custom/instructor/Students/StudentFilters";
import StudentsTable from "../../components/custom/instructor/Students/StudentsTable";

import {
  getEnrollments,
} from "../../utils/learningEnrollmentStorage";

import type {
  InstructorStudent,
} from "../../types/instructor.types";


const StudentManagement = () => {

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");


  const [students, setStudents] = useState<
    InstructorStudent[]
  >([]);



  useEffect(() => {

    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "{}"
    );


    if (!currentUser.email) return;


    const enrollments =
      getEnrollments();


    const instructorStudents =
      enrollments
        .filter(
          (item) =>
            item.instructorEmail ===
            currentUser.email
        )
        .map((item) => ({
          
          id: item.id,

          name: item.studentName,

          email: item.studentEmail,

          avatar: "",

          courseId: item.courseId,

          courseTitle:
            item.courseTitle,

          progress:
            item.progress,

          completedAssignments: 0,

          totalAssignments: 0,

          status:
            item.progress === 100
              ? "Completed"
              : "Active" as "Completed" | "Active",
          joinedAt:
            item.joinedAt,

          enrolledDate:
            item.joinedAt,

          lastActivity:
            item.joinedAt,

        }));


    setStudents(
      instructorStudents
    );


  }, []);



  const filteredStudents = useMemo(() => {

    return students.filter((student) => {

      const matchesSearch =
        student.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        student.email
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );


      const matchesStatus =
        status === "All" ||
        student.status === status;


      return (
        matchesSearch &&
        matchesStatus
      );

    });

  }, [students, search, status]);



  return (
    <section className="space-y-2xl">

      <div className="space-y-sm">

        <h2 className="text-h2 font-bold text-text-primary">
          Student Management
        </h2>

        <p className="text-body-md text-text-secondary">
          Monitor your students and track their learning progress.
        </p>

      </div>


      <StudentFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />


      <StudentsTable
        students={filteredStudents}
      />

    </section>
  );
};


export default StudentManagement;