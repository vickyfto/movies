import { MovieCard } from "@/components/MovieCard";
import type { Movie } from "@/types/movie";

const GRID_CLASS =
  "grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-5";

export function MovieGrid({ movies }: { movies: Movie[] }) {
  return (
    <div className={GRID_CLASS}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie as any} />
      ))}
    </div>
  );
}

export function MovieGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className={GRID_CLASS} aria-busy="true">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="space-y-3">
          <div className="aspect-[2/3] animate-pulse rounded-2xl bg-zinc-900" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-900" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-zinc-900" />
        </div>
      ))}
    </div>
  );
}
