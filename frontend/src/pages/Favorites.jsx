import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites.length > 0) {
    return (
      <div className="p-8 w-full box-border">
        <h2 className="mb-8 text-center text-4xl text-orange-200 [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)]">
          Your favorite movies
        </h2>
        <div>
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="text-center py-16 px-8 bg-white/5 rounded-xl my-8 mx-auto max-w-xl">
      <h2 className="mb-4 text-4xl text-red-700">No favorite movies yet</h2>
      <p className="text-stone-400 text-xl leading-relaxed">Start adding movies to your favorites and they will appear here</p>
    </div>
  );
}

export default Favorites;
