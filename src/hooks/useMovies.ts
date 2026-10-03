import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import type { MovieCategory } from '@/types/movie'
import { getMovieDetail, getMoviesByCategory, searchMovies } from '@/services/getFilterMovies'
import { getGenres } from '@/services/getFilterMovies'

// TMDB only serves up to page 500
const MAX_PAGES = 500

export const movieKeys = {
    all: ['movies'] as const,
    list: (category: MovieCategory) => [...movieKeys.all, 'list', category] as const,
    search: (query: string) => [...movieKeys.all, 'search', query] as const,
    detail: (id: string | number) => [...movieKeys.all, 'detail', String(id)] as const,
}

interface UseInfiniteMoviesParams {
    category: MovieCategory
    query?: string
}

/**
 * Infinite list of movies.
 * - With a non-empty `query` it calls GET /search/movie
 * - Otherwise it calls GET /movie/{category}
 * Usage: const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteMovies(...)
 */
export function useInfiniteMovies({ category, query = '' }: UseInfiniteMoviesParams) {
    const trimmed = query.trim()
    const isSearch = trimmed.length > 0

    return useInfiniteQuery({
        queryKey: isSearch ? movieKeys.search(trimmed) : movieKeys.list(category),
        queryFn: ({ pageParam, signal }) =>
            isSearch
                ? searchMovies(trimmed, pageParam, signal)
                : getMoviesByCategory(category, pageParam, signal),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.page < Math.min(lastPage.total_pages, MAX_PAGES)
                ? lastPage.page + 1
                : undefined,
    })
}

/** GET /movie/{id}?append_to_response=credits */
export function useMovieDetail(id: string | undefined) {
    return useQuery({
        queryKey: movieKeys.detail(id ?? ''),
        queryFn: ({ signal }) => getMovieDetail(id!, signal),
        enabled: Boolean(id),
    })
}

export function useGenres() {
    return useQuery({
        queryKey: ['genres'],
        queryFn: ({ signal }) => getGenres(signal),
        staleTime: Infinity, // the genre list almost never changes
    })
}