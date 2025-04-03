import { useState } from "react";

const SORT_OPTIONS = [
  { value: "popularity.desc", label: "Most Popular" },
  { value: "vote_average.desc", label: "Highest Rated" },
  { value: "release_date.desc", label: "Newest First" },
  { value: "release_date.asc", label: "Oldest First" },
];

const GENRE_OPTIONS = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

function MovieFilters({ onSortChange, onGenreChange, selectedGenres }) {
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm">
      <div className="relative flex-1">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Sort By
        </label>
        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full appearance-none bg-gray-700 text-white px-4 py-2 rounded-lg pr-8 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      <div className="relative flex-1">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Filter by Genre
        </label>
        <button
          onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center justify-between hover:bg-gray-600 transition-colors duration-200"
        >
          <span>
            {selectedGenres.length > 0
              ? `${selectedGenres.length} selected`
              : "All Genres"}
          </span>
          <svg
            className={`w-4 h-4 transform transition-transform ${
              isGenreDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isGenreDropdownOpen && (
          <div className="absolute z-10 mt-2 w-full bg-gray-800 rounded-lg shadow-lg p-2 max-h-60 overflow-y-auto border border-gray-700">
            {GENRE_OPTIONS.map((genre) => (
              <label
                key={genre.id}
                className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded cursor-pointer transition-colors duration-200"
              >
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre.id)}
                  onChange={() => onGenreChange(genre.id)}
                  className="form-checkbox h-4 w-4 text-red-600 rounded focus:ring-red-500"
                />
                <span className="text-white">{genre.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieFilters;
