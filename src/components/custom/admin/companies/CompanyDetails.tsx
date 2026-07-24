import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  Users,
  Download,
  Briefcase,
  CheckCircle,
  Clock,
  XCircle,
  Ban,
} from "lucide-react";

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
  email?: string;
  phone?: string;
  website?: string;
  founded?: string;
  employees?: string;
  about?: string;
  hrTeam?: Array<{ name: string; position: string; email: string }>;
  documents?: Array<{ name: string; type: string }>;
  postedOpportunities?: Array<{ title: string; type: string; location: string; status: string }>;
  profileCompletion?: number;
  responseRate?: number;
}

const AdminCompanyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/admin_companies_details.json")
      .then((res) => res.json())
      .then((data) => {
        const foundCompany = data[id || ""];
        if (foundCompany) {
          setCompany(foundCompany);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading company:", err);
        setLoading(false);
      });
  }, [id]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
            <CheckCircle className="w-3 h-3" />
            Active
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      case "Suspended":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
            <Ban className="w-3 h-3" />
            Suspended
          </span>
        );
      default:
        return null;
    }
  };

  const getVerificationBadge = (verification: string) => {
    switch (verification) {
      case "Verified":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
            <CheckCircle className="w-3 h-3" />
            Verified
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8f9fc]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#553be6] mx-auto"></div>
          <p className="mt-4 text-[#6b7280]">Loading company details...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="text-center py-12 bg-[#f8f9fc]">
        <p className="text-[#6b7280]">Company not found</p>
        <button
          onClick={() => navigate("/admin/companies")}
          className="mt-4 px-6 py-2 bg-[#553be6] text-white rounded-lg hover:bg-[#4535c5] transition"
        >
          Back to Companies
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/companies")}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-[#553be6] transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Companies</span>
        </button>

        {/* Company Header */}
        <div className="rounded-lg  p-6 mb-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 mx-auto sm:mx-0">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{company.name}</h1>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 justify-center sm:justify-start">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    {company.country}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    Founded {company.founded || company.joined}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                    {company.email}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              {company.status === "Pending" && (
                <>
                  <button className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Approve Company
                  </button>
                  <button className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2 text-sm">
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                </>
              )}
              {company.status === "Active" && (
                <button className="px-3 sm:px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition flex items-center justify-center gap-2 text-sm">
                  <Ban className="w-4 h-4" />
                  Suspend Account
                </button>
              )}
              {company.status === "Suspended" && (
                <button className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Activate
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">{company.about}</p>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Email</p>
                    <p className="text-sm font-medium text-gray-900">{company.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">PHONE</p>
                    <p className="text-sm font-medium text-gray-900">{company.phone}</p>
                  </div>
                </div>
                {company.website && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <Globe className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Website</p>
                      <p className="text-sm font-medium text-gray-900">{company.website}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Country</p>
                    <p className="text-sm font-medium text-gray-900">{company.country}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* HR Team */}
            {company.hrTeam && company.hrTeam.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">HR Team</h2>
                <div className="space-y-4">
                  {company.hrTeam.map((member, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold text-sm sm:text-base flex-shrink-0">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm sm:text-base">{member.name}</p>
                          <p className="text-xs sm:text-sm text-gray-500">{member.position}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 pl-13 sm:pl-0">
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">{member.email}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verification Documents */}
            {company.documents && company.documents.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Verification Document</h2>
                <div className="space-y-3">
                  {company.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg border border-gray-200 flex-shrink-0">
                          <Briefcase className="w-5 h-5 text-gray-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{doc.name}.{doc.type}</span>
                      </div>
                      <button className="flex items-center justify-center gap-2 px-4 py-2 text-[#553be6] hover:bg-purple-50 rounded-lg transition w-full sm:w-auto">
                        <Download className="w-4 h-4" />
                        <span className="text-sm font-medium">Download</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Posted Opportunities */}
            {company.postedOpportunities && company.postedOpportunities.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Posted Opportunities ({company.postedOpportunities.length})
                </h2>
                <div className="space-y-3">
                  {company.postedOpportunities.map((opportunity, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                          <Briefcase className="w-5 h-5 text-[#553be6]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm sm:text-base">{opportunity.title}</p>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {opportunity.type} · {opportunity.location}
                          </p>
                        </div>
                      </div>
                      <div className="self-start sm:self-auto">
                        {getStatusBadge(opportunity.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Admin Actions */}
            {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Admin Actions</h3>
              <div className="space-y-3">
                {company.status === "Pending" && (
                  <>
                    <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Approve Company
                    </button>
                    <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </>
                )}
                {company.status === "Active" && (
                  <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition flex items-center justify-center gap-2">
                    <Ban className="w-4 h-4" />
                    Suspend Account
                  </button>
                )}
                {company.status === "Suspended" && (
                  <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Activate
                  </button>
                )}
              </div>
            </div> */}

            {/* Company Statistics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Company Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Posted opportunities</span>
                  <span className="text-sm font-medium text-gray-900">{company.opportunities}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Employees</span>
                  <span className="text-sm font-medium text-gray-900">{company.employees || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Founded</span>
                  <span className="text-sm font-medium text-gray-900">{company.founded || company.joined}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Member since</span>
                  <span className="text-sm font-medium text-gray-900">{company.joined}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Profile completion</span>
                  <span className="text-sm font-medium text-gray-900">{company.profileCompletion || 0}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Response rate</span>
                  <span className="text-sm font-medium text-gray-900">{company.responseRate || 0}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCompanyDetails;