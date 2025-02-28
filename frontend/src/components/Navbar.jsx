import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="text-black py-8 px-4 flex justify-between items-center shadow-md md:p-4">
      <div className="text-xl font-bold md:text-xl">
        <Link to="/">Movie App</Link>
      </div>
      <div className="flex gap-8 md:gap-4">
        <Link
          to="/"
          className="text-lg px-2 py-4 rounded-md transition-colors duration-200 hover:bg-gray-700 md:p-2"
        >
          Home
        </Link>
        <Link
          to="/favorites"
          className="text-lg px-2 py-4 rounded-md transition-colors duration-200 hover:bg-gray-700 md:p-2"
        >
          Favorites
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
