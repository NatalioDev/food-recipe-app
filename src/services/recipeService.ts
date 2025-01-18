import axios from "axios";
import { Recipe, RecipeResponse } from "../types/Recipe";

const API_URL = "https://forkify-api.herokuapp.com/api/v2";

export const searchRecipesByIngredient = async (searchParam: string) : Promise<Recipe[]> => {
    try{
    const response = await axios.get<RecipeResponse>(`${API_URL}/recipes?search=${searchParam}`);
    return response.data?.data?.recipes || [];

    }catch (error){
        console.error("Error fetching recipes: ",error);
        throw error;
    }
};

