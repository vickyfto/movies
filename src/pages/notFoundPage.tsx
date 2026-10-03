import { ArrowLeft, Clapperboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#09090b] px-6 text-white">
      <section className="flex max-w-lg flex-col items-center text-center">
        <div className="mb-8 flex size-16 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10 text-amber-300">
          <Clapperboard className="size-8" aria-hidden="true" />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-300">
          Scene missing
        </p>
        <h1 className="mt-4 font-serif text-6xl leading-none tracking-tight sm:text-8xl">
          404
        </h1>
        <h2 className="mt-6 text-2xl font-semibold">
          This reel is out of frame.
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-500">
          The page you are looking for does not exist, or it has moved to
          another screening.
        </p>
        <Button
          asChild
          className="mt-8 gap-2 bg-amber-300 text-black hover:bg-amber-200"
        >
          <Link to="/">
            <ArrowLeft data-icon="inline-start" />
            Back to browse
          </Link>
        </Button>
        <span className="mt-16 font-serif text-xl tracking-wide text-amber-300">
          reel<span className="text-white">house</span>
        </span>
      </section>
    </main>
  );
}
