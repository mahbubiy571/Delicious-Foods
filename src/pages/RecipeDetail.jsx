import { useParams, Link } from "react-router-dom";
import useDocument from "../hooks/useDocument";

export default function RecipeDetail() {
  const { id } = useParams();
  const { data: recipe, loading } = useDocument("recipes", id);

  if (loading)
    return (
      <div className="flex justify-center items-center h-80">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!recipe)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-semibold text-xl">🚫 Recipe not found</p>
      </div>
    );

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-5xl mx-auto bg-white/200 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-700/60">
        <div className="relative">
          <img
            src={recipe.mainImage}
            alt={recipe.title}
            className="w-full h-72 sm:h-80 md:h-[380px] object-cover hover:scale-[1.02] transition-transform duration-700"
          />

          <Link
            to="/recipes"
            className="absolute top-4 left-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md text-gray-800 dark:text-gray-100 text-sm sm:text-base font-medium px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300"
          >
            ← Back
          </Link>

          <div className="absolute bottom-4 right-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold px-4 py-2 rounded-full shadow-lg text-sm sm:text-base">
            ⏱ {recipe.cookingTime} mins
          </div>
        </div>

        <div className="p-6 sm:p-8 md:p-10 space-y-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent drop-shadow-md">
            {recipe.title}
          </h1>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              🥗{" "}
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Ingredients
              </span>
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 leading-relaxed">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-pink-500">•</span> {ing}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              👩‍🍳{" "}
              <span className="bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
                Method
              </span>
            </h2>
            <p className="leading-relaxed text-justify sm:text-lg">
              {recipe.method}
            </p>
          </section>

          {recipe.gallery?.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                📸
                <span className="bg-gradient-to-r from-indigo-500 to-pink-600 bg-clip-text text-transparent">
                  Gallery
                </span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {recipe.gallery.map((img, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transform hover:scale-[1.05] transition-all duration-500"
                  >
                    <img
                      src={img}
                      alt={`Gallery ${i + 1}`}
                      className="w-full h-32 sm:h-40 md:h-44 object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="flex justify-center pt-2">
            <Link
              to="/recipes"
              className="px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
            >
              ← Back to Recipes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
