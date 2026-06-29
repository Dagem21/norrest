"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AppState {
    isLoggedIn: boolean;
    user: any;
    login: (userData: any) => void;
    logout: () => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            user: null,

            login: (userData: any) => set({ isLoggedIn: true, user: userData }),

            logout: () => set({ isLoggedIn: false, user: null }),
        }),
        {
            name: "app-storage",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

export const useAppStoreHydrated = () => {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const unsub = useAppStore.persist.onHydrate(() => setHydrated(false));
        const unsubFinish = useAppStore.persist.onFinishHydration(() => setHydrated(true));

        setHydrated(useAppStore.persist.hasHydrated());

        return () => {
            unsub();
            unsubFinish();
        };
    }, []);

    return hydrated;
};
