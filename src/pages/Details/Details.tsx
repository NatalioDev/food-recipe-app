import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../utilites/ContextRecipe";
import { getRecipeById } from "../../services/recipeService";



const Details = () => {

  // Obtenemos el parámetro "id" desde la URL
  const { id } = useParams<{id: string}>();
  const context = useContext(GlobalContext);

  // Validación de que el contexto esté disponible
  if(!context) {
    throw new Error("Details must be used within a GlobalProvider");
  }

  // Destructuramos las funciones y estados del contexto global
  const{
    recipeDetailsData,
    setRecipeDetailsData,
    favoritesList,
    handleAddToFavorite,
  } = context;

  // Hook para obtener los detalles de la receta al cargar el componente
  useEffect(() =>{
    const fetchRecipeDetails = async () =>{
      try{
        // Petición a la API para obtener detalles de la receta
        const data = await getRecipeById(id!);

        // Guardamos los datos obtenidos en el estado global
        if(data?.data?.recipe){
          setRecipeDetailsData(data.data.recipe);
        };
      }catch(e){
        console.error("Error fetching recipe details:",e)
      }
    }
    if(id){
      fetchRecipeDetails();
    }
  },[id, setRecipeDetailsData])



  return (
    <div className="container mx-auto py-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
      {/* Imagen de la receta */}
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeDetailsData?.image_url}
            alt={recipeDetailsData?.title}
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
      </div>
      {/* Detalles de la receta */}
      <div className="flex flex-col gap-3">
        {/* Fecha de publicación */}
        <span className="text-sm text-cyan-700 font-medium">
          {recipeDetailsData?.publisher}
        </span>
        {/* Título de la receta */}
        <h3 className="font-bold text-2xl truncate text-black">
          {recipeDetailsData?.title}
        </h3>
        {/* Botón para agregar o quitar de favoritos */}
        <button 
          className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white"
            onClick={() => handleAddToFavorite(recipeDetailsData!)}
        >
          {favoritesList.some((item) => item.id === recipeDetailsData?.id)
          ? "Remove from favorites"
          : "Add to favorites"
        }
        </button>
        {/* Lista de ingredientes */}
        <div>
          <span className="text-2xl font-semibold text-black">
            Ingredients:
          </span>
          <ul className="flex flex-col gap-3">
            {recipeDetailsData?.ingredients.map((ingredient, index) =>(
              <li key={index}>
                <span className="text-lg font-medium text-black">
                  {ingredient.quantity ?? "-"} {ingredient.unit} {ingredient.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Details
