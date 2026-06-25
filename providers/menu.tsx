"use client";

import { useAppStore } from "@/hooks/useAppStore";
import { createContext, ReactNode, useEffect, useState } from "react";

interface MenuContextType {
    showMenu: boolean;
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const MenuContext = createContext<MenuContextType | undefined>(undefined);

interface MenuProviderProps {
    children: ReactNode;
}

export const MenuProvider = ({ children }: MenuProviderProps) => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [user, setUser] = useState<any>();

    const { isLoggedIn, user: userStore } = useAppStore();

    useEffect(() => {
        if (isLoggedIn && userStore) {
            setUser(userStore);
        }
    }, [isLoggedIn, userStore]);

    return (
        <MenuContext.Provider value={{ showMenu, setShowMenu, title, setTitle, user, setUser }}>
            {children}
        </MenuContext.Provider>
    );
};
