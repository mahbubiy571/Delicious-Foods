import { Link } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";

export default function Recipes() {
  const { data: recipes, loading } = useCollection("recipes", true);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!recipes?.length)
    return <p className="text-center mt-10">No recipes found</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <Link
          key={recipe.id}
          to={`/recipe/${recipe.id}`}
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform"
        >
          <img
            src={recipe.mainImage}
            alt={recipe.title}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold text-lg">{recipe.title}</h3>
            <p className="text-gray-500 text-sm mt-1">
              {recipe.cookingTime} mins
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
