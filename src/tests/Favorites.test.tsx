import { describe, expect, it, vi } from "vitest"; // Importamos herramientas de prueba de Vitest.
import { GlobalContext } from "../utilites/ContextRecipe"; // Importamos el contexto global.
import { render, screen } from "@testing-library/react"; // Herramientas para renderizar componentes y acceder al DOM.
import Favorites from "../pages/Favorites/Favorites"; // El componente que vamos a testear.
import { Recipe } from "../types/Recipe"; // Importamos el tipo de datos Recipe.

// **Simulamos el componente ItemRecipe**
// Queremos evitar renderizar el componente completo. En su lugar, simulamos un comportamiento básico.
// Cuando ItemRecipe se usa, simplemente renderiza un div con el título del item.
vi.mock("../components/ItemRecipe", () => ({
  default: ({ item }: { item: Recipe }) => (
    <div data-testid="item-recipe">{item?.title}</div>
  ),
}));

// **Definimos los tests para el componente Favorites**
describe("Favorites Component", () => {
  // **Creamos un mock del contexto**
  // Este objeto simula el valor del GlobalContext que `Favorites` necesita.
  const mockContextValue = {
    searchParam: "",
    loading: false,
    recipeList: [],
    recipeDetailsData: null,
    favoritesList: [], // Inicialmente vacío para probar el primer caso.
    setSearchParam: vi.fn(), // Simulamos funciones del contexto.
    handleSubmit: vi.fn(async () => {}),
    setRecipeDetailsData: vi.fn(),
    handleAddToFavorite: vi.fn(),
  };

  // **Primer test: Verifica que se muestra un mensaje cuando no hay favoritos.**
  it("should render a message when favoritesList is empty", () => {
    // Renderizamos el componente envolviéndolo con un proveedor de contexto simulado.
    render(
      <GlobalContext.Provider value={mockContextValue}>
        <Favorites />
      </GlobalContext.Provider>
    );

    // Verificamos que el mensaje "Nothing is added in favorites." aparece en el DOM.
    expect(
      screen.getByText("Nothing is added in favorites.")
    ).toBeInTheDocument(); // Si el mensaje no está, el test fallará.
  });

  // **Segundo test: Verifica que se renderiza correctamente una lista de favoritos.**
  it("should render a list of favorite items", () => {
    // Simulamos que el contexto tiene una lista de favoritos.
    const mockFavorites = [
      {
        id: "1",
        title: "Recipe 1",
        publisher: "Publisher 1",
        source_url: "",
        image_url: "",
      },
      {
        id: "2",
        title: "Recipe 2",
        publisher: "Publisher 2",
        source_url: "",
        image_url: "",
      },
    ];

    // Renderizamos el componente con el contexto actualizado.
    render(
      <GlobalContext.Provider
        value={{
          ...mockContextValue, // Incluimos las propiedades previas.
          favoritesList: mockFavorites, // Sobrescribimos `favoritesList` con datos.
        }}
      >
        <Favorites />
      </GlobalContext.Provider>
    );

    // Accedemos a los elementos renderizados con el data-testid "item-recipe".
    const items = screen.getAllByTestId("item-recipe");

    // Verificamos que la cantidad de elementos renderizados es igual a la cantidad de favoritos.
    expect(items).toHaveLength(2);

    // Verificamos que los textos de los elementos son los correctos.
    expect(items[0]).toHaveTextContent("Recipe 1");
    expect(items[1]).toHaveTextContent("Recipe 2");
  });

  // **Tercer test: Verifica que lanza un error si el contexto no está disponible.**
  it("should throw an error if context is not provided", () => {
    // Deshabilitamos temporalmente console.error para evitar mensajes en la consola durante este test.
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    // Intentamos renderizar el componente sin el contexto y verificamos que lanza un error.
    expect(() => render(<Favorites />)).toThrow(
      "Home must be used within a GlobalProvider"
    );

    // Restauramos console.error para no afectar otros tests.
    spy.mockRestore();
  });
});
