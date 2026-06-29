// Components
import { Link } from "react-router-dom";

// Constants
import { APP_ROUTES } from "../../constants";
import {
  Bookmark,
  BookOpen,
  BriefcaseBusiness,
  ChartColumn,
  FileText,
  House,
  Settings,
  UserRound,
  UsersRound,
  WandSparkles,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="w-(--sidebar-width) px-6 py-25 border-r border-input hidden lg:block">
      <div className="w-full grid gap-6">
        <div className="group">
          <span className="text-text-light">MAIN</span>
          <div className="grid gap-4 mt-4">
            <Link
              to={APP_ROUTES.student.dashboard}
              title="Your Dashboard"
              className="px-4 py-3 flex gap-2 rounded-lg bg-light shadow-sm"
            >
              <House /> Home
            </Link>
            <Link
              to={APP_ROUTES.student.aiAssistant}
              title="AI Assistant"
              className="px-4 py-3 flex gap-2 rounded-lg transition hover:bg-light-hover hover:text-primary"
            >
              <WandSparkles /> AI Assistant
            </Link>
            <Link
              to={APP_ROUTES.student.analytics}
              title="Analytics"
              className="px-4 py-3 flex gap-2 rounded-lg transition hover:bg-light-hover hover:text-primary"
            >
              <ChartColumn /> Analytics
            </Link>
          </div>
        </div>

        <div className="group">
          <span className="text-text-light">CAREER</span>
          <div className="grid gap-4 mt-4">
            <Link
              to={APP_ROUTES.student.cv}
              title="CV"
              className="px-4 py-3 flex gap-2 rounded-lg transition hover:bg-light-hover hover:text-primary"
            >
              <FileText /> CV
            </Link>
            <Link
              to={APP_ROUTES.student.jobs}
              title="Jobs & Internships"
              className="px-4 py-3 flex gap-2 rounded-lg transition hover:bg-light-hover hover:text-primary"
            >
              <BriefcaseBusiness /> Jobs & Internships
            </Link>
            <Link
              to={APP_ROUTES.student.saved}
              title="Saved Items"
              className="px-4 py-3 flex gap-2 rounded-lg transition hover:bg-light-hover hover:text-primary"
            >
              <Bookmark /> Saved Items
            </Link>
          </div>
        </div>

        <div className="group">
          <span className="text-text-light">GROWTH</span>
          <div className="grid gap-4 mt-4">
            <Link
              to={APP_ROUTES.student.learning}
              title="Learning"
              className="px-4 py-3 flex gap-2 rounded-lg transition hover:bg-light-hover hover:text-primary"
            >
              <BookOpen /> Learning
            </Link>
            <Link
              to={APP_ROUTES.student.community}
              title="Community"
              className="px-4 py-3 flex gap-2 rounded-lg transition hover:bg-light-hover hover:text-primary"
            >
              <UsersRound /> Community
            </Link>
          </div>
        </div>

        <div className="group">
          <span className="text-text-light">ACCOUNT</span>
          <div className="grid gap-4 mt-4">
            <Link
              to={APP_ROUTES.student.profile}
              title="Profile"
              className="px-4 py-3 flex gap-2 rounded-lg transition hover:bg-light-hover hover:text-primary"
            >
              <UserRound /> Profile
            </Link>
            <Link
              to={APP_ROUTES.student.settings}
              title="Settings"
              className="px-4 py-3 flex gap-2 rounded-lg transition hover:bg-light-hover hover:text-primary"
            >
              <Settings /> Settings
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
