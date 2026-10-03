import { CATEGORIES } from "@/constants/categories";
import type { MovieCategory } from "@/types/movie";

interface CategoryTabsProps {
  /** null while a search is active, so no tab is highlighted */
  active: MovieCategory | null;
  onChange: (category: MovieCategory) => void;
}

export function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-1 overflow-x-auto rounded-lg bg-zinc-900 p-1">
      {CATEGORIES.map((category) => (
        <button
          key={category.value}
          onClick={() => onChange(category.value)}
          aria-pressed={active === category.value}
          className={`whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium transition ${
            active === category.value
              ? "bg-zinc-700 text-white"
              : "text-zinc-500 hover:text-white"
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
