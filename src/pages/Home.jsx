import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (error) {
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
    setSearchQuery("");
  };

  return (
    <div className="p-8 w-full box-border">
      <form
        onSubmit={handleSearch}
        className="max-w-xl mx-auto mb-8 flex gap-4 px-0 py-4 box-border"
      >
        <input
          className="flex-1 px-4 py-3 border-none rounded-md bg-gray-800 focus:outline-none text-white text-sm focus:shadow-[0_0_0_2px_#666]"
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="px-6 py-3 bg-red-600 text-white rounded font-semibold transition-colors duration-200 whitespace-nowrap hover:bg-red-700" type="submit">Search</button>
      </form>

      {error && <div>{error}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
