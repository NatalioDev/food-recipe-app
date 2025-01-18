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