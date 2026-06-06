"use client";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Company() {
    return (
        <div className="flex flex-col flex-1 items-center font-sans">
            <div className="flex flex-col w-full h-screen">
                <div className="flex flex-wrap justify-center gap-2 w-full">
                    <div className="h-fit w-screen sm:w-2/7">
                        <div className="p-2 bg-taupe-200 dark:bg-taupe-600 rounded-lg">
                            <h1 className="text-sm font-bold text-center text-taupe-600 dark:text-taupe-200">
                                Incoming Orders
                            </h1>
                            <hr className="m-3 border-taupe-500 dark:border-taupe-400" />
                            <div className="pb-2">
                                <h1 className="text-sm text-center text-taupe-600 dark:text-taupe-200">
                                    No orders yet.
                                </h1>
                            </div>
                        </div>
                        <div className="mt-2 p-2 bg-taupe-200 dark:bg-taupe-600 rounded-lg">
                            <h1 className="text-sm font-bold text-center text-taupe-600 dark:text-taupe-200">
                                Pending Orders
                            </h1>
                            <hr className="m-3 border-taupe-500 dark:border-taupe-400" />
                            <div className="pb-2">
                                <h1 className="text-sm text-center text-taupe-600 dark:text-taupe-200">
                                    No orders yet.
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="relative flex flex-col gap-2 w-screen h-fit sm:w-4/7">
                        <div className="p-2 bg-taupe-200 dark:bg-taupe-600 rounded-lg">
                            <div>
                                <FontAwesomeIcon
                                    className="absolute top-2 right-2 cursor-pointer"
                                    icon={faPlus}
                                    size="lg"
                                />
                            </div>
                            <h1 className="text-sm font-bold text-center text-taupe-600 dark:text-taupe-200">
                                Menu
                            </h1>
                            <hr className="m-3 border-taupe-500 dark:border-taupe-400" />
                            <div className="pb-2">
                                <h1 className="text-sm text-center text-taupe-600 dark:text-taupe-200">
                                    No items in menu.
                                </h1>
                            </div>
                        </div>
                        <div className="flex gap-2 flex-wrap justify-center">
                            <div className="flex-1 bg-taupe-200 dark:bg-taupe-600 rounded-lg p-2 cursor-pointer hover:bg-taupe-300 dark:hover:bg-taupe-500 transition duration-300">
                                <h1 className="text-sm text-start text-taupe-600 dark:text-taupe-200">
                                    All Orders
                                </h1>
                                <div className="p-2">
                                    <h1 className="text-sm font-bold text-center text-taupe-600 dark:text-taupe-200">
                                        0
                                    </h1>
                                </div>
                            </div>
                            <div className="flex-1 bg-taupe-200 dark:bg-taupe-600 rounded-lg p-2 cursor-pointer hover:bg-taupe-300 dark:hover:bg-taupe-500 transition duration-300">
                                <h1 className="text-sm text-start text-taupe-600 dark:text-taupe-200">
                                    Employees
                                </h1>
                                <div className="p-2">
                                    <h1 className="text-sm font-bold text-center text-taupe-600 dark:text-taupe-200">
                                        0
                                    </h1>
                                </div>
                            </div>
                            <div className="flex-1 bg-taupe-200 dark:bg-taupe-600 rounded-lg p-2 cursor-pointer hover:bg-taupe-300 dark:hover:bg-taupe-500 transition duration-300">
                                <h1 className="text-sm text-start text-taupe-600 dark:text-taupe-200">
                                    All Orders
                                </h1>
                                <div className="p-2">
                                    <h1 className="text-sm font-bold text-center text-taupe-600 dark:text-taupe-200">
                                        0
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
