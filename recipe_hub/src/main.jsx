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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPhEcbkiySYg38JEVK-nUmzNJ08hdzfz0",
  authDomain: "recipehub-2822d.firebaseapp.com",
  projectId: "recipehub-2822d",
  storageBucket: "recipehub-2822d.appspot.com",
  messagingSenderId: "397137383460",
  appId: "1:397137383460:web:ec732284465758e4e308b1",
  measurementId: "G-RB0QG4M7EZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log("Firebase added!", app, analytics);
