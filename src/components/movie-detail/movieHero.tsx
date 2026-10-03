import { getImageUrl } from "@/services/getFilterMovies";
import type { MovieDetail } from "@/types/movie";
import { MovieInfo } from "./movieInfo";

export function MovieHero({ movie }: { movie: MovieDetail }) {
  const backdropUrl = getImageUrl(movie.backdrop_path, "w780");
  const posterUrl = getImageUrl(movie.poster_path, "w500");

  return (
    <div className="relative min-h-[580px] overflow-hidden rounded-2xl">
      {backdropUrl && (
        <img
          src={backdropUrl}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/55 to-[#09090b]/20" />

      <div className="relative flex items-end gap-8 px-6 pb-16 pt-48 lg:px-10">
        <div className="hidden w-52 shrink-0 overflow-hidden rounded-xl shadow-2xl shadow-black/60 sm:block">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`${movie.title} poster`}
              width={520}
              height={780}
              className="aspect-[2/3] w-full object-cover"
            />
          ) : (
            <div className="aspect-[2/3] w-full bg-zinc-800" />
          )}
        </div>

        <MovieInfo movie={movie} />
      </div>
    </div>
  );
}
