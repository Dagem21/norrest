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
