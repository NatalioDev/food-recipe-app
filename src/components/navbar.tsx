import { useContext } from "react"
import { GlobalContext } from "../utilites/ContextRecipe"
import { NavLink } from "react-router-dom";

const navbar = () => {

    const context = useContext(GlobalContext);

    if(!context){
        throw new Error("Navbar must be used within a GlobalProvider");
    }

    const { searchParam, setSearchParam, handleSubmit} = context;

    console.log(searchParam);

  return (
    <nav 
        className="flex justify-between items-center py-8 container mx-auto flex-col gap-5 lg:flex-row lg:gap-0"
    >
        <h2 className="text-2xl font-semibold">
            <NavLink to={"/"}>Food Recipe</NavLink>
        </h2>
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="search" 
                value={searchParam}
                placeholder="Enter Items..."
                onChange={(e) => setSearchParam(e.target.value)}
                className="bg-white/75 p-3 px-8 rounded-full outline-none shadow-lg shadow-red-100 focus:shadow-red-200 lg:w-96 "
            />
        </form>
        <ul className="flex gap-5">
            <li>
                <NavLink
                    to="/"
                    className={({isActive}) => 
                    isActive ? "text-red-500" : "text-black hover:text-gray-700 duration-300"}
                >
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/favorites"
                    className={({isActive}) => 
                    isActive ? "text-red-500" : "text-black hover:text-gray-700 duration-300"}
                >
                    Favorites
                </NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default navbar
