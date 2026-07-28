// Helper Functions
import CompanyOnBoarding from "../components/custom/onBoarding/company";
import StudentOnBoarding from "../components/custom/onBoarding/student";
import { getCurrentUser } from "../components/custom/Profile/crud/profileStorage";

function OnBoarding() {
  const currentUser = getCurrentUser();
  return (
    <div>
      {currentUser?.role == "employee" ? (
        <StudentOnBoarding />
      ) : (
        <CompanyOnBoarding />
      )}
    </div>
  );
}

export default OnBoarding;
