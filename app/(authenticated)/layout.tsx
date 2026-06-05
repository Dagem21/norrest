"use client";
import Sidebar from "@/components/menu/sidebar";
import { MenuContext } from "@/providers/menu";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

export default function AuthenticatedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const menuContext = useContext(MenuContext);
    return (
        <div className="relative min-h-full bg-cover bg-center bg-white dark:bg-taupe-900">
            <Sidebar />
            <div className="sticky top-0 left-0 z-9 p-2 bg-white dark:bg-taupe-900">
                <div className="flex items-center justify-between p-4 shadow-lg bg-taupe-100 dark:bg-taupe-700 rounded-lg">
                    <FontAwesomeIcon
                        className="cursor-pointer"
                        icon={faBars}
                        onClick={() => {
                            menuContext?.setShowMenu(true);
                        }}
                    />
                    hello
                </div>
            </div>
            <div className="p-2 pt-0">{children}</div>
        </div>
    );
}
