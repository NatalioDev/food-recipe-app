import { useContext } from "react"
import { GlobalContext } from "../../utilites/ContextRecipe"
import ItemRecipe from "../../components/ItemRecipe";

const Favorites = () => {

  const context = useContext(GlobalContext);

  if(!context){
    throw new Error("Home must be used within a GlobalProvider");
  }

  const { favoritesList } = context;

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {favoritesList && favoritesList.length > 0 ? (
        favoritesList.map((item) => <ItemRecipe item={item} />)
      ):(
        <div>
          <p className="text-xl text-center text-black font-extrabold lg:text-4xl">
            Nothing is added in favorites.
          </p>
        </div>
      )}
    </div>
  )
}

export default Favorites
