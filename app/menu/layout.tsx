"use client";
import { handleLogout } from "@/actions/auth";
import Sidebar from "@/components/menu/sidebar";
import { useAppStore } from "@/hooks/useAppStore";
import { MenuContext } from "@/providers/menu";
import { faBars, faExternalLink, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useContext, useTransition } from "react";

export default function AuthenticatedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isPending, startTransition] = useTransition();
    const menuContext = useContext(MenuContext);
    const { logout } = useAppStore();

    const handleLogoutClick = () => {
        logout();
        startTransition(() => handleLogout());
    };

    if (!menuContext?.user) {
        return (
            <div className="relative h-screen overflow-y-auto">{children}</div>
        );
    }

    return (
        <div className="relative h-screen bg-cover overflow-y-auto">
            <Sidebar />
            <div className="sticky top-0 left-0 z-9 p-2 bg-taupe-200 dark:bg-taupe-900">
                <div className="flex items-center justify-between p-4 shadow-lg bg-taupe-200 dark:bg-taupe-600 rounded-lg">
                    <FontAwesomeIcon
                        className="cursor-pointer"
                        icon={faBars}
                        onClick={() => {
                            menuContext?.setShowMenu(true);
                        }}
                    />
                    <h1 className="text-md font-bold text-center text-taupe-600 dark:text-taupe-200">
                        {menuContext?.title}
                    </h1>
                    <FontAwesomeIcon
                        className="cursor-pointer"
                        icon={faSignOut}
                        onClick={handleLogoutClick}
                    />
                </div>
            </div>
            <div className="pt-0">{children}</div>
        </div>
    );
}
