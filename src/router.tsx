import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import HomePage from "./pages/homePage";
import NotFound from "./pages/notFoundPage";
import { MovieDetailPage } from "./pages/movieDetailPage";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movie/:id", element: <MovieDetailPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
