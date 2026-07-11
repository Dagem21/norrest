"use client";

import Loading from "@/components/loadingComponent";
import { useAppStore, useAppStoreHydrated } from "@/hooks/useAppStore";
import { createContext, ReactNode, useEffect, useState } from "react";

interface MenuContextType {
    showMenu: boolean;
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
    title: ReactNode;
    setTitle: React.Dispatch<React.SetStateAction<ReactNode>>;
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const MenuContext = createContext<MenuContextType | undefined>(undefined);

interface MenuProviderProps {
    children: ReactNode;
}

export const MenuProvider = ({ children }: MenuProviderProps) => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [title, setTitle] = useState<ReactNode>("");
    const [user, setUser] = useState<any>();

    const { isLoggedIn, user: userStore } = useAppStore();
    const isHydrated = useAppStoreHydrated();

    useEffect(() => {
        if (isLoggedIn && userStore) {
            setUser(userStore);
        }
    }, [isLoggedIn, userStore]);

    if (!isHydrated) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loading loading={true} />
            </div>
        );
    }

    return (
        <MenuContext.Provider value={{ showMenu, setShowMenu, title, setTitle, user, setUser }}>
            {children}
        </MenuContext.Provider>
    );
};
