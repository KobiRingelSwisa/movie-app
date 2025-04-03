import MovieCard from "../components/MovieCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import MovieFilters from "../components/MovieFilters";
import MovieRecommendations from "../components/MovieRecommendations";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const popularMovies = await getPopularMovies();
        if (popularMovies && Array.isArray(popularMovies)) {
          setMovies(popularMovies);
          setFilteredMovies(popularMovies);
        } else {
          setError("No movies found");
        }
      } catch (error) {
        console.error("Error loading movies:", error);
        setError(
          "Failed to load movies. Please check your API key and try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  useEffect(() => {
    let result = [...movies];

    if (selectedGenres.length > 0) {
      result = result.filter((movie) =>
        movie.genre_ids.some((genreId) => selectedGenres.includes(genreId))
      );
    }

    const [sortField, sortOrder] = sortBy.split(".");
    result.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
    });

    setFilteredMovies(result);
  }, [movies, sortBy, selectedGenres]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const searchResults = await searchMovies(searchQuery);
      if (searchResults && Array.isArray(searchResults)) {
        setMovies(searchResults);
        setFilteredMovies(searchResults);
      } else {
        setError("No movies found");
      }
    } catch (error) {
      console.error("Error searching movies:", error);
      setError("Failed to search movies. Please try again.");
    } finally {
      setLoading(false);
    }
    setSearchQuery("");
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Discover Movies
          </h1>
          <p className="text-gray-400">Find your next favorite movie</p>
        </div>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              className="w-full px-6 py-4 bg-gray-800/50 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold transition-colors duration-200 hover:bg-red-700 flex items-center gap-2"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Searching...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Search
                </>
              )}
            </button>
          </div>
        </form>

        <MovieFilters
          onSortChange={handleSortChange}
          onGenreChange={handleGenreChange}
          selectedGenres={selectedGenres}
        />

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {loading ? (
            <LoadingSkeleton />
          ) : filteredMovies && filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 py-8">
              No movies found
            </div>
          )}
        </div>

        <div className="mt-16">
          <MovieRecommendations />
        </div>
      </div>
    </div>
  );
}

export default Home;
