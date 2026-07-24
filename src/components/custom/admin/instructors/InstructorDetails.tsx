import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  UserCheck,
  XCircle,
  Ban,
  MapPin,
  Calendar,
  Mail,
  BookOpen,
  Star,
  Users,
  TrendingUp,
  Clock,
  Award,
} from "lucide-react";
import { APP_ROUTES } from "../../../../constants";

interface Course {
  id: number;
  title: string;
  students: number;
  lessons: number;
  status: string;
}

interface RatingDistribution {
  stars: number;
  percentage: number;
}

interface Review {
  studentName: string;
  rating: number;
  comment: string;
  date: string;
}

interface Certification {
  name: string;
  issuer: string;
  year: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface Experience {
  title: string;
  company: string;
  duration: string;
}

interface SocialMedia {
  linkedin?: string;
  twitter?: string;
  github?: string;
  portfolio?: string;
}

interface Earnings {
  thisMonth: number;
  lastMonth: number;
  total: number;
}

interface Instructor {
  id: number;
  name: string;
  email: string;
  avatar: string;
  teachingCategory: string;
  students: number;
  rating: number;
  status: string;
  location: string;
  joined: string;
  bio: string;
  skills: string[];
  phone: string;
  website: string;
  socialMedia: SocialMedia;
  certifications: Certification[];
  education: Education[];
  experience: Experience[];
  stats: {
    totalCourses: number;
    totalStudents: number;
    avgRating: number;
    completionRate: number;
    responseRate: number;
    totalRevenue: number;
  };
  courses: Course[];
  ratingDistribution: RatingDistribution[];
  recentReviews: Review[];
  earnings: Earnings;
  profileCompletion: number;
}

const InstructorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Profile");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/admin_instructors_details.json")
      .then((res) => res.json())
      .then((data: Record<string, Instructor>) => {
        const instructorId = Number(id);
        const found = data[instructorId.toString()] as Instructor | undefined;
        console.log("Fetched instructor data:", found);
        setInstructor(found || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading instructor:", err);
        setLoading(false);
      });
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8f9fc]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#553be6] mx-auto"></div>
          <p className="mt-4 text-[#6b7280]">Loading instructor details...</p>
        </div>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8f9fc]">
        <div className="text-center">
          <p className="text-gray-600">Instructor not found</p>
          <button
            onClick={() => navigate(APP_ROUTES.admin.instructors)}
            className="mt-4 px-4 py-2 bg-[#553be6] text-white rounded-lg hover:bg-purple-700"
          >
            Back to Instructors
          </button>
        </div>
      </div>
    );
  }

  const tabs = ["Profile", "Courses", "Rating"];

  return (
    <div className="min-h-screen bg-[#f8f9fc] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className=" rounded-lg  p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Side - Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
                <div className="mx-auto sm:mx-0 flex-shrink-0">
                <img
                  src={instructor.avatar}
                  alt={instructor.name}
                  className="w-20 h-20 sm:w-30 sm:h-30 rounded-full object-cover"
                /></div>
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 text-center sm:text-left">
                      {instructor.name}
                    </h1>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full self-center sm:self-auto ${getStatusColor(
                        instructor.status
                      )}`}
                    >
                      {instructor.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3 justify-center sm:justify-start">
                    {instructor.teachingCategory.split(", ").map((category, idx) => (
                      <span
                        key={idx}
                        className="px-2 sm:px-3 py-1 text-xs font-medium bg-purple-50 text-[#553be6] rounded"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 justify-center sm:justify-start">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                      {instructor.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                      Joined {instructor.joined}
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                      {instructor.email}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mt-4 sm:mt-20">
                <nav className="flex gap-2 sm:gap-4 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === tab
                          ? "border-[#553be6] text-[#553be6]"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab === "Profile" && <UserCheck className="w-3 h-3 sm:w-4 sm:h-4" />}
                      {tab === "Courses" && <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />}
                      {tab === "Rating" && <Star className="w-3 h-3 sm:w-4 sm:h-4" />}
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="mt-6">
                {activeTab === "Profile" && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                      BIOGRAPHY
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                      {instructor.bio}
                    </p>

                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                      SKILLS & EXPERTISE
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {instructor.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 text-xs font-medium bg-purple-50 text-[#553be6] rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "Courses" && (
                  <div className="space-y-3">
                    {instructor.courses && instructor.courses.length > 0 ? (
                      instructor.courses.map((course) => (
                        <div
                          key={course.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-3"
                        >
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className="p-2 sm:p-3 bg-purple-100 rounded-lg flex-shrink-0">
                              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#553be6]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-medium text-gray-900 truncate">
                                {course.title}
                              </h3>
                              <p className="text-xs text-gray-500 mt-1">
                                {course.students.toLocaleString()} Students • {course.lessons} Lessons
                              </p>
                            </div>
                          </div>
                          <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full whitespace-nowrap self-start sm:self-auto">
                            {course.status}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <BookOpen className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p>No courses available</p>
                      </div>
                    )}
                  </div>
                )}
                {activeTab === "Rating" && (
                  <div>
                    {instructor.ratingDistribution && instructor.ratingDistribution.length > 0 ? (
                      <div className="space-y-3">
                        {instructor.ratingDistribution.map((item) => (
                          <div key={item.stars} className="flex items-center gap-3">
                            <div className="flex items-center gap-1 w-16">
                              <span className="text-sm font-medium text-gray-700">
                                {item.stars}
                              </span>
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            </div>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-yellow-500 h-full rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 w-12 text-right">
                              {item.percentage}%
                            </span>
                          </div>
                        ))}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                              <span className="text-4xl font-bold text-gray-900">
                                {instructor.stats.avgRating}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">Average Rating</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <Star className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p>No ratings available</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Admin Actions & Stats */}
            <div className="lg:w-80 space-y-4">
              {/* Admin Actions */}
              {/* <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Admin Actions
                </h3>
                <div className="space-y-2">
                  {instructor.status === "Pending" && (
                    <>
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-600 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                        <UserCheck className="w-4 h-4" />
                        Approve
                      </button>
                    </>
                  )}
                  {instructor.status === "Active" && (
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors">
                      <Ban className="w-4 h-4" />
                      Suspend Account
                    </button>
                  )}
                  {instructor.status === "Pending" && (
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors">
                      <Ban className="w-4 h-4" />
                      Suspend Account
                    </button>
                  )}
                </div>
              </div> */}

              {/* Instructor Stats */}
              <div className=" rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Instructors Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Courses</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {instructor.stats.totalCourses}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Students</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {instructor.stats.totalStudents.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg.Rating</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {instructor.stats.avgRating} / 5.0
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Completion Rate</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {instructor.stats.completionRate}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Response Rate</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {instructor.stats.responseRate}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total-Revenue</span>
                    <span className="text-sm font-semibold text-gray-900">
                      ${instructor.stats.totalRevenue.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDetails;