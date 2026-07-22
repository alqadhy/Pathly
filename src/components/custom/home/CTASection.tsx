import { APP_ROUTES } from "../../../constants";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../../components/custom/Profile/crud/profileStorage";
import { ROLES } from "../../../roles";

export default function CTASection() {
  const currentUser = getCurrentUser();

  return (
    <section className="w-full  py-24 px-4 relative overflow-hidden bg-linear-to-br from-primary-darker via-primary-dark to-primary">
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none bg-primary-light-active/20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none bg-secondary-light-active/20" />

      <div className=" mx-auto text-center relative z-10 space-y-6">
        <h2 className="font-extrabold text-white! leading-tight text-4xl md:text-5xl lg:text-6xl">
          Ready to accelerate?
        </h2>
        <p className="text-white/70 leading-relaxed text-lg md:text-xl">
          {currentUser 
            ? "Continue building your professional profile and transform your career journey."
            : "Join the Pathly community and transform your professional journey in a few simple clicks."
          }
        </p>

        <div className=" flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {currentUser ? (
            <Link
              to ={currentUser.role === ROLES.USER ? APP_ROUTES.student.profile : currentUser.role === ROLES.ADMIN ? APP_ROUTES.admin.dashboard : APP_ROUTES.company.profile }
              className="h-14 w-65 cursor-pointer rounded-full bg-white font-bold text-primary hover:bg-gray-50 px-8 py-6 text-base shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center"
            >
              Go to My Profile
            </Link>
          ) : (
            <Link
              to={APP_ROUTES.auth.signup}
              className="h-14 w-65 cursor-pointer rounded-full bg-white font-bold text-primary hover:bg-gray-50 px-8 py-6 text-base shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center"
            >
              Create Your Free Profile
            </Link>
          )}
          <Button
            variant="outline"
            className="bg-primary h-14 w-40 cursor-pointer rounded-full border-white/50 text-white hover:bg-white/10 font-semibold px-8 py-6 text-base"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
}
