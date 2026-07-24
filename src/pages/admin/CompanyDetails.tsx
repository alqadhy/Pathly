import React from "react";
import { Suspense, lazy } from "react";
import PageLoader from "../../components/layout/PageLoader";

const CompanyDetailsComponent = lazy(
  () => import("../../components/custom/admin/companies/CompanyDetails"),
);

const AdminCompanyDetails: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <CompanyDetailsComponent />
    </Suspense>
  );
};

export default AdminCompanyDetails;