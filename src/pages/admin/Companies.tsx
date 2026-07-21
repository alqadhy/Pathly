import React from "react";
import { Suspense, lazy } from "react";
import PageLoader from "../../components/layout/PageLoader";

const CompaniesManagement = lazy(
  () => import("../../components/custom/admin/companies/CompaniesManagement"),
);

const AdminCompanies: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <CompaniesManagement />
    </Suspense>
  );
};

export default AdminCompanies;