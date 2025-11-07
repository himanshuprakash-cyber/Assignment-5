import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Submit() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [instructions, setInstructions] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const ingredients = ingredientsText.split("\n").map((line) => {
      const [name, quantity] = line.split("|").map((s) => s.trim());
      return { name, quantity };
    });

    try {
      const res = await api.post("/recipes", {
        title,
        description,
        ingredients,
        instructions,
      });
      alert("Recipe submitted successfully!");
      navigate(`/recipes/${res.data._id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to submit recipe");
    }
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Submit a Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border p-2 rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description"
          className="w-full border p-2 rounded"
        />
        <textarea
          value={ingredientsText}
          onChange={(e) => setIngredientsText(e.target.value)}
          placeholder="Ingredients (one per line, e.g., Flour | 2 cups)"
          className="w-full border p-2 rounded h-28"
        />
        <textarea
          required
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Instructions"
          className="w-full border p-2 rounded h-36"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
