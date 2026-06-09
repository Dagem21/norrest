"use client";

import MenuItemForm from "@/components/forms/menu/menuItem";
import Modal from "@/components/ui/modal";
import { MenuContext } from "@/providers/menu";
import { faGear, faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function Branch() {
    const [isModalOpen, setModalOpen] = useState(false);
    const menuContext = useContext(MenuContext);

    useEffect(() => {
        menuContext?.setTitle("Company Name");
    });

    return (
        <div className="flex flex-col flex-1 items-center">
            <div className="flex flex-col w-full">
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
                        <div className="flex gap-2 mt-2">
                            <Link
                                className="flex-1 p-2 flex flex-col items-center bg-taupe-200 dark:bg-taupe-600 rounded-lg cursor-pointer hover:bg-taupe-300 dark:hover:bg-taupe-500 transition duration-300"
                                href={`/company/${1}/settings`}
                            >
                                <FontAwesomeIcon className="m-2" icon={faGear} size="lg" />
                                <h1 className="text-sm font-bold text-center text-taupe-600 dark:text-taupe-200">
                                    Settings
                                </h1>
                            </Link>
                            <Link
                                className="flex-1 p-2 flex flex-col items-center bg-taupe-200 dark:bg-taupe-600 rounded-lg cursor-pointer hover:bg-taupe-300 dark:hover:bg-taupe-500 transition duration-300"
                                href={`/company/${1}/employees`}
                            >
                                <FontAwesomeIcon className="m-2" icon={faUsers} size="lg" />
                                <h1 className="text-sm font-bold text-center text-taupe-600 dark:text-taupe-200">
                                    Employees
                                </h1>
                            </Link>
                        </div>
                    </div>
                    <div className="relative flex flex-col gap-2 w-screen h-fit sm:w-4/7">
                        <div className="p-2 bg-taupe-200 dark:bg-taupe-600 rounded-lg">
                            <div>
                                <FontAwesomeIcon
                                    className="absolute top-2 right-2 cursor-pointer"
                                    icon={faPlus}
                                    size="lg"
                                    onClick={() => setModalOpen(true)}
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
                            <Link
                                className="flex-1 bg-taupe-200 dark:bg-taupe-600 rounded-lg p-2 cursor-pointer hover:bg-taupe-300 dark:hover:bg-taupe-500 transition duration-300"
                                href={`/company/${1}/orders?status=all`}
                            >
                                <h1 className="text-sm text-center text-taupe-600 dark:text-taupe-200">
                                    All Orders
                                </h1>
                                <div className="p-2">
                                    <h1 className="text-sm font-bold text-center text-taupe-600 dark:text-taupe-200">
                                        0
                                    </h1>
                                </div>
                            </Link>
                            <Link
                                className="flex-1 bg-taupe-200 dark:bg-taupe-600 rounded-lg p-2 cursor-pointer hover:bg-taupe-300 dark:hover:bg-taupe-500 transition duration-300"
                                href={`/company/${1}/orders?status=incoming`}
                            >
                                <h1 className="text-sm text-center text-taupe-600 dark:text-taupe-200">
                                    Incoming Orders
                                </h1>
                                <div className="p-2">
                                    <h1 className="text-sm font-bold text-center text-taupe-600 dark:text-taupe-200">
                                        0
                                    </h1>
                                </div>
                            </Link>
                            <Link
                                className="flex-1 bg-taupe-200 dark:bg-taupe-600 rounded-lg p-2 cursor-pointer hover:bg-taupe-300 dark:hover:bg-taupe-500 transition duration-300"
                                href={`/company/${1}/orders?status=pending`}
                            >
                                <h1 className="text-sm text-center text-taupe-600 dark:text-taupe-200">
                                    Pending Orders
                                </h1>
                                <div className="p-2">
                                    <h1 className="text-sm font-bold text-center text-taupe-600 dark:text-taupe-200">
                                        0
                                    </h1>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Add Menu Item">
                <MenuItemForm />
            </Modal>
        </div>
    );
}
