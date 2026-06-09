"use client";

import { createContext, ReactNode, useState } from "react";

interface MenuContextType {
    showMenu: boolean;
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
}

// 2. Create the context with a default value
export const MenuContext = createContext<MenuContextType | undefined>(undefined);

// 3. Create the Provider component
interface MenuProviderProps {
    children: ReactNode; // Allows wrapping other components
}

export const MenuProvider = ({ children }: MenuProviderProps) => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");

    return (
        <MenuContext.Provider value={{ showMenu, setShowMenu, title, setTitle }}>
            {children}
        </MenuContext.Provider>
    );
};
