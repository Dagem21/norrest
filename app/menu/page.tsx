"use client";

import MenuItem from "@/components/menuItem";
import { MenuContext } from "@/providers/menu";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import ViewMenuItem from "@/components/forms/menu/viewMenuItem";
import Button from "@/components/ui/button";
import profile from "../../assets/images/fi3.png";

export default function Branch() {
    const menuContext = useContext(MenuContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState({
        price: 500.0,
        name: "Pizza",
        categories: "Breakfast",
        description: "breakfast food",
        image: profile,
        discount: 0.1,
    });

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
                                <div onClick={() => setModalOpen(true)}>
                                    <MenuItem
                                        price={500.0}
                                        name="Pizza"
                                        categories="Breakfast"
                                        description="breakfast food"
                                        image={profile}
                                    />
                                </div>
                                <div onClick={() => setModalOpen(true)}>
                                    <MenuItem
                                        price={500.0}
                                        name="Pizza"
                                        categories="Breakfast"
                                        description="breakfast food"
                                        image={profile}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ViewMenuItem isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <div className="flex flex-col p-2 cursor-pointer">
                    <div className="flex items-center flex-wrap shadow-lg">
                        <div>
                            <Image className="w-screen sm:max-w-sm rounded-lg object-cover" src={selectedItem?.image} alt={selectedItem?.name} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-between my-2">
                        <div className="flex items-center justify-between tracking-wide">
                            <h1 className="text-md font-bold">{selectedItem?.name}</h1>
                            <div className="flex items-center gap-2">
                                <span
                                    className={`${selectedItem?.discount ? "text line-through text-xs text-taupe-400" : "font-bold text-sm text-taupe-200"}`}
                                >
                                    $ {selectedItem?.price} Birr
                                </span>
                                {selectedItem?.discount && (
                                    <span className="font-bold text-sm text-taupe-200">
                                        $ {selectedItem?.price - selectedItem?.price * selectedItem?.discount} Birr
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">{selectedItem?.description}</p>
                            <p className="text-xs">{selectedItem?.categories}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 my-2">
                        <Button text="Order Now" />
                        <Button text="Add to Orders" style="secondary" />
                    </div>
                </div>
            </ViewMenuItem>
        </div>
    );
}
