const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

if (!API_KEY) {
  console.error(
    "TMDB API key is missing. Please add VITE_TMDB_API_KEY to your .env.local file"
  );
}

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.status_message || "An error occurred");
  }
  return response.json();
};

export const getPopularMovies = async () => {
  if (!API_KEY) throw new Error("API key is missing");

  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await handleResponse(response);
  return data.results || [];
};

export const searchMovies = async (query) => {
  if (!API_KEY) throw new Error("API key is missing");

  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await handleResponse(response);
  return data.results || [];
};

export const getMovieDetails = async (id) => {
  if (!API_KEY) throw new Error("API key is missing");

  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos`
  );
  return handleResponse(response);
};

export const getMovieTrailer = async (id) => {
  if (!API_KEY) throw new Error("API key is missing");

  const response = await fetch(
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
  );
  const data = await handleResponse(response);
  return data.results?.find((video) => video.type === "Trailer") || null;
};

export const getMovieRecommendations = async (id) => {
  if (!API_KEY) throw new Error("API key is missing");

  const response = await fetch(
    `${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}`
  );
  const data = await handleResponse(response);
  return data.results || [];
};
