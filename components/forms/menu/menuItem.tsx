import { useState } from "react";

const categories = [
    "Appetizer",
    "Entree",
    "Dessert",
    "Drink",
    "Vegan",
    "Gluten Free",
];

export default function MenuItemForm() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategories((current) =>
            current.includes(category)
                ? current.filter((item) => item !== category)
                : [...current, category]
        );
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const menuItem = {
            name,
            price: parseFloat(price) || 0,
            ingredients,
            categories: selectedCategories,
        };

        console.log("New menu item:", menuItem);

        setName("");
        setPrice("");
        setIngredients("");
        setSelectedCategories([]);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col gap-4">
            <div>
                <label htmlFor="name" className="block mb-2">
                    Name
                </label>
                <input
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-white-500"
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="price" style={{ display: "block", marginBottom: 8 }}>
                    Price
                </label>
                <input
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-white-500"
                    id="price"
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="ingredients" style={{ display: "block", marginBottom: 8 }}>
                    Ingredients
                </label>
                <textarea
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-white-500"
                    id="ingredients"
                    value={ingredients}
                    onChange={(event) => setIngredients(event.target.value)}
                    rows={4}
                />
            </div>

            <fieldset className="border p-3 rounded-lg">
                <legend className="mb-2">Category</legend>
                <div className="grid grid-cols-3 gap-2">
                    {categories.map((category) => (
                        <label key={category} className="block mb-2">
                            <input
                                className="mr-2 leading-tight"
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                            />
                            {category}
                        </label>
                    ))}
                </div>
            </fieldset>

            <button type="submit" className="bg-taupe-700 hover:bg-taupe-500 text-white font-bold py-2 px-4 rounded-lg">
                Add Menu Item
            </button>
        </form>
    );
}
