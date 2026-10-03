import axios from "axios";

export const IMAGE_BASE_URL =
  import.meta.env.VITE_TMDB_IMAGE_URL ?? "https://image.tmdb.org/t/p";

export const tmdb = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL ?? "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    Accept: "application/json",
  },
});
