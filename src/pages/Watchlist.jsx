import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";

function Watchlist() {
  const { watchlist } = useWatchlist();

  return (
    <div className="p-8 w-full box-border">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        My Watchlist
      </h1>
      {watchlist.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-400">
          Your watchlist is empty. Add some movies to watch later!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchlist.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;
