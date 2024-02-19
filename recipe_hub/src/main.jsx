import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RecipeDetailsPage from "./pages/RecipeDetailsPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import RecipeListPage from "./pages/RecipeListPage.jsx";
import UnderConstructionPage from "./pages/UnderConstructionPage.jsx";
import CreateRecipePage from "./pages/CreateRecipePage.jsx";

const router = createBrowserRouter([
  {
    path: "/myList",
    element: <RecipeListPage />,
  },
  {
    path: "/myForkedList",
    element: <RecipeListPage />,
  },
  {
    path: "/newUpdate",
    element: <CreateRecipePage />,
  },
  {
    path: "/underConstruction",
    element: <UnderConstructionPage />,
  },
  {
    path: "/recipeList",
    element: <RecipeListPage />,
  },
  {
    path: "/recipe",
    element: <RecipeDetailsPage />,
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
