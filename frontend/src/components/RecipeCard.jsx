import React from "react";
import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <div className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-lg border border-gray-100 overflow-hidden flex flex-col">
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {recipe.title}
        </h3>
        {recipe.description && (
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {recipe.description}
          </p>
        )}

        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {recipe.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="text-xs text-gray-500 mt-auto">
          {recipe.author || "Anonymous"} •{" "}
          {new Date(recipe.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div className="bg-gray-50 border-t px-5 py-3 text-right">
        <Link
          to={`/recipes/${recipe._id}`}
          className="text-sm bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700 transition"
        >
          View Recipe →
        </Link>
      </div>
    </div>
  );
}
