import { useState, useEffect } from "react";
import { useMovieContext } from "../context/MovieContext";
import { getMovieRecommendations } from "../services/api";
import MovieCard from "./MovieCard";
import LoadingSkeleton from "./LoadingSkeleton";

function MovieRecommendations() {
  const { favorites } = useMovieContext();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (favorites.length === 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const recommendationPromises = favorites.map((movie) =>
          getMovieRecommendations(movie.id)
        );

        const results = await Promise.all(recommendationPromises);

        const allRecommendations = results.flat();
        const uniqueRecommendations = allRecommendations.filter(
          (movie, index, self) =>
            index === self.findIndex((m) => m.id === movie.id) &&
            !favorites.some((favorite) => favorite.id === movie.id)
        );

        const sortedRecommendations = uniqueRecommendations
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 8);

        setRecommendations(sortedRecommendations);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setError("Failed to load recommendations");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [favorites]);

  if (favorites.length === 0) {
    return (
      <div className="bg-gray-800/50 p-8 rounded-lg backdrop-blur-sm text-center">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Recommended for You
        </h2>
        <p className="text-gray-400">
          Add some movies to your favorites to get personalized recommendations!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
        <svg
          className="w-6 h-6 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Recommended for You
      </h2>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <LoadingSkeleton />
        ) : recommendations.length > 0 ? (
          recommendations.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 py-8">
            No recommendations found based on your favorites
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieRecommendations;
