"use client";

import { MenuContext } from "@/providers/menu";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Orders() {
    const searchParams = useSearchParams();
    const orderStatus = searchParams.get("status");
    const menuContext = useContext(MenuContext);

    useEffect(() => {
        menuContext?.setTitle(`
            ${orderStatus === "pending" ? "Pending" : orderStatus === "incoming" ? "Incoming" : "All"} Orders
        `);
    });

    return (
        <div className="flex flex-col flex-1 items-center">
            <div className="flex flex-col w-full">
                <div className="bg-taupe-200 dark:bg-taupe-600 rounded-lg p-2 cursor-pointer hover:bg-taupe-300 dark:hover:bg-taupe-500 transition duration-300">
                    <div className="p-2">
                        <h1 className="text-sm text-center text-taupe-600 dark:text-taupe-200">
                            No incoming orders!
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
