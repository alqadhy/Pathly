import { Link } from "react-router-dom";
import { APP_ROUTES } from "../constants";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <p className="text-2xl font-semibold text-gray-600 mt-4">
          Page Not Found
        </p>
        <p className="text-gray-500 mt-2">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to={APP_ROUTES.home}
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;