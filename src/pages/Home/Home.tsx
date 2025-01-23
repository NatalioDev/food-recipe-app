import { useContext } from "react"
import { GlobalContext } from "../../utilites/ContextRecipe"
import ItemRecipe from "../../components/ItemRecipe";


const Home = () => {
  
  // obtén el contexto global
  const context = useContext(GlobalContext);

  // Verifica que el contexto esté disponible
  if(!context){
    throw new Error("Home must be used within a GlobalProvider");
  };

  // Destructura las propiedades del contexto
  const {recipeList, loading} = context;


  if(loading) return <div>Loading... Please wait!</div>

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {recipeList && recipeList.length > 0 ? (
        recipeList.map((item) => <ItemRecipe key={item.id} item={item}/>)
      ):(
        <div>
          <p className="text-xl text-center text-black font-extrabold lg:text-4xl">
            Nothing to show. Please search something.
          </p>
        </div>
      )}
    </div>
  )
}

export default Home
