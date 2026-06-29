"use client";
import { userTypes } from "@/assets/enums/enum";
import { MenuContext } from "@/providers/menu";
import { faBuilding, faClose, faGear, faHome, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import { ReactNode, useContext } from "react";

type MenuItem = {
    label: string;
    href: string;
    icon?: ReactNode;
    userType?: userTypes[];
};

const menuItems: MenuItem[] = [
    {
        label: "Home",
        href: "/dashboard",
        icon: <FontAwesomeIcon icon={faHome} size="xs" />,
        userType: [userTypes.Customer, userTypes.Buisness],
    },
    {
        label: "Orders",
        href: "/orders",
        icon: <FontAwesomeIcon icon={faUtensils} size="xs" />,
        userType: [userTypes.Customer, userTypes.Buisness],
    },
    {
        label: "Company",
        href: "/company",
        icon: <FontAwesomeIcon icon={faBuilding} size="xs" />,
        userType: [userTypes.Buisness],
    },
    {
        label: "Settings",
        href: "/settings",
        icon: <FontAwesomeIcon icon={faGear} size="xs" />,
        userType: [userTypes.Customer, userTypes.Buisness],
    },
];

const Sidebar = () => {
    const pathname = usePathname();
    const menuContext = useContext(MenuContext);

    return (
        <div
            className={`fixed min-h-screen w-full max-w-96 bg-taupe-200 dark:bg-taupe-900 me-6 rounded-e-lg top-0 left-0 z-10 
                transform transition-transform duration-300 ease-in-out shadow-lg shadow-taupe-800
                ${menuContext?.showMenu ? "translate-x-0" : "-translate-x-full"}`}
        >
            <aside className="h-full text-taupe-300 p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full object-cover border border-gray-600 flex items-center justify-center text-gray-400">
                            {menuContext?.user?.firstName?.slice(0, 1)}
                        </span>
                        <span className="text-sm">
                            Welcome,{" "}
                            <span className="text-blue-500 font-bold text-sm">
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
                <hr className="mb-4 text-taupe-400" />
                <nav>
                    <ul className="flex flex-col gap-2">
                        {menuItems
                            .filter((item) => item.userType?.includes(menuContext?.user?.type))
                            .map((item) => (
                                <li key={item.href} className="my-2">
                                    <a
                                        href={item.href}
                                        className={`${pathname.startsWith(item.href) && "font-bold"}`}
                                    >
                                        {item.icon && (
                                            <span
                                                className={`me-4 p-2 rounded-full ${pathname.startsWith(item.href) ? "text-taupe-900 bg-taupe-200" : "shadow shadow-taupe-500"}`}
                                            >
                                                {item.icon}
                                            </span>
                                        )}
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
