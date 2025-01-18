import { useState } from "react"
import { searchRecipesByIngredient } from "../../services/recipeService";
import { Link } from "react-router-dom";

const Home = () => {

  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState<any[]>([]);

  const handleSearch = async () => {
    const data = await searchRecipesByIngredient(ingredient);
    setRecipes(data || []);
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Find Recipes 🍽️</h1>
      <div className="flex gap-2 mb-6">
        <input 
          type="text" 
          value={ingredient}
          placeholder="Ej: Chicken, Tomato..."
          onChange={(e) => setIngredient(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <button 
          className="bg-sky-700 text-white px-4 py-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className=" grid grid-cols-2 md:grid-cols-4 gap-4 ">
        {recipes.map((meal) => (
          <Link
            to={`/details/${meal.idMeal}`}
            key={meal.idMeal}
          >
            <div className="border p-2 rounded shadow hover:scale-105 transition">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="rounded" />
              <p className="mt-2 font-semibold">{meal.strMeal}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
