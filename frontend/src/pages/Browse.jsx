import React, { useEffect, useState } from "react";
import api from "../api/axios";
import RecipeCard from "../components/RecipeCard";

export default function Browse() {
  const [recipes, setRecipes] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    try {
      const res = await api.get("/recipes");
      setRecipes(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch recipes");
    }
  }

  const filtered = recipes.filter((r) =>
    r.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4 flex gap-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search recipes..."
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={fetchRecipes}
          className="bg-blue-600 text-white px-3 rounded"
        >
          Refresh
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 && (
          <div className="p-6 bg-white rounded shadow text-center">
            No recipes found
          </div>
        )}
        {filtered.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
