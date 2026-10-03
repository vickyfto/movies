import { useParams } from "react-router";
import { useMovieDetail } from "@/hooks/useMovies";
import { MovieHero } from "@/components/movie-detail/movieHero";
import { CastList } from "@/components/movie-detail/castList";
import { BackLink } from "@/components/movie-detail/backLink";

export function MovieDetailPage() {
  const { id } = useParams();
  const { data: movie, isLoading, isError } = useMovieDetail(id);

  function renderContent() {
    if (isLoading) {
      return (
        <div className="min-h-[580px] animate-pulse rounded-2xl bg-zinc-900" />
      );
    }

    if (isError || !movie) {
      return (
        <div className="rounded-2xl border border-zinc-800 p-10 text-center">
          <p className="text-lg font-medium">Couldn't load this movie.</p>
          <p className="mt-2 text-sm text-zinc-400">
            Check your connection or try another title.
          </p>
        </div>
      );
    }

    return (
      <>
        <MovieHero movie={movie} />
        <CastList cast={movie.credits?.cast ?? []} />
      </>
    );
  }

  return (
    <div className="px-6 lg:px-10">
      <BackLink />
      {renderContent()}
    </div>
  );
}
