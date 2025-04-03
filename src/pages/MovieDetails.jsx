import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";
import { useWatchlist } from "../context/WatchlistContext";
import { getMovieDetails, getMovieTrailer } from "../services/api";

function MovieDetails() {
  const { id } = useParams();
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [movieData, trailerData] = await Promise.all([
          getMovieDetails(id),
          getMovieTrailer(id),
        ]);
        setMovie(movieData);
        setTrailer(trailerData);
      } catch (error) {
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  if (!movie) {
    return <div className="p-8 text-center">Movie not found</div>;
  }

  const favorite = isFavorite(movie.id);
  const inWatchlist = isInWatchlist(movie.id);

  const handleFavorite = () => {
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  };

  const handleWatchlist = () => {
    if (inWatchlist) removeFromWatchlist(movie.id);
    else addToWatchlist(movie);
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleFavorite}
                className={`flex-1 py-2 px-4 rounded-lg ${
                  favorite
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
                }`}
              >
                {favorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>
              <button
                onClick={handleWatchlist}
                className={`flex-1 py-2 px-4 rounded-lg ${
                  inWatchlist
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
                }`}
              >
                {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              </button>
            </div>
          </div>
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {movie.title}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">★</span>
                <span className="text-gray-900 dark:text-white">
                  {movie.vote_average?.toFixed(1)}
                </span>
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                {movie.release_date?.split("-")[0]}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {movie.runtime} min
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {movie.overview}
            </p>
            {trailer && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Trailer
                </h2>
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="Movie Trailer"
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
