import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ViewRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  async function fetchRecipe() {
    try {
      const res = await api.get(`/recipes/${id}`);
      setRecipe(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load recipe");
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this recipe?")) return;
    try {
      await api.delete(`/recipes/${id}`);
      alert("Recipe deleted");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  }

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{recipe.title}</h2>
          <div className="text-sm text-gray-500">
            {recipe.author || "Anonymous"} •{" "}
            {new Date(recipe.createdAt).toLocaleString()}
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/recipes/${id}/edit`}
            className="px-3 py-1 bg-yellow-500 rounded"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>

      <p className="mt-3 text-gray-700">{recipe.description}</p>

      <h3 className="mt-4 font-semibold">Ingredients</h3>
      <ul className="list-disc pl-6">
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>
            {ing.name} {ing.quantity && ` - ${ing.quantity}`}
          </li>
        ))}
      </ul>

      <h3 className="mt-4 font-semibold">Instructions</h3>
      <div className="whitespace-pre-line text-gray-700">
        {recipe.instructions}
      </div>
    </div>
  );
}

