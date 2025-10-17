import { useParams, Link } from "react-router-dom";
import useDocument from "../hooks/useDocument";

export default function RecipeDetail() {
  const { id } = useParams();
  const { data: recipe, loading } = useDocument("recipes", id);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!recipe) return <p className="text-center mt-10">Recipe not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Link to="/" className="text-blue-500 hover:underline">
        ← Back to Recipes
      </Link>

      <h1 className="text-3xl font-bold">{recipe.title}</h1>
      <p className="text-gray-600">Cooking Time: {recipe.cookingTime} mins</p>

      <img
        src={recipe.mainImage}
        alt={recipe.title}
        className="w-full rounded-xl shadow-md"
      />

      <h2 className="text-xl font-semibold mt-4">Ingredients:</h2>
      <ul className="list-disc list-inside text-gray-700">
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-4">Method:</h2>
      <p className="text-gray-700">{recipe.method}</p>

      {recipe.gallery?.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-4">Gallery:</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {recipe.gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Gallery ${i + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
