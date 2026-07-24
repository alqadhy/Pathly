import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Star,
  BookOpen,
  Eye,
} from "lucide-react";
import { APP_ROUTES } from "../../../../constants";

interface Instructor {
  id: number;
  name: string;
  email: string;
  avatar: string;
  teachingCategory: string;
  courses: number;
  students: number;
  rating: number;
  status: string;
}

const InstructorsManagement: React.FC = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/admin_instructors.json")
      .then((res) => res.json())
      .then((data) => {
        setInstructors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading instructors:", err);
        setLoading(false);
      });
  }, []);

  const filteredInstructors = instructors.filter((instructor) => {
    if (activeTab === "All") return true;
    if (activeTab === "Active") return instructor.status === "Active";
    if (activeTab === "Pending") return instructor.status === "Pending";
    return true;
  });

  const tabs = [
    { name: "All", count: instructors.length },
    // { name: "Active", count: instructors.filter((i) => i.status === "Active").length },
    // { name: "Pending", count: instructors.filter((i) => i.status === "Pending").length },
  ];

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "Active":
  //       return "bg-green-100 text-green-700";
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
          <p className="mt-4 text-[#6b7280]">Loading instructors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Instructors Management
        </h1>

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
                    Instructor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teaching Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Courses
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th> */}
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInstructors.map((instructor) => (
                  <tr
                    key={instructor.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() =>
                      navigate(APP_ROUTES.admin.instructorDetails(instructor.id))
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mx-5">
                          <img
                            src={instructor.avatar}
                            alt={instructor.name}
                            className="w-13 h-13 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {instructor.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {instructor.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {instructor.teachingCategory
                          .split(", ")
                          .map((category, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs font-medium bg-purple-50 text-[#553be6] rounded"
                            >
                              {category}
                            </span>
                          ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        {instructor.courses}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#553be6]">
                      {instructor.students.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        {instructor.rating}
                      </div>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          instructor.status
                        )}`}
                      >
                        {instructor.status}
                      </span>
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(APP_ROUTES.admin.instructorDetails(instructor.id));
                          }}
                          className="p-1.5 text-gray-600 hover:text-[#553be6] hover:bg-purple-50 rounded transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
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

export default InstructorsManagement;
