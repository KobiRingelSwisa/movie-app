function MovieCard({movie}) {
  function onLike() {
    alert("like");
  }
  return (
    <div>
      <div>
        <img src={movie.url} alt={movie.title} />
        <div>
          <button onClick={onLike}>♡</button>
        </div>
      </div>
      <div>
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
      </div>
    </div>
  );
}

export default MovieCard;
