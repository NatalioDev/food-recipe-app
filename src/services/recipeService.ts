import axios from "axios";
import { Recipe, RecipeDetailsResponse, RecipeResponse } from "../types/Recipe";

const API_URL = "https://forkify-api.herokuapp.com/api/v2";

export const searchRecipesByIngredient = async (searchParam: string) : Promise<Recipe[]> => {
    try{
    const response = await axios.get<RecipeResponse>(`${API_URL}/recipes?search=${searchParam}`);
    
    console.log(response)
    
    return response.data?.data?.recipes || [];


    }catch (error){
        console.error("Error fetching recipes: ",error);
        throw error;
    }
    
};

export const getRecipeById = async (id:string) : Promise<RecipeDetailsResponse> => {
    try{
        const response = await axios.get<RecipeDetailsResponse>(`${API_URL}/recipes/${id}`)

        console.log(response)

        // Devolvemos directamente el objeto completo
        return response.data
    }catch(e){
        console.error("Error fetching recipe deteails",e);
        throw e;
    };
};
