import React from "react";
import { Suspense, lazy } from "react";
import PageLoader from "../../components/layout/PageLoader";

const InstructorsManagement = lazy(
  () => import("../../components/custom/admin/instructors/InstructorsManagement"),
);

const AdminInstructors: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <InstructorsManagement />
    </Suspense>
  );
};

export default AdminInstructors;