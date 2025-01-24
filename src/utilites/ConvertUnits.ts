const unitMap: Record<string, string> ={
    tsp: "Teaspoon",
    tbsp: "Tablespoon",
    cup: "Cup",
    oz: "Ounce",
    lb: "Pound",
    g: "Gram",
    kg: "Kilogram",
    ml: "Milliliter",
    l: "Liter",
    pinch: "Pinch",
}

export function convertUnit(abbreviation: string): string{
    return unitMap[abbreviation] || abbreviation;
}