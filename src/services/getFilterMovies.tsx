import type {
  Genre,
  Movie,
  MovieCategory,
  MovieDetail,
  PaginatedResponse,
} from "@/types/movie";
import { IMAGE_BASE_URL, tmdb } from ".";

// Category: Now Playing / Popular / Top Rated / Upcoming
// GET /movie/{category}?page=
export async function getMoviesByCategory(
  category: MovieCategory,
  page = 1,
  signal?: AbortSignal,
): Promise<PaginatedResponse<Movie>> {
  const { data } = await tmdb.get<PaginatedResponse<Movie>>(
    `/movie/${category}`,
    {
      params: { page },
      signal,
    },
  );
  return data;
}

// Search by title
// GET /search/movie?query=&page=
export async function searchMovies(
  query: string,
  page = 1,
  signal?: AbortSignal,
): Promise<PaginatedResponse<Movie>> {
  const { data } = await tmdb.get<PaginatedResponse<Movie>>("/search/movie", {
    params: { query, page },
    signal,
  });
  return data;
}

// Detail page (synopsis, cast, director, poster)
// GET /movie/{movie_id}?append_to_response=credits
export async function getMovieDetail(
  id: number | string,
  signal?: AbortSignal,
): Promise<MovieDetail> {
  const { data } = await tmdb.get<MovieDetail>(`/movie/${id}`, {
    params: { append_to_response: "credits" },
    signal,
  });
  return data;
}

// Helpers
export type ImageSize = "w92" | "w185" | "w342" | "w500" | "w780" | "original";

export function getImageUrl(path: string | null, size: ImageSize = "w500") {
  return path ? `${IMAGE_BASE_URL}/${size}${path}` : null;
}

export function getReleaseYear(date?: string) {
  return date ? date.slice(0, 4) : "—";
}

export function getDirector(movie: MovieDetail) {
  return (
    movie.credits.crew.find((c) => c.job === "Director")?.name ?? "Unknown"
  );
}

export async function getGenres(signal?: AbortSignal): Promise<Genre[]> {
  const { data } = await tmdb.get<{ genres: Genre[] }>("/genre/movie/list", {
    signal,
  });
  return data.genres;
}
