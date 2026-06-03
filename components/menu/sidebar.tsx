"use client";
import { MenuContext } from "@/providers/menu";
import { useContext, useState } from "react";

type MenuItem = {
    label: string;
    href: string;
    icon?: string;
};

const menuItems: MenuItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: "🏠" },
    { label: "Company", href: "/company", icon: "🏢" },
    { label: "Settings", href: "/settings", icon: "⚙️" },
];

const Sidebar = () => {
    const menuContext = useContext(MenuContext);
    return (
        menuContext?.showMenu &&
        <div className="fixed min-h-screen w-full max-w-96 bg-gray-900 me-6 rounded-e-lg top-0 left-0 z-10">
            <aside className="h-full text-gray-200 p-6">
                <div className="flex items-center mb-6 gap-3">
                    <span className="w-8 h-8 rounded-full object-cover border border-gray-600 flex items-center justify-center text-gray-400">
                        N
                    </span>
                    <span className="sidebar__title">
                        Welcome, <span className="text-blue-500 font-bold text-lg">Nameless</span>
                    </span>
                </div>
                <hr className="mb-6 text-gray-600" />
                <nav className="sidebar__nav">
                    <ul className="sidebar__list">
                        {menuItems.map((item) => (
                            <li key={item.href} className="my-2">
                                <a href={item.href} className="sidebar__link">
                                    {item.icon && <span className="me-2">{item.icon}</span>}
                                    <span>{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </div>
    );
};

export default Sidebar;
