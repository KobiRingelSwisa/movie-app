import { useMovieContext } from "../context/MovieContext";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

  const favorite = isFavorite(movie.id);

  function onLike(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <div className="relative rounded-lg overflow-hidden bg-gray-950 transition-transform h-full flex flex-col hover:-translate-y-2">
      <div className="relative aspect-video w-full">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-black/10 to-black/80 opacity-0 transition-opacity flex flex-col justify-end p-4 hover:opacity-100">
          <button
            onClick={onLike}
            className={`absolute top-4 right-4 text-white text-2xl p-2 bg-black rounded-xl w-10 h-10 flex items-center justify-center transition-colors hover:text-gray-500 ${
              favorite ? "text-red-600" : ""
            }`}
          >
            ♡
          </button>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col gap-2">
        <h3 className="text-xl m-0">{movie.title}</h3>
        <p className="text-gray-300 text-xs">{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  );
}

export default MovieCard;
