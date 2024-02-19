import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginPage from "./pages/LoginPage.jsx";
import RecipeDetailsPage from "./pages/RecipeDetailsPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import RecipeListPage from "./pages/RecipeListPage.jsx";
import UnderConstructionPage from "./pages/UnderConstructionPage.jsx";
import CreateRecipePage from "./pages/CreateRecipePage.jsx";

const isAuthenticated = false; // Add your authentication logic here

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/newUpdate",
    element: isAuthenticated ? <CreateRecipePage /> : <LoginPage />,
  },
  {
    path: "/underConstruction",
    element: isAuthenticated ? <UnderConstructionPage /> : <LoginPage />,
  },
  {
    path: "/recipeList",
    element: isAuthenticated ? <RecipeListPage /> : <LoginPage />,
  },
  {
    path: "/recipe",
    element: isAuthenticated ? <RecipeDetailsPage /> : <LoginPage />,
  },
  {
    path: "/",
    element: isAuthenticated ? <LandingPage /> : <LoginPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
