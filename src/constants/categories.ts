import type { MovieCategory } from "@/types/movie";

export const CATEGORIES: { value: MovieCategory; label: string }[] = [
    { value: "now_playing", label: "Now Playing" },
    { value: "popular", label: "Popular" },
    { value: "top_rated", label: "Top Rated" },
    { value: "upcoming", label: "Upcoming" },
];

export const DEFAULT_CATEGORY: MovieCategory = "now_playing";

export function parseCategory(value: string | null): MovieCategory {
    return CATEGORIES.find((c) => c.value === value)?.value ?? DEFAULT_CATEGORY;
}