import { Link } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";

export default function Recipes() {
  const { data: recipes, loading } = useCollection("recipes", true);

  const handleDelete = async (id) => {
    if (window.confirm("🗑 Ushbu recipe-ni o‘chirmoqchimisiz?")) {
      try {
        await deleteDoc(doc(db, "recipes", id));
        toast.success("✅ Recipe o‘chirildi!");
      } catch (err) {
        console.error("Error deleting recipe:", err);
        toast.error("❌ O‘chirishda xatolik yuz berdi!");
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-80">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!recipes?.length)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-4 text-center">
        <p className="font-semibold text-lg sm:text-xl max-w-sm">
          😔 No recipes found
        </p>
      </div>
    );

  return (
    <div className="min-h-screen py-10 sm:py-14 px-4 sm:px-6 md:px-10 lg:px-16">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-10 sm:mb-12 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
        🍴 Our Delicious Recipes
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="group rounded-3xl backdrop-blur-md shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 overflow-hidden border border-gray-700/60 bg-white/200"
          >
            <div className="relative">
              <img
                src={recipe.mainImage}
                alt={recipe.title}
                className="w-full h-48 sm:h-56 md:h-60 object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs sm:text-sm font-medium px-3 py-1 rounded-full shadow-md">
                  ⏱ {recipe.cookingTime} mins
                </span>

                <button
                  onClick={() => handleDelete(recipe.id)}
                  className="group relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 
                             bg-gradient-to-tr from-red-400 via-rose-500 to-pink-600 
                            text-white rounded-full shadow-md hover:shadow-lg 
                             hover:rotate-90 hover:scale-110 transition-all duration-300"
                  title="Delete recipe"
                >
                  <AiOutlineClose
                    size={20}
                    className="transition-transform duration-300 group-hover:scale-125"
                  />
                  <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <h3 className="font-extrabold text-lg sm:text-xl md:text-2x mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                {recipe.title}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed line-clamp-3">
                {recipe.method.slice(0, 100)}...
              </p>
            </div>

            <div className="px-5 sm:px-6 pb-5 sm:pb-6 flex justify-between gap-3">
              <Link
                to={`/recipe/${recipe.id}`}
                className="w-full text-center py-2 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 text-white rounded-full font-semibold shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300 text-sm sm:text-base"
              >
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
