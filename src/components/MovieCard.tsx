import { useGenres } from "@/hooks/useMovies";
import { Star } from "lucide-react";
import { Link } from "react-router";
import type { Movie } from "./type/movieCard";

export function MovieCard({ movie }: { movie: Movie }) {
  const basedURL = "https://image.tmdb.org/t/p/w500";
  const { data: genres = [] } = useGenres();

  const movieGenres =
    "genre_ids" in movie
      ? ((movie.genre_ids as number[] | undefined) ?? [])
      : [];
  const posterPath =
    (movie as { poster_path?: string | null }).poster_path ?? "";
  const voteAverage = (movie as { vote_average?: number }).vote_average ?? 0;

  const genre = movieGenres
    .map((id) => genres.find((g) => g.id === id)?.name)
    .filter((name): name is string => Boolean(name));

  return (
    <Link
      className="group text-left"
      to={`/movie/${movie.id}`}
      aria-label={`View details for ${movie.title}`}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-zinc-900 shadow-lg shadow-black/20">
        <img
          src={
            posterPath
              ? basedURL + posterPath
              : "https://placehold.co/500x750/18181b/ffffff?text=No+Poster"
          }
          alt={`${movie.title} poster`}
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 180px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs font-semibold text-amber-300 backdrop-blur">
          <Star className="size-3 fill-current" />{" "}
          {Math.round((voteAverage / 2) * 2)}
        </span>
        <span className="absolute bottom-3 left-3 rounded-md bg-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
          {(movie as { release_date?: string }).release_date?.slice(0, 4) ?? ""}
        </span>
      </div>
      <h3 className="mt-3 truncate text-sm font-semibold text-white transition group-hover:text-amber-300">
        {movie.title}
      </h3>
      <p className="mt-1 text-xs text-zinc-500">{genre.join(", ")}</p>
    </Link>
  );
}
