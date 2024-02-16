import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RecipeDetails from "./pages/RecipeDetails.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import RecipeList from "./pages/RecipeList.jsx";
import UnderConstructionPage from "./pages/UnderConstructionPage.jsx";

const router = createBrowserRouter([
  {
    path: "/underConstruction",
    element: <UnderConstructionPage />,
  },
  {
    path: "/recipeList",
    element: <RecipeList />,
  },
  {
    path: "/recipe",
    element: <RecipeDetails />,
  },
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
