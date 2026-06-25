import { useEffect, useState } from "react";
import food from "../../../assets/images/fi3.png";
import Button from "@/components/ui/button";
import { useCartStore } from "@/hooks/useCartStore";
import OrderItem from "@/components/orderItem";

type ViewOrderProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function ViewOrder({ isOpen, onClose }: ViewOrderProps) {
    const {
        carts,
        activeCartId,
        addToActiveCart,
        createNewCart,
        deleteCart,
        removeFromActiveCart,
        setActiveCart,
    } = useCartStore();

    const activeCart = carts[activeCartId];
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
            setIsVisible(true);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className={`fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-2 shadow-lg transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
            onClick={onClose}
        >
            <div
                className={`w-full max-w-lg max-h-[90vh] rounded-2xl bg-taupe-200 dark:bg-taupe-600 shadow-xl transition-all duration-300 ease-out transform flex flex-col ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                onClick={(event) => event.stopPropagation()}
            >
                <div className="px-2 py-5 overflow-auto" style={{ maxHeight: "calc(90vh - 72px)" }}>
                    <h1 className="flex-1 text-md font-semibold text-center text-taupe-600 dark:text-taupe-200">
                        Your Orders
                    </h1>
                    {activeCart?.items?.length > 0 && <div>
                        {
                            (
                                activeCart?.items.map((cartItem: any, index) => (
                                    <div key={index}>
                                        <OrderItem
                                            id={cartItem?.item?._id}
                                            price={cartItem?.item?.price}
                                            name={cartItem?.item?.name}
                                            categories={cartItem?.item?.category?.join(", ")}
                                            description={cartItem?.item?.ingredients}
                                            image={food}
                                            quantity={cartItem?.quantity}
                                            removeFromCart={removeFromActiveCart}
                                        />
                                    </div>
                                ))
                            )
                        }
                        <div className="flex items-center justify-center mt-2">
                            <Button text="Order" />
                            <Button text="Clear" style="secondary"
                                onClick={() => {
                                    deleteCart(activeCartId)
                                }} />
                        </div>
                    </div>
                    }
                    {!activeCart?.items?.length && (
                        <div>
                            <h1 className="text-sm text-center">Your cart is empty.</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
