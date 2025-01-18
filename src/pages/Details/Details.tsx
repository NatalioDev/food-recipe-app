import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getRecipeById } from "../../services/recipeService";

const Details = () => {

  const { id } = useParams();
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const data = await getRecipeById(id!);
      setRecipe(data);
    }
    fetchRecipe();
  },[id]);

  if (!recipe) return <p>Cargando...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full md:w-1/2 rounded my-4" />
      <h2 className="">Instructions 📝</h2>
      <p className="mt-2">{recipe.strInstructions}</p>
    </div>
  )
}

export default Details
