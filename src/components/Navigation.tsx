import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="bg-white border-r w-64 min-h-screen p-4">
      <ul className="space-y-2">
        <li>
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600"
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/profile"
            className="text-gray-700 hover:text-blue-600"
          >
            Profile
          </Link>
        </li>

        <li>
          <Link
            to="/jobs"
            className="text-gray-700 hover:text-blue-600"
          >
            Jobs
          </Link>
        </li>

        <li>
          <Link
            to="/applications"
            className="text-gray-700 hover:text-blue-600"
          >
            Applications
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;