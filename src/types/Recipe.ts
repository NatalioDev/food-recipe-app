export interface Recipe {
    id: string;
    title: string;
    publisher: string;
    source_url: string;
    image_url: string;
}

export interface RecipeResponse {
    data: {
        recipes: Recipe[];
    };
}

export interface RecipeItem {
  item: Recipe | null;
}


// Definir el tipo del estado extendido con `ingredients`
export interface RecipeDetails extends Recipe {
  ingredients: {
      quantity: number | null;
      unit: string;
      description: string;
  }[];
}

// Interfaz para definir la estructura de la respuesta a la API
export interface RecipeDetailsResponse {
    data:{
      recipe: Recipe & {
        ingredients: {
          quantity: number | null;
          unit: string;
          description: string;
        }[];
      };
    };
  };