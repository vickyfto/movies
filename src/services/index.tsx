import axios from "axios";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
// THIS SHOULD BE IN ENV FILE, BUT I PUT IT HERE FOR TESTING PORPUSE
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzhkMmFiNTZkNzhlZjQwZmNmMDBiODA0ZTA2OGU3MyIsIm5iZiI6MTU5NzM3MDM4My4xMzY5OTk4LCJzdWIiOiI1ZjM1ZjAwZmM0ZjU1MjAwMzIwYWI1OWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.J58Y0hftP3-aZxOVgzz22GEBpkSdY0RV6n7e-UwJ-Aw";

export const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    Accept: "application/json",
  },
});
