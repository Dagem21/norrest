"use client";
import { MenuContext } from "@/providers/menu";
import { faBuilding, faClose, faGear, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useContext } from "react";

type MenuItem = {
    label: string;
    href: string;
    icon?: ReactNode;
};

const menuItems: MenuItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: <FontAwesomeIcon icon={faHome} /> },
    { label: "Company", href: "/company", icon: <FontAwesomeIcon icon={faBuilding} /> },
    { label: "Settings", href: "/settings", icon: <FontAwesomeIcon icon={faGear} /> },
];

const Sidebar = () => {
    const menuContext = useContext(MenuContext);
    return (
        <div
            className={`fixed min-h-screen w-full max-w-96 bg-taupe-900 me-6 rounded-e-lg top-0 left-0 z-10 
                transform transition-transform duration-300 ease-in-out shadow-lg shadow-taupe-800
                ${menuContext?.showMenu ? "translate-x-0" : "-translate-x-full"}`}
        >
            <aside className="h-full text-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full object-cover border border-gray-600 flex items-center justify-center text-gray-400">
                            N
                        </span>
                        <span className="sidebar__title">
                            Welcome,{" "}
                            <span className="text-blue-500 font-bold text-lg">
                                {menuContext?.user?.firstName}
                            </span>
                        </span>
                    </div>
                    <FontAwesomeIcon
                        className="cursor-pointer"
                        icon={faClose}
                        onClick={() => {
                            menuContext?.setShowMenu(false);
                        }}
                    />
                </div>
                <hr className="mb-6 text-gray-600" />
                <nav className="sidebar__nav">
                    <ul className="sidebar__list">
                        {menuItems.map((item) => (
                            <li key={item.href} className="my-2">
                                <a href={item.href} className="font-bold">
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
