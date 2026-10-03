import { vi } from 'vitest'
import { IMAGE_BASE_URL, tmdb } from '@/services'
import {
    getDirector,
    getImageUrl,
    getMovieDetail,
    getMoviesByCategory,
    getReleaseYear,
    searchMovies,
} from '@/services/getFilterMovies'
import type { MovieCategory, MovieDetail } from '@/types/movie'

// Replace the axios instance so no real request is made.
// '@/services' is the same module your file imports as '.'
vi.mock('@/services', () => ({
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
    tmdb: { get: vi.fn() },
}))

const mockGet = vi.mocked(tmdb.get)

const page = (n = 1) => ({
    page: n,
    results: [{ id: n, title: `Movie ${n}` }],
    total_pages: 5,
    total_results: 100,
})

beforeEach(() => {
    vi.resetAllMocks()
})

describe('getMoviesByCategory', () => {
    it.each<MovieCategory>(['now_playing', 'popular', 'top_rated', 'upcoming'])(
        'calls /movie/%s with the page and returns the data',
        async (category) => {
            const data = page(2)
            mockGet.mockResolvedValue({ data } as never)

            const result = await getMoviesByCategory(category, 2)

            expect(mockGet).toHaveBeenCalledWith(`/movie/${category}`, {
                params: { page: 2 },
                signal: undefined,
            })
            expect(result).toEqual(data)
        },
    )

    it('defaults to page 1', async () => {
        mockGet.mockResolvedValue({ data: page() } as never)

        await getMoviesByCategory('popular')

        expect(mockGet).toHaveBeenCalledWith('/movie/popular', {
            params: { page: 1 },
            signal: undefined,
        })
    })

    it('forwards the abort signal', async () => {
        mockGet.mockResolvedValue({ data: page() } as never)
        const { signal } = new AbortController()

        await getMoviesByCategory('popular', 1, signal)

        expect(mockGet).toHaveBeenCalledWith('/movie/popular', {
            params: { page: 1 },
            signal,
        })
    })

    it('rejects when the request fails', async () => {
        mockGet.mockRejectedValue(new Error('Network Error'))

        await expect(getMoviesByCategory('popular')).rejects.toThrow('Network Error')
    })
})

describe('searchMovies', () => {
    it('calls /search/movie with query and page', async () => {
        const data = page(3)
        mockGet.mockResolvedValue({ data } as never)

        const result = await searchMovies('batman', 3)

        expect(mockGet).toHaveBeenCalledWith('/search/movie', {
            params: { query: 'batman', page: 3 },
            signal: undefined,
        })
        expect(result).toEqual(data)
    })

    it('defaults to page 1', async () => {
        mockGet.mockResolvedValue({ data: page() } as never)

        await searchMovies('batman')

        expect(mockGet).toHaveBeenCalledWith('/search/movie', {
            params: { query: 'batman', page: 1 },
            signal: undefined,
        })
    })

    it('rejects when the request fails', async () => {
        mockGet.mockRejectedValue(new Error('Request failed with status code 401'))

        await expect(searchMovies('batman')).rejects.toThrow('401')
    })
})

describe('getMovieDetail', () => {
    it('requests the movie with credits appended', async () => {
        const data = { id: 550, title: 'Fight Club' }
        mockGet.mockResolvedValue({ data } as never)

        const result = await getMovieDetail(550)

        expect(mockGet).toHaveBeenCalledWith('/movie/550', {
            params: { append_to_response: 'credits' },
            signal: undefined,
        })
        expect(result).toEqual(data)
    })

    it('accepts a string id (from the URL)', async () => {
        mockGet.mockResolvedValue({ data: {} } as never)

        await getMovieDetail('123')

        expect(mockGet).toHaveBeenCalledWith('/movie/123', {
            params: { append_to_response: 'credits' },
            signal: undefined,
        })
    })

    it('rejects when the movie is not found', async () => {
        mockGet.mockRejectedValue(new Error('Request failed with status code 404'))

        await expect(getMovieDetail('abc')).rejects.toThrow('404')
    })
})

describe('getImageUrl', () => {
    it('uses w500 by default', () => {
        expect(getImageUrl('/poster.jpg')).toBe(`${IMAGE_BASE_URL}/w500/poster.jpg`)
    })

    it('uses the given size', () => {
        expect(getImageUrl('/poster.jpg', 'w342')).toBe(
            `${IMAGE_BASE_URL}/w342/poster.jpg`,
        )
        expect(getImageUrl('/poster.jpg', 'original')).toBe(
            `${IMAGE_BASE_URL}/original/poster.jpg`,
        )
    })

    it('returns null when there is no path', () => {
        expect(getImageUrl(null)).toBeNull()
    })
})

describe('getReleaseYear', () => {
    it('returns the year from a full date', () => {
        expect(getReleaseYear('2009-01-09')).toBe('2009')
    })

    it('returns a dash for an empty or missing date', () => {
        expect(getReleaseYear('')).toBe('—')
        expect(getReleaseYear(undefined)).toBe('—')
    })
})

describe('getDirector', () => {
    const withCrew = (crew: { id: number; name: string; job: string }[]) =>
        ({ credits: { cast: [], crew } }) as unknown as MovieDetail

    it('returns the name of the Director', () => {
        const movie = withCrew([
            { id: 1, name: 'Writer Person', job: 'Writer' },
            { id: 2, name: 'Jane Director', job: 'Director' },
        ])

        expect(getDirector(movie)).toBe('Jane Director')
    })

    it('returns the first Director when there are several', () => {
        const movie = withCrew([
            { id: 1, name: 'First Director', job: 'Director' },
            { id: 2, name: 'Second Director', job: 'Director' },
        ])

        expect(getDirector(movie)).toBe('First Director')
    })

    it('returns Unknown when there is no Director', () => {
        expect(getDirector(withCrew([]))).toBe('Unknown')
        expect(
            getDirector(withCrew([{ id: 1, name: 'Writer Person', job: 'Writer' }])),
        ).toBe('Unknown')
    })
})