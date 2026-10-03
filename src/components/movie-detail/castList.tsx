import { getImageUrl } from "@/services/getFilterMovies";
import type { CastMember } from "@/types/movie";

interface CastListProps {
  cast: CastMember[];
  limit?: number;
}

export function CastList({ cast, limit = 10 }: CastListProps) {
  const members = cast.slice(0, limit);
  if (members.length === 0) return null;

  return (
    <section className="mt-12 pb-12">
      <h2 className="mb-5 font-serif text-2xl">Main cast</h2>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {members.map((person) => {
          const photo = getImageUrl(person.profile_path, "w185");
          return (
            <li key={`${person.id}-${person.character}`} className="space-y-2">
              {photo ? (
                <img
                  src={photo}
                  alt={person.name}
                  loading="lazy"
                  className="aspect-[2/3] w-full rounded-md object-cover"
                />
              ) : (
                <div className="aspect-[2/3] w-full rounded-md bg-zinc-800" />
              )}
              <p className="text-sm font-medium">{person.name}</p>
              <p className="text-xs text-zinc-500">{person.character}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
