import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [ingredientsText, setIngredientsText] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/recipes/${id}`);
        setRecipe(res.data);
        setIngredientsText(
          res.data.ingredients
            .map((it) => `${it.name} | ${it.quantity || ""}`)
            .join("\n")
        );
      } catch (err) {
        console.error(err);
        alert("Failed to load recipe");
      }
    }
    load();
  }, [id]);

  async function handleSave(e) {
    e.preventDefault();
    try {
      const ingredients = ingredientsText.split("\n").map((line) => {
        const [name, quantity] = line.split("|").map((s) => s.trim());
        return { name, quantity };
      });
      await api.put(`/recipes/${id}`, {
        ...recipe,
        ingredients,
      });
      alert("Recipe updated");
      navigate(`/recipes/${id}`);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  }

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-3">Edit Recipe</h2>
      <form onSubmit={handleSave} className="space-y-3">
        <input
          value={recipe.title}
          onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <textarea
          value={recipe.description}
          onChange={(e) =>
            setRecipe({ ...recipe, description: e.target.value })
          }
          className="w-full border p-2 rounded"
        />
        <textarea
          value={ingredientsText}
          onChange={(e) => setIngredientsText(e.target.value)}
          className="w-full border p-2 rounded h-28"
        />
        <textarea
          value={recipe.instructions}
          onChange={(e) =>
            setRecipe({ ...recipe, instructions: e.target.value })
          }
          className="w-full border p-2 rounded h-36"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
