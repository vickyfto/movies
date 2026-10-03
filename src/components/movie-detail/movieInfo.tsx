import { Bookmark, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatRuntime } from "@/lib/formatRunTime";
import { getDirector, getReleaseYear } from "@/services/getFilterMovies";
import type { MovieDetail } from "@/types/movie";

export function MovieInfo({ movie }: { movie: MovieDetail }) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
        Featured film
      </p>
      <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">
        {movie.title}
      </h1>

      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-zinc-300">
        <span>{getReleaseYear(movie.release_date)}</span>
        <span className="text-zinc-600">•</span>
        <span>{formatRuntime(movie.runtime)}</span>
        {movie.genres.map((genre) => (
          <span
            key={genre.id}
            className="rounded border border-zinc-700 px-2 py-0.5"
          >
            {genre.name}
          </span>
        ))}
        {movie.vote_average > 0 && (
          <span className="flex items-center gap-1 text-amber-300">
            <Star className="size-4 fill-current" />
            {movie.vote_average.toFixed(1)}
          </span>
        )}
      </div>

      <p className="mt-6 max-w-xl text-base leading-7 text-zinc-300">
        {movie.overview || "No synopsis available."}
      </p>

      <p className="mt-4 text-sm text-zinc-400">
        Directed by <span className="text-white">{getDirector(movie)}</span>
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        <Button className="gap-2 bg-amber-300 text-black hover:bg-amber-200">
          <Play data-icon="inline-start" className="fill-current" />
          Watch trailer
        </Button>
        <Button
          variant="outline"
          className="gap-2 border-zinc-700 bg-transparent text-white hover:bg-white/10"
        >
          <Bookmark data-icon="inline-start" />
          Save
        </Button>
      </div>
    </div>
  );
}
