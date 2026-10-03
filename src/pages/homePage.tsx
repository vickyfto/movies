import { useSearchParams } from "react-router";
import { CATEGORIES, parseCategory } from "@/constants/categories";
import { CategoryTabs } from "@/components/CategoryTabs";
import { HeroSection } from "@/components/HeroSection";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { MovieGrid, MovieGridSkeleton } from "@/components/MovieGrid";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteMovies } from "@/hooks/useMovies";
import type { MovieCategory } from "@/types/movie";

function StateMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-zinc-800 py-20 text-center text-zinc-500">
      {children}
    </div>
  );
}

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = parseCategory(searchParams.get("category"));
  const querySearch = searchParams.get("querySearch")?.trim() ?? "";
  const debouncedQuery = useDebounce(querySearch, 400);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteMovies({ category, query: debouncedQuery });

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  // Replaces all params, so picking a tab also clears the search
  const handleCategoryChange = (next: MovieCategory) => {
    setSearchParams({ category: next });
  };

  const title = querySearch
    ? `Results for “${querySearch}”`
    : CATEGORIES.find((c) => c.value === category)?.label;

  function renderContent() {
    if (isLoading) return <MovieGridSkeleton />;
    if (isError) {
      return (
        <StateMessage>Something went wrong. Please try again.</StateMessage>
      );
    }
    if (movies.length === 0) {
      return <StateMessage>No movies found. Try another title.</StateMessage>;
    }
    return (
      <>
        <MovieGrid movies={movies} />
        <LoadMoreButton
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        />
      </>
    );
  }

  return (
    <>
      <HeroSection />

      <section id="browse" className="px-6 pb-16 lg:px-10">
        <div className="mb-8 flex flex-col justify-between gap-5 border-b border-zinc-800 pb-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              Explore
            </p>
            <h2 className="mt-2 text-2xl font-semibold">{title}</h2>
          </div>
          <CategoryTabs
            active={querySearch ? null : category}
            onChange={handleCategoryChange}
          />
        </div>

        {renderContent()}
      </section>
    </>
  );
}
