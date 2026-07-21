import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  CheckCircle,
  Clock,
  TrendingUp,
  Eye,
  Check,
  X,
  Ban,
  MoreVertical,
} from "lucide-react";
import { APP_ROUTES } from "../../../../constants";

interface Company {
  id: number;
  name: string;
  country: string;
  industry: string;
  verification: string;
  opportunities: number;
  joined: string;
  status: string;
  logo: string;
}

const CompaniesManagement: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/admin_companies.json")
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading companies:", err);
        setLoading(false);
      });
  }, []);

  // const stats = {
  //   total: companies.length,
  //   verified: companies.filter((c) => c.verification === "Verified").length,
  //   pending: companies.filter((c) => c.verification === "Pending").length,
  //   active: companies.filter((c) => c.status === "Active").length,
  // };

  const filteredCompanies = companies.filter((company) => {
    if (activeTab === "All") return true;
    // if (activeTab === "Pending Approval") return company.status === "Pending";
    // if (activeTab === "Active") return company.status === "Active";
    // if (activeTab === "Suspend") return company.status === "Suspended";
    return true;
  });

  const tabs = [
    { name: "All", count: companies.length },
    // { name: "Pending Approval", count: companies.filter((c) => c.status === "Pending").length },
    // { name: "Active", count: companies.filter((c) => c.status === "Active").length },
    // { name: "Suspend", count: companies.filter((c) => c.status === "Suspended").length },
  ];

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "Active":
  //       return "bg-green-100 text-green-700";
  //     case "Pending":
  //       return "bg-yellow-100 text-yellow-700";
  //     case "Rejected":
  //       return "bg-red-100 text-red-700";
  //     case "Suspended":
  //       return "bg-orange-100 text-orange-700";
  //     default:
  //       return "bg-gray-100 text-gray-700";
  //   }
  // };

  // const getVerificationColor = (verification: string) => {
  //   switch (verification) {
  //     case "Verified":
  //       return "bg-blue-100 text-blue-700";
  //     case "Pending":
  //       return "bg-yellow-100 text-yellow-700";
  //     case "Rejected":
  //       return "bg-red-100 text-red-700";
  //     default:
  //       return "bg-gray-100 text-gray-700";
  //   }
  // };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8f9fc]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#553be6] mx-auto"></div>
          <p className="mt-4 text-[#6b7280]">Loading companies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Companies Management
        </h1>
        {/* Stats Cards */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Building2 className="w-6 h-6 text-[#553be6]" />
              </div>
              <span className="text-xs text-[#553be6] font-medium bg-purple-50 px-2 py-1 rounded">
                +15.3% this month
              </span>
            </div>
            <p className="text-3xl font-bold text-[#111827] mb-1">1,247</p>
            <p className="text-sm text-gray-500">Total Companies</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-[#553be6]" />
              </div>
              <span className="text-xs text-[#553be6] font-medium bg-purple-50 px-2 py-1 rounded">
                +15.3% this month
              </span>
            </div>
            <p className="text-3xl font-bold text-[#111827] mb-1">892</p>
            <p className="text-sm text-gray-500">Verified Companies</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-[#553be6]" />
              </div>
              <span className="text-xs text-red-600 font-medium bg-red-50 px-2 py-1 rounded">
                -5 today
              </span>
            </div>
            <p className="text-3xl font-bold text-[#111827] mb-1">5</p>
            <p className="text-sm text-gray-500">Pending Verification</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-[#553be6]" />
              </div>
              <span className="text-xs text-[#553be6] font-medium bg-purple-50 px-2 py-1 rounded">
                +15.3% this month
              </span>
            </div>
            <p className="text-3xl font-bold text-[#111827] mb-1">986</p>
            <p className="text-sm text-gray-500">Active Companies</p>
          </div>
        </div> */}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
          <div className="p-3">
            <nav className="flex gap-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border whitespace-nowrap transition-colors ${
                    activeTab === tab.name
                      ? "border-[#553be6] text-[#553be6] bg-white"
                      : "border-gray-200 text-gray-500 bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  {tab.name}
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      activeTab === tab.name
                        ? "bg-purple-50 text-[#553be6]"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Industry
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Opportunities
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCompanies.map((company) => (
                  <tr
                    key={company.id}
                    className="hover:bg-gray-50"
                    onClick={() =>
                      navigate(APP_ROUTES.admin.companyDetails(company.id))
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-12 h-8 rounded-lg mr-3 flex items-center justify-center text-white font-bold text-sm overflow-hidden">
                          <img
                            src={company.logo}
                            alt={company.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {company.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {company.country}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {company.industry}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        {company.opportunities}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {company.joined}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() =>
                            navigate(
                              APP_ROUTES.admin.companyDetails(company.id),
                            )
                          }
                          className="p-1.5 text-gray-600 hover:text-[#553be6] hover:bg-purple-50 rounded transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {/* {company.status === "Pending" && (
                          <>
                            <button
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Reject"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {company.status === "Active" && (
                          <button
                            className="p-1.5 text-orange-600 hover:bg-orange-50 rounded transition-colors"
                            title="Suspend"
                          >
                            <Ban className="w-4 h-4" />
                          </button>
                        )}
                        {company.status === "Suspended" && (
                          <button
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                            title="Activate"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )} */}
                        {/* <button
                          className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                          title="More options"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CompaniesManagement;
