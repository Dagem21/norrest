import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import menuItemSchema from "@/yup/menu/menuItem";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

const categories = [
    "Appetizer",
    "Entree",
    "Dessert",
    "Drink",
    "Vegan",
    "Gluten Free",
];

export default function MenuItemForm() {
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm({
        resolver: yupResolver(menuItemSchema),
        mode: "onChange",
    });

    const menuItemPicture = watch("picture");

    const handleRegister = (data: any) => {
        console.log("New menu item:", data);
    };

    return (
        <form onSubmit={handleSubmit(handleRegister)} className="max-w-md mx-auto flex flex-col gap-4">
            <div>
                <label htmlFor="name" className="block mb-2 text-xs">
                    Name
                </label>
                <Input
                    placeholder="Type here..."
                    {...register("name")}
                    error={errors?.name}
                />
            </div>

            <div>
                <label htmlFor="price" className="block mb-2 text-xs">
                    Price
                </label>
                <Input
                    placeholder="Type here..."
                    {...register("price")}
                    error={errors?.price}
                />
            </div>

            <div>
                <label htmlFor="ingredients" className="block mb-2 text-xs">
                    Ingredients
                </label>
                <textarea
                    className="w-full p-2 outline-none rounded-md accent-taupe-900 border border-gray-400 rounded-md transition duration-300 ease shadow-sm 
                        hover:border-slate-300 focus-within:border-slate-400 focus-within:shadow"
                    {...register("ingredients")}
                    rows={4}
                />
            </div>

            <fieldset className="border border-gray-400 p-3 rounded-lg">
                <legend className="mb-2 text-xs">Category</legend>
                <div className="grid grid-cols-3 gap-2">
                    {categories.map((category, i) => (
                        <div className="flex items-start" key={i}>
                            <div className="flex items-center h-5">
                                <Input
                                    id={category}
                                    type="checkbox"
                                    value={category}
                                    {...register("category")}
                                />
                            </div>
                            <label
                                htmlFor="remember"
                                className="ms-2 text-sm text-taupe-800 dark:text-taupe-300"
                            >
                                {category}
                            </label>
                        </div>
                    ))}
                </div>
            </fieldset>

            <div className="grid gap-4 mb-4 md:grid-cols-2">
                <div>
                    <label htmlFor="website" className="block mb-2.5 text-xs">
                        Company Picture (Logo)
                    </label>
                    <Input
                        type="file"
                        placeholder="Type here..."
                        {...register("picture")}
                        error={errors?.picture}
                    />
                </div>
                <div>
                    {Object.values(menuItemPicture ?? {})?.length > 0 && (
                        <div className="flex items-center justify-center">
                            <Image
                                src={URL.createObjectURL((menuItemPicture as any)?.[0])}
                                alt={"Menu Item Image"}
                                width={50}
                                height={50}
                            />
                        </div>
                    )}
                </div>
            </div>

            <Button type="submit" text="Add Menu Item" />
        </form>
    );
}
