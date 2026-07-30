import { useEffect, useState } from "react";
import StudentHome from "./student/Dashboard";
import CompanyHome from "./company/CompanyHome";

const DashboardHome = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("currentUser");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user && user.role) {
          setRole(user.role);
        } else {
          setRole("employee");
        }
      } catch (error) {
        console.error("Error parsing user data", error);
        setRole("employee");
      }
    } else {
      setRole("employee");
    }
  }, []);

  if (role === null) {
    return (
      <div className="w-full h-full flex items-center justify-center p-6">
        <span className="text-normal">Loading...</span>
      </div>
    );
  }

  if (role === "company") {
    return <CompanyHome />;
  }

  return <StudentHome />;
};

export default DashboardHome;
