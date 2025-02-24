import MovieCard from "../components/MovieCard";
import { useState } from "react";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const movies = [
    { id: 1, title: "John Wick", release_date: "2020" },
    { id: 2, title: "Terminator", release_date: "1999" },
    { id: 3, title: "Matrix", release_date: "1998" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    alert(searchQuery);
    setSearchQuery("");
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {movies.map(
          (movie) =>
            movie.title.toLowerCase().startsWith(searchQuery) && (
              <MovieCard movie={movie} key={movie.id} />
            )
        )}
      </div>
    </div>
  );
}

export default Home;
