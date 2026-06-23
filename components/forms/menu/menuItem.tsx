import { categoryTypes } from "@/assets/enums/enum";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import useApiFetch from "@/hooks/useAPIFetch";
import menuItemSchema from "@/yup/menu/menuItem";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function MenuItemForm({ onFinish }: { onFinish: () => void }) {
    const params = useParams<{ bid: string }>();
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        reset,
    } = useForm({
        resolver: yupResolver(menuItemSchema),
        mode: "onChange",
        defaultValues: {
            branchID: params?.bid,
        },
    });

    const {
        data,
        fetchData,
        isLoading,
        errors: errorsAdd,
    } = useApiFetch(
        {
            url: "/api/at/menu/add",
            method: "POST",
        },
        false,
    );

    const menuItemPicture = watch("picture");

    const handleRegister = (data: any) => {
        const formData = new FormData();
        formData.append("branchID", data?.branchID);
        formData.append("name", data?.name);
        formData.append("price", data?.price);
        formData.append("ingredients", data?.ingredients);
        formData.append("category", JSON.stringify(data?.category));
        formData.append("picture", data?.picture[0]);

        fetchData({ data: formData });
    };

    useEffect(() => {
        if (!isLoading && data) {
            onFinish();
            reset();
        } else if (!isLoading && errorsAdd?.details) {
            alert(errorsAdd?.details?.response?.data?.error);
        }
    }, [data, isLoading, errorsAdd]);

    return (
        <form
            onSubmit={handleSubmit(handleRegister)}
            className="max-w-md mx-auto flex flex-col gap-4"
        >
            <div>
                <label htmlFor="name" className="block mb-2 text-xs">
                    Name
                </label>
                <Input placeholder="Type here..." {...register("name")} error={errors?.name} />
            </div>

            <div>
                <label htmlFor="price" className="block mb-2 text-xs">
                    Price
                </label>
                <Input placeholder="Type here..." {...register("price")} error={errors?.price} />
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
                <legend className="text-xs">Category</legend>
                <div className="flex flex-col gap-2">
                    {Object.values(categoryTypes).map((category, i) => (
                        <div className="flex items-start" key={i}>
                            <div className="flex items-center h-5">
                                <Input
                                    id={category.toString()}
                                    type="checkbox"
                                    value={category}
                                    {...register("category")}
                                />
                            </div>
                            <label
                                htmlFor="remember"
                                className="ms-2 text-sm text-taupe-800 dark:text-taupe-300 text-nowrap"
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
                        Picture
                    </label>
                    <Input
                        type="file"
                        {...register("picture")}
                        error={errors?.picture}
                    />
                </div>
                <div>
                    {Object.values(menuItemPicture ?? {})?.length > 0 && (
                        <div className="flex items-center justify-center shadow h-full">
                            <Image
                                src={URL.createObjectURL((menuItemPicture as any)?.[0])}
                                alt={"Menu Item Image"}
                                width={70}
                                height={70}
                            />
                        </div>
                    )}
                </div>
            </div>

            <Button
                type="submit"
                text={`${isLoading ? "Adding Item" : "Add Menu Item"}`}
                disabled={isLoading}
            />
        </form>
    );
}
