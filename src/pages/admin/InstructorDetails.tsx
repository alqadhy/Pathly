import React from "react";
import { Suspense, lazy } from "react";
import PageLoader from "../../components/layout/PageLoader";

const InstructorDetailsComponent = lazy(
  () => import("../../components/custom/admin/instructors/InstructorDetails"),
);

const AdminInstructorDetails: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <InstructorDetailsComponent />
    </Suspense>
  );
};

export default AdminInstructorDetails;