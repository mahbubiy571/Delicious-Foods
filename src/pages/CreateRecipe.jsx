import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";

function CreateRecipe() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.target);
    const title = formData.get("title");
    const cookingTime = formData.get("cookingTime");
    const ingredients = formData.get("ingredients");
    const method = formData.get("method");
    const mainImage = formData.get("mainImage");
    const gallery = [
      formData.get("image1"),
      formData.get("image2"),
      formData.get("image3"),
      formData.get("image4"),
    ].filter((img) => img.trim() !== "");

    const recipe = {
      title,
      cookingTime,
      ingredients: ingredients.split(",").map((i) => i.trim()),
      method,
      mainImage,
      gallery,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "recipes"), recipe);
      toast.success("✅ Recipe qo‘shildi!");
      e.target.reset();
      navigate("/recipes");
    } catch (err) {
      console.error("Error adding recipe:", err);
      toast.error("❌ Xatolik yuz berdi!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-6 px-3 flex justify-center items-start">
      <div className="w-full max-w-6xl rounded-2xl shadow-2xl p-5 sm:p-8 relative">
        <Link
          to="/"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2 px-2.5 sm:px-3 py-2 
           bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-md 
           hover:scale-110 transition-all duration-300 text-sm sm:text-base"
        >
          <AiOutlineHome size={18} className="sm:size-5" />
        </Link>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-start sm:text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6 sm:mb-8">
          🍳 Create New Recipe
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          <div className="space-y-4 sm:space-y-5">
            <h3 className="text-lg sm:text-xl font-semibold text-indigo-700 border-b pb-2">
              General Info
            </h3>
            <input
              name="title"
              type="text"
              placeholder="Recipe Title"
              className="input input-bordered w-full rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 text-sm sm:text-base"
              required
            />
            <input
              name="cookingTime"
              type="number"
              placeholder="Cooking Time (mins)"
              className="input input-bordered w-full rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
              required
            />
            <input
              name="ingredients"
              type="text"
              placeholder="Ingredients (comma separated)"
              className="input input-bordered w-full rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 text-sm sm:text-base"
              required
            />
            <textarea
              name="method"
              placeholder="Cooking Method"
              rows="6"
              className="textarea textarea-bordered w-full rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
              required
            />
          </div>

          <div className="space-y-4 sm:space-y-5">
            <h3 className="text-lg sm:text-xl font-semibold text-indigo-700 border-b pb-2">
              Images
            </h3>
            <input
              name="mainImage"
              type="url"
              placeholder="Main Image URL"
              className="input input-bordered w-full rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 text-sm sm:text-base"
              required
            />

            <p className="font-medium text-gray-600 mt-2 sm:mt-3">
              Gallery Images
            </p>
            <div className="grid grid-cols-2 gap-3">
              <input
                name="image1"
                type="url"
                placeholder="Image URL 1"
                className="input input-bordered rounded-lg text-sm sm:text-base"
              />
              <input
                name="image2"
                type="url"
                placeholder="Image URL 2"
                className="input input-bordered rounded-lg text-sm sm:text-base"
              />
              <input
                name="image3"
                type="url"
                placeholder="Image URL 3"
                className="input input-bordered rounded-lg text-sm sm:text-base"
              />
              <input
                name="image4"
                type="url"
                placeholder="Image URL 4"
                className="input input-bordered rounded-lg text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="md:col-span-2 flex justify-center mt-4 sm:mt-6">
            <button
              type="submit"
              disabled={submitting}
              className={`btn w-full md:w-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-base sm:text-lg font-semibold rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 ${
                submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? "Creating..." : "✨ Create Recipe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateRecipe;
