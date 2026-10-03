import { Search } from "lucide-react";
import { useLocation, useSearchParams } from "react-router";

export function Header() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("querySearch") ?? "";
  const pathname = location.pathname;

  const setQuerySearch = (value: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set("querySearch", value);
        else next.delete("querySearch");
        return next;
      },
      { replace: true },
    );
  };

  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10">
      <div className="flex items-center gap-12">
        <span className="font-serif text-2xl tracking-wide text-amber-300">
          reel<span className="text-white">house</span>
        </span>
        <nav className="hidden items-center gap-7 text-sm text-zinc-500 md:flex">
          <a className="text-white" href="#browse">
            Browse
          </a>
          <a href="#watchlist" className="transition hover:text-white">
            My watchlist
          </a>
        </nav>
      </div>
      {pathname === "/" && (
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-2.5 size-4 text-zinc-500" />
            <input
              value={query}
              onChange={(event) => setQuerySearch(event.target.value)}
              placeholder="Search movies..."
              aria-label="Search movies"
              className="h-9 w-52 rounded-full border border-zinc-800 bg-zinc-900/70 pl-9 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-amber-300/60"
            />
          </div>
          <div className="flex size-9 items-center justify-center rounded-full bg-amber-300 text-sm font-bold text-black">
            JD
          </div>
        </div>
      )}
    </header>
  );
}
