import { useContext, useEffect, useState } from "react";
import food from "../../../assets/images/fi3.png";
import Button from "@/components/ui/button";
import { useCartStore } from "@/hooks/useCartStore";
import OrderItem from "@/components/orderItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import useApiFetch from "@/hooks/useAPIFetch";
import { ToastContext } from "@/providers/toastProvider";
import SigninPopup from "../signin/signinPopup";
import Modal from "@/components/ui/modal";
import QrGenerator from "@/components/QRGenerator";
import { API_URL } from "@/config";
import { useParams } from "next/navigation";
import { orderStatusTypes } from "@/assets/enums/enum";
import { MenuContext } from "@/providers/menu";

type ViewOrderProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function ViewOrder({ isOpen, onClose }: ViewOrderProps) {
    const params = useParams<{ id: string }>();
    const menuContext = useContext(MenuContext);
    const toaster = useContext(ToastContext);
    const {
        carts,
        activeCartId,
        setActiveCart,
        updateCartID,
        deleteCart,
        updateItemFromActiveCart,
        removeFromActiveCart,
    } = useCartStore();

    const activeCart = carts[activeCartId];
    const [isVisible, setIsVisible] = useState(false);
    const [isOpenSingin, setIsOpenSingin] = useState(false);
    const [isQRModalOpen, setQRModalOpen] = useState(false);

    const { data, fetchData, isLoading, errors } = useApiFetch(
        {
            url: `/api/order`,
            method: "POST",
        },
        false,
    );

    const {
        data: dataOrderUpdate,
        fetchData: fetchDataOrderUpdate,
        isLoading: isLoadingOrderUpdate,
        errors: errorsOrderUpdate,
    } = useApiFetch(
        {
            url: `/api/order`,
            method: "PUT",
        },
        false,
    );

    const { fetchData: fetchDataRemove } = useApiFetch(
        {
            url: `/api/order/item`,
            method: "DELETE",
        },
        false,
    );

    const {
        data: dataClear,
        fetchData: fetchDataClear,
        isLoading: isLoadingClear,
        errors: errorsClear,
    } = useApiFetch(
        {
            url: `/api/order`,
            method: "DELETE",
        },
        false,
    );

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

    useEffect(() => {
        if (!isLoading && data) {
            if (data?.order?.status !== orderStatusTypes.Draft) {
                deleteCart(activeCartId);
                const toast = {
                    message: "Order submitted.",
                    type: "success",
                };
                toaster?.addToast(toast);
            } else {
                updateCartID(data?.order?._id, undefined, data?.order?.userID);
                data?.order?.items?.forEach((item: any) => {
                    updateItemFromActiveCart(item?.itemID, item?._id);
                });
                setQRModalOpen(true);
            }
        } else if (!isLoading && errors?.details) {
            const responseErrorCode = errors?.details?.status;
            if (responseErrorCode === 403) {
                setIsOpenSingin(true);
            } else {
                const toast = {
                    message: errors?.details?.response?.data?.error || errors?.message,
                    type: "error",
                };
                toaster?.addToast(toast);
            }
        }
    }, [isLoading, data, errors]);

    useEffect(() => {
        if (!isLoadingOrderUpdate && dataOrderUpdate) {
            deleteCart(activeCartId);

            const toast = {
                message: "Your order has been submitted.",
                type: "success",
            };
            toaster?.addToast(toast);
        } else if (!isLoadingOrderUpdate && errorsOrderUpdate?.details) {
            const toast = {
                message: errorsOrderUpdate?.details?.response?.data?.error,
                type: "error",
            };
            toaster?.addToast(toast);
        }
    }, [isLoadingOrderUpdate, dataOrderUpdate, errorsOrderUpdate]);

    useEffect(() => {
        if (!isLoadingClear && dataClear) {
            deleteCart(activeCartId);
        } else if (!isLoadingClear && errorsClear?.details) {
            const toast = {
                message: errorsClear?.details?.response?.data?.error,
                type: "error",
            };
            toaster?.addToast(toast);
        }
    }, [isLoadingClear, dataClear, errorsClear]);

    const handleShare = () => {
        if (activeCart?.id) {
            setQRModalOpen(true);
        } else {
            if (!activeCartId) {
                setActiveCart(params?.id);
            }
            const order: any = {
                branchID: activeCartId || params?.id,
                status: orderStatusTypes.Draft,
                items: activeCart?.items?.map((item) => {
                    return {
                        itemID: item.item._id,
                        quantity: item.quantity,
                    };
                }),
            };
            if (activeCart?.table) order.table = activeCart?.table;

            fetchData({ data: { order } });
        }
    };

    const handleItemRemove = (itemID: string, savedID?: string, quantity?: number) => {
        if (activeCart?.id && savedID) {
            fetchDataRemove({
                data: {
                    orderID: activeCart?.id,
                    orderItemID: savedID,
                    quantity,
                },
            });
        }
        removeFromActiveCart(itemID);
    };

    const handleCartClear = () => {
        if (activeCart?.id) {
            fetchDataClear({
                data: { orderID: activeCart?.id },
            });
        }
    };

    const handleOrder = () => {
        if (carts?.[params.id]?.id) {
            fetchDataOrderUpdate({
                data: {
                    orderID: carts?.[params.id]?.id,
                    status: orderStatusTypes.Pending,
                },
            });
        } else {
            const order: any = {
                branchID: activeCartId || params?.id,
                status: orderStatusTypes.Pending,
                items: carts?.[activeCartId]?.items?.map((item) => {
                    return {
                        itemID: item.item._id,
                        quantity: item.quantity,
                    };
                }),
            };

            if (activeCart?.table) order.table = activeCart?.table;

            fetchData({ data: { order } });
        }
    };

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
                <div
                    className="realtive p-2 overflow-auto"
                    style={{ maxHeight: "calc(90vh - 72px)" }}
                >
                    <div className="flex items-center justify-between ps-2">
                        <h1 className="text-md font-semibold text-center text-taupe-600 dark:text-taupe-200">
                            Your Orders
                        </h1>
                        <Button
                            style="teritary"
                            icon={<FontAwesomeIcon icon={faShare} />}
                            onClick={handleShare}
                        />
                    </div>
                    {activeCart?.items?.length > 0 && (
                        <div>
                            {activeCart?.items.map((cartItem: any, index) => (
                                <div key={index}>
                                    <OrderItem
                                        id={cartItem?.item?._id}
                                        savedID={cartItem?.id}
                                        price={cartItem?.item?.price}
                                        name={cartItem?.item?.name}
                                        categories={cartItem?.item?.category?.join(", ")}
                                        description={cartItem?.item?.ingredients}
                                        image={food}
                                        quantity={cartItem?.quantity}
                                        removeFromCart={handleItemRemove}
                                    />
                                </div>
                            ))}
                            <div className="flex items-center justify-center mt-2">
                                {(!activeCart?.userID ||
                                    activeCart?.userID === menuContext?.user?._id) && (
                                    <Button
                                        text="Order"
                                        onClick={handleOrder}
                                        isLoading={isLoadingOrderUpdate}
                                    />
                                )}
                                <Button text="Clear" style="secondary" onClick={handleCartClear} />
                            </div>
                        </div>
                    )}
                    {!activeCart?.items?.length && (
                        <div>
                            <h1 className="text-sm text-center">Your cart is empty.</h1>
                        </div>
                    )}
                </div>
            </div>
            <SigninPopup
                isOpen={isOpenSingin}
                onClose={() => {
                    setIsOpenSingin(false);
                }}
            />

            <Modal
                isOpen={isQRModalOpen}
                onClose={() => setQRModalOpen(false)}
                title="Share your order with this QR Code"
            >
                <QrGenerator
                    url={`${API_URL}/order?orderID=${activeCart?.id}`}
                    title={`${activeCart?.name}`}
                />
            </Modal>
        </div>
    );
}
