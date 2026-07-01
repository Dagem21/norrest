"use client";

import { MenuContext } from "@/providers/menu";
import { useContext, useEffect } from "react";

export default function Dashboard() {
    const menuContext = useContext(MenuContext);

    useEffect(() => {
        menuContext?.setTitle("Dashboard");
    });
    return (
        <div className="flex flex-col flex-1 items-center">
            <div className="flex flex-col w-full">
                <div className="flex justify-center pb-2">
                    <div className="flex items-center overflow-x-auto">
                        <div className="flex gap-2 justify-between w-fit">
                            <div className="w-50 bg-taupe-200 dark:bg-taupe-600 rounded-lg p-2">
                                <h1 className="text-sm text-center text-taupe-600 dark:text-taupe-200">
                                    Restaurants
                                </h1>
                                <div className="pt-2">
                                    <h1 className="text-md font-bold text-center text-taupe-600 dark:text-taupe-200">
                                        0
                                    </h1>
                                </div>
                            </div>
                            <div className="w-50 bg-taupe-200 dark:bg-taupe-600 rounded-lg p-2">
                                <h1 className="text-sm text-center text-taupe-600 dark:text-taupe-200">
                                    Branches
                                </h1>
                                <div className="pt-2">
                                    <h1 className="text-md font-bold text-center text-taupe-600 dark:text-taupe-200">
                                        0
                                    </h1>
                                </div>
                            </div>
                            <div className="w-50 bg-taupe-200 dark:bg-taupe-600 rounded-lg p-2">
                                <h1 className="text-sm text-center text-taupe-600 dark:text-taupe-200">
                                    Orders
                                </h1>
                                <div className="pt-2">
                                    <h1 className="text-md font-bold text-center text-taupe-600 dark:text-taupe-200">
                                        0
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center gap-2 w-full">
                    <div className="h-70 w-screen sm:w-2/7 bg-taupe-200 dark:bg-taupe-600 rounded-lg">
                        aasdfsdf
                    </div>
                    <div className="h-70 w-screen sm:w-2/7 bg-taupe-200 dark:bg-taupe-600 rounded-lg">
                        aasdfsdf
                    </div>
                    <div className="h-70 w-screen sm:w-2/7 bg-taupe-200 dark:bg-taupe-600 rounded-lg">
                        aasdfsdf
                    </div>
                </div>
            </div>
        </div>
    );
}
