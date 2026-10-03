export type MovieCategory = 'now_playing' | 'popular' | 'top_rated' | 'upcoming'

export interface Movie {
    id: number
    title: string
    overview: string
    poster_path: string | null
    backdrop_path: string | null
    release_date: string
    vote_average: number
}

export interface PaginatedResponse<T> {
    page: number
    results: T[]
    total_pages: number
    total_results: number
}

export interface Genre {
    id: number
    name: string
}

export interface CastMember {
    id: number
    name: string
    character: string
    profile_path: string | null
    order: number
}

export interface CrewMember {
    id: number
    name: string
    job: string
    department: string
    profile_path: string | null
}

export interface MovieDetail extends Movie {
    tagline: string
    runtime: number | null
    genres: Genre[]
    credits: {
        cast: CastMember[]
        crew: CrewMember[]
    }
}