import { createContext, FormEvent, ReactNode, useState } from "react";
import { Recipe } from "../types/Recipe";
import { useNavigate } from "react-router-dom";
import { searchRecipesByIngredient } from "../services/recipeService";


interface GlobalContextProps {
    searchParam: string;
    loading: boolean;
    recipeList: Recipe[];
    recipeDetailsData: Recipe | null;
    favoritesList: Recipe[];
    setSearchParam: (param: string) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
    setRecipeDetailsData: (recipe: Recipe | null) => void;
    handleAddToFavorite: (item: Recipe) => void;
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalStateProps{
    children: ReactNode;
}

export const GlobalState = ({ children } : GlobalStateProps) => {

    const [searchParam, setSearchParam] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [recipeList, setRecipeList] = useState<Recipe[]>([]);
    const [recipeDetailsData, setRecipeDetailsData] = useState<Recipe | null>(null);
    const [favoritesList, setfavoritesList] = useState<Recipe[]>([]);

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const recipes = await searchRecipesByIngredient(searchParam);
            
            setRecipeList(recipes);
            setLoading(false);
            setSearchParam("");
            navigate("/");
        } catch (error) {
            console.error("Error fetching context: ",error);
            setLoading(false);
            setSearchParam("");
        }
    }

    const handleAddToFavorite = (item: Recipe) => {
        
        const isFavorite = favoritesList.some(fav => fav.id === item.id);
        setfavoritesList(prev=>
            isFavorite ? prev.filter(fav => fav.id !== item.id) : [...prev, item]
        );
    }

    return(
        <GlobalContext.Provider
            value={{
                searchParam,
                loading,
                recipeList,
                setSearchParam,
                handleSubmit,
                recipeDetailsData,
                setRecipeDetailsData,
                handleAddToFavorite,
                favoritesList,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}