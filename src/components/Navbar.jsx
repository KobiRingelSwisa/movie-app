import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-4 px-8 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold">
        <Link
          to="/"
          className="hover:text-red-600 dark:hover:text-red-500 transition-colors"
        >
          Movie App
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="text-lg px-3 py-2 rounded-md transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Home
        </Link>
        <Link
          to="/favorites"
          className="text-lg px-3 py-2 rounded-md transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Favorites
        </Link>
        <Link
          to="/watchlist"
          className="text-lg px-3 py-2 rounded-md transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Watchlist
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
