import { useMovieContext } from "../context/MovieContext";
import { useWatchlist } from "../context/WatchlistContext";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const favorite = isFavorite(movie.id);
  const inWatchlist = isInWatchlist(movie.id);

  function onLike(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  function onWatchlist(e) {
    e.preventDefault();
    if (inWatchlist) removeFromWatchlist(movie.id);
    else addToWatchlist(movie);
  }

  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div className="relative rounded-lg overflow-hidden bg-gray-950 transition-all duration-300 h-full flex flex-col hover:-translate-y-2 hover:shadow-xl">
        <div className="relative aspect-[2/3] w-full">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-black/10 to-black/80 opacity-0 transition-opacity flex flex-col justify-end p-4 hover:opacity-100">
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={onLike}
                className={`text-white text-2xl p-2 bg-black/50 backdrop-blur-sm rounded-xl w-10 h-10 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                  favorite ? "text-red-600" : ""
                }`}
              >
                ♡
              </button>
              <button
                onClick={onWatchlist}
                className={`text-white text-2xl p-2 bg-black/50 backdrop-blur-sm rounded-xl w-10 h-10 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                  inWatchlist ? "text-blue-500" : ""
                }`}
              >
                +
              </button>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-400">★</span>
              <span className="text-white">
                {movie.vote_average?.toFixed(1)}
              </span>
            </div>
            <p className="text-white text-sm line-clamp-3">{movie.overview}</p>
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col gap-2">
          <h3 className="text-xl font-semibold m-0 line-clamp-1">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-gray-300 text-sm">
              {movie.release_date?.split("-")[0]}
            </p>
            <div className="flex gap-1">
              {movie.genre_ids?.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
