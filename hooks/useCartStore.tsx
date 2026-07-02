import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Item {
    item: any;
    quantity: number;
    id?: string;
}

export interface Carts {
    [cartId: string]: { items: Item[]; name: string; id: string, userID: string };
}

interface CartState {
    carts: Carts;
    activeCartId: string;
    setActiveCart: (cartId: string) => void;
    createNewCart: (cartId: string, name: string) => void;
    deleteCart: (cartId: string) => void;
    addToActiveCart: (item: Item) => void;
    updateCartID: (id: string | null, cartID?: string, userID?: string) => void;
    updateItemFromActiveCart: (productId: string, id: string | null) => void;
    removeFromActiveCart: (productId: string) => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            carts: {},
            activeCartId: "",

            setActiveCart: (cartId) => set({ activeCartId: cartId }),

            createNewCart: (cartId, name) =>
                set((state: any) => {
                    if (state.carts[cartId]) return {};
                    return {
                        carts: { ...state.carts, [cartId]: { items: [], name } },
                        activeCartId: cartId,
                    };
                }),

            deleteCart: (cartId) =>
                set((state: any) => {
                    const newCarts = { ...state.carts };
                    delete newCarts[cartId];

                    const remainingIds = Object.keys(newCarts);
                    const fallbackId = remainingIds.includes(state.activeCartId)
                        ? state.activeCartId
                        : remainingIds[0];

                    return {
                        carts: newCarts,
                        activeCartId: fallbackId,
                    };
                }),

            updateCartID: (id, cartID, userID) =>
                set((state: any) => {
                    const activeId = cartID || state.activeCartId;
                    const currentCart = state.carts[activeId] || { items: [] };

                    return {
                        carts: {
                            ...state.carts,
                            [activeId]: { ...currentCart, id, userID },
                        },
                    };
                }),

            addToActiveCart: (product) =>
                set((state: any) => {
                    const activeId = state.activeCartId;
                    const currentCart = state.carts[activeId] || { items: [] };
                    const existingItem = currentCart.items.find(
                        (item: any) => item.item?._id === product.item?._id,
                    );

                    let updatedCart: Item[];
                    if (existingItem) {
                        updatedCart = currentCart.items.map((item: any) =>
                            item.item?._id === product.item?._id
                                ? { ...item, quantity: item.quantity + product.quantity }
                                : item,
                        );
                    } else {
                        updatedCart = [...currentCart.items, product];
                    }

                    return {
                        carts: {
                            ...state.carts,
                            [activeId]: { ...currentCart, items: updatedCart },
                        },
                    };
                }),

            updateItemFromActiveCart: (productId, id) =>
                set((state: any) => {
                    const activeId = state.activeCartId;
                    const currentCart = state.carts[activeId] || { items: [] };

                    return {
                        carts: {
                            ...state.carts,
                            [activeId]: {
                                ...currentCart,
                                items: currentCart?.items?.map((item: any) => {
                                    return item.item?._id === productId ? { ...item, id } : item;
                                }),
                            },
                        },
                    };
                }),
            removeFromActiveCart: (productId) =>
                set((state: any) => {
                    const activeId = state.activeCartId;
                    const currentCart = state.carts[activeId] || { items: [] };

                    return {
                        carts: {
                            ...state.carts,
                            [activeId]: {
                                ...currentCart,
                                items: currentCart.items.filter(
                                    (item: any) => item.item?._id !== productId,
                                ),
                            },
                        },
                    };
                }),
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
