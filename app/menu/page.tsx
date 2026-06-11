"use client";

import MenuItem from "@/components/menuItem";
import { MenuContext } from "@/providers/menu";
import { useContext, useEffect } from "react";
import profile from "../../assets/images/radblu.jpg";
import Image from "next/image";

export default function Branch() {
    const menuContext = useContext(MenuContext);

    useEffect(() => {
        menuContext?.setTitle("Company Name");
    });

    return (
        <div className="flex flex-col flex-1 items-center bg-taupe-100 dark:bg-taupe-900 p-2">
            <div className="flex flex-col w-full">
                <div className="flex flex-wrap justify-center gap-2 w-full">
                    <div className="relative flex flex-col gap-2 w-screen h-fit sm:w-4/7">
                        <div className="bg-taupe-200 dark:bg-taupe-600 p-2 rounded-lg flex flex-col items-center">
                            <Image
                                className="w-15 h-15 object-cover"
                                src={profile}
                                alt={"Company profile"}
                            />
                            <h1 className="text-md font-bold">{"Company Name"}</h1>
                        </div>
                        <div className="p-2 bg-taupe-200 dark:bg-taupe-600 rounded-lg">
                            <h1 className="text-sm font-semibold text-center text-taupe-600 dark:text-taupe-200">
                                Menu
                            </h1>
                            <hr className="m-3 border-taupe-500 dark:border-taupe-400" />
                            {/* <div className="pb-2">
                                <h1 className="text-sm text-center text-taupe-600 dark:text-taupe-200">
                                    No items in menu.
                                </h1>
                            </div> */}
                            <div className="flex flex-col gap-2">
                                <MenuItem
                                    price={500.0}
                                    name="Pizza"
                                    categories="Breakfast"
                                    description="breakfast food"
                                    image={profile}
                                />
                                <MenuItem
                                    price={500.0}
                                    name="Pizza"
                                    categories="Breakfast"
                                    image={profile}
                                    discount={0.1}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
