import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Browse from "./pages/Browse";
import Submit from "./pages/Submit";
import ViewRecipe from "./pages/ViewRecipe";
import EditRecipe from "./pages/EditRecipe";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            🍳 RecipeShare
          </Link>
          <div className="space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Browse
            </Link>
            <Link
              to="/submit"
              className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition"
            >
              Submit Recipe
            </Link>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <main className="flex-1 max-w-5xl mx-auto p-6 w-full">
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/recipes/:id" element={<ViewRecipe />} />
          <Route path="/recipes/:id/edit" element={<EditRecipe />} />
          <Route
            path="*"
            element={
              <div className="text-center text-gray-600 text-lg mt-20">
                404 — Page Not Found
              </div>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-3 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} RecipeShare — Developed with ❤️ using MERN
      </footer>
    </div>
  );
}

