"use client";

import MenuItem from "@/components/menuItem";
import { MenuContext } from "@/providers/menu";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import ViewMenuItem from "@/components/forms/menu/viewMenuItem";
import Button from "@/components/ui/button";
import ViewOrder from "@/components/forms/order/viewOrder";
import { useParams, useRouter } from "next/navigation";
import useApiFetch from "@/hooks/useAPIFetch";
import Loading from "@/components/loadingComponent";
import { categoryTypes, orderStatusTypes } from "@/assets/enums/enum";
import PageNavigator from "@/components/pageNavigator";
import { ToastContext } from "@/providers/toastProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faQrcode, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { useCartStore } from "@/hooks/useCartStore";
import Modal from "@/components/ui/modal";
import QrScanner from "@/components/QRScanner";

export default function Menu() {
    const params = useParams<{ id: string }>();
    const menuContext = useContext(MenuContext);
    const toaster = useContext(ToastContext);
    const router = useRouter();

    const {
        activeCartId,
        carts,
        addToActiveCart,
        createNewCart,
        setActiveCart,
        updateCartID,
        updateItemFromActiveCart,
        deleteCart,
    } = useCartStore();

    useEffect(() => {
        setActiveCart(params.id);
    }, [params.id]);

    const [isModalOpen, setModalOpen] = useState(false);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [menu, setMenu] = useState<Array<any>>([]);
    const [selectedItem, setSelectedItem] = useState<any>();
    const [isLoadingImage, setIsLoadingImage] = useState(true);
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedCatagory, setSelectedCategory] = useState<string | null>();
    const [isScanModalOpen, setIsScanModalOpen] = useState(false);
    const [pageLimit, setPageLimit] = useState({
        page: 1,
        limit: 10,
    });

    const { data, isLoading, errors } = useApiFetch(
        {
            url: `/api/menu?branchID=${params?.id}`,
            method: "GET",
        },
        true,
    );

    const {
        data: dataUpdate,
        fetchData: fetchDataUpdate,
        isLoading: isLoadingUpdate,
        errors: errorsUpdate,
    } = useApiFetch(
        {
            url: `/api/order/item`,
            method: "PUT",
        },
        false,
    );

    const {
        data: dataOrder,
        fetchData: fetchDataOrder,
        isLoading: isLoadingOrder,
        errors: errorsOrder,
    } = useApiFetch(
        {
            url: `/api/order`,
            method: "GET",
        },
        false,
    );

    const {
        data: dataCreate,
        fetchData: fetchDataCreate,
        isLoading: isLoadingCreate,
        errors: errorsCreate,
    } = useApiFetch(
        {
            url: `/api/order`,
            method: "POST",
        },
        false,
    );

    useEffect(() => {
        menuContext?.setTitle(`${data?.branch?.companyID?.name}, ${data?.branch?.name}`);
    }, [data]);

    useEffect(() => {
        if (!isLoading && data && !selectedCatagory) {
            setMenu(data?.items);
        } else if (!isLoading && errors?.details) {
            const toast = {
                message: errors?.details?.response?.data?.error || errors?.message,
                type: "error",
            };
            toaster?.addToast(toast);
        }
    }, [isLoading, data, errors]);

    useEffect(() => {
        if (!isLoading && selectedCatagory && data) {
            const items = data?.items?.filter((item: any) =>
                item?.category?.includes(selectedCatagory),
            );
            setMenu(items);
        }
    }, [selectedCatagory, isLoading, data]);

    useEffect(() => {
        if (!isLoadingOrder && dataOrder) {
            setIsScanModalOpen(false);
            const toast = {
                message: `Add your orders to ${dataOrder?.order?.userID?.firstName}'s cart.`,
                type: "success",
            };
            toaster?.addToast(toast);

            deleteCart(dataOrder?.order?.branchID?._id);
            createNewCart(
                dataOrder?.order?.branchID?._id,
                `${dataOrder?.order?.branch?.companyID?.name}, ${dataOrder?.order?.branch?.name}`,
            );
            updateCartID(
                dataOrder?.order?._id,
                dataOrder?.order?.branchID?._id,
                dataOrder?.order?.userID?._id,
            );

            if (params.id !== dataOrder?.order?.branchID?._id) {
                router.push(`/menu/${dataOrder?.order?.branchID?._id}`);
            }
        } else if (!isLoadingOrder && errorsOrder?.details) {
            const toast = {
                message: errorsOrder?.details?.response?.data?.error,
                type: "error",
            };
            toaster?.addToast(toast);
        }
    }, [isLoadingOrder, dataOrder, errorsOrder]);

    useEffect(() => {
        if (!isLoading && dataUpdate) {
            updateItemFromActiveCart(dataUpdate?.item?.itemID, dataUpdate?.item?._id);
        } else if (!isLoading && errorsUpdate?.details?.status === 404) {
            updateCartID(null);
            carts[activeCartId].items.forEach((item) => {
                updateItemFromActiveCart(item?.item?._id, null);
            });
        }
    }, [isLoadingUpdate, dataUpdate, errorsUpdate]);

    useEffect(() => {
        if (!isLoadingCreate && dataCreate) {
            setModalOpen(false);
            const toast = {
                message: "Your order has been submitted.",
                type: "success",
            };
            toaster?.addToast(toast);
        } else if (!isLoadingCreate && errorsCreate?.details) {
            const toast = {
                message: errorsCreate?.details?.response?.data?.error,
                type: "error",
            };
            toaster?.addToast(toast);
        }
    }, [isLoadingCreate, dataCreate, errorsCreate]);

    const handlePageChange = (page: number) => {
        setPageLimit((prev) => ({ ...prev, page }));
    };

    const handleLimitChange = (limit: number) => {
        setPageLimit((prev) => ({ ...prev, limit }));
    };

    const handleAddCart = (item: any, quantity: number) => {
        createNewCart(params.id, `${data?.branch?.companyID?.name}, ${data?.branch?.name}`);
        setActiveCart(params.id);
        addToActiveCart({
            item,
            quantity,
        });

        if (carts?.[params.id]?.id) {
            fetchDataUpdate({
                data: {
                    orderID: carts?.[params.id]?.id,
                    itemID: item?._id,
                    quantity: quantity,
                },
            });
        }

        const toast = {
            message: "Added to cart.",
            type: "success",
        };
        toaster?.addToast(toast);

        setModalOpen(false);
    };

    const handleOrder = () => {
        const order = {
            branchID: params?.id,
            status: orderStatusTypes.Pending,
            items: [
                {
                    itemID: selectedItem?._id,
                    quantity: quantity,
                },
            ],
        };

        fetchDataCreate({ data: { order } });
    };

    const handleScanResult = (result: string) => {
        const parsedUrl = new URL(result);
        const orderID = parsedUrl.searchParams.get("orderID");

        fetchDataOrder({
            params: { orderID },
        });
    };

    return (
        <div className="flex flex-col flex-1 items-center p-2">
            <div className="fixed bottom-0 right-0 m-6">
                <div className="flex flex-col gap-2">
                    <button
                        className="rounded-full bg-taupe-400 dark:bg-taupe-600 p-3 shadow-lg"
                        onClick={() => setIsScanModalOpen(true)}
                    >
                        <FontAwesomeIcon icon={faQrcode} size="lg" />
                    </button>
                    <button
                        className="rounded-full bg-taupe-400 dark:bg-taupe-600 p-3 shadow-lg"
                        onClick={() => setIsOrderModalOpen(true)}
                    >
                        <FontAwesomeIcon icon={faUtensils} size="lg" />
                    </button>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <div className="flex flex-wrap justify-center gap-2 w-full px-2">
                    {!isLoading && data && (
                        <div className="relative flex flex-col gap-2 h-fit w-full sm:w-4/7">
                            <div className="bg-taupe-200 dark:bg-taupe-600 p-2 rounded-lg flex flex-col items-center">
                                <Image
                                    className="object-cover rounded-lg"
                                    src={data?.branch?.companyID?.picture?.[0]}
                                    alt={"Company profile"}
                                    width={200}
                                    height={50}
                                />
                                <h1 className="text-sm font-bold mt-2">{`${data?.branch?.companyID?.name}, ${data?.branch?.name}`}</h1>
                            </div>
                            <div className="p-2 bg-taupe-200 dark:bg-taupe-600 rounded-lg">
                                <div>
                                    <h1 className="flex-1 text-sm font-semibold text-center text-taupe-700 dark:text-taupe-300">
                                        Menu
                                    </h1>
                                </div>
                                <div className="container flex px-2 py-2 border-taupe-500 dark:border-taupe-400 [&::-webkit-scrollbar]:hidden">
                                    <ul className="flex gap-2 overflow-x-auto text-xs py-2">
                                        {Object.values(categoryTypes).map((category) => (
                                            <li
                                                className={`rounded shadow-lg px-3 py-2 cursor-pointer whitespace-nowrap ${selectedCatagory === category ? "bg-taupe-900" : ""}`}
                                                key={category}
                                                onClick={() => {
                                                    setSelectedCategory(category);
                                                }}
                                            >
                                                {category}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {menu?.length > 0 &&
                                        menu
                                            .slice(
                                                (pageLimit.page - 1) * pageLimit.limit,
                                                pageLimit.page * pageLimit.limit,
                                            )
                                            ?.map((item: any) => (
                                                <div
                                                    onClick={() => {
                                                        setSelectedItem(item);
                                                        setModalOpen(true);
                                                        setQuantity(1);
                                                    }}
                                                    key={item?._id}
                                                >
                                                    <MenuItem
                                                        price={item?.price}
                                                        name={item?.name}
                                                        categories={item?.category?.join(", ")}
                                                        description={item?.ingredients}
                                                        image={item?.picture?.[0]}
                                                    />
                                                </div>
                                            ))}
                                </div>
                                {menu?.length === 0 && (
                                    <div className="pb-2">
                                        <h1 className="text-sm text-center text-taupe-600 dark:text-taupe-200">
                                            No items in menu.
                                        </h1>
                                    </div>
                                )}

                                <PageNavigator
                                    page={pageLimit.page}
                                    limit={pageLimit.limit}
                                    totalDocs={menu.length}
                                    totalPages={Math.ceil((menu.length ?? 0) / pageLimit.limit)}
                                    onPageChange={handlePageChange}
                                    onLimitChange={handleLimitChange}
                                />
                            </div>
                        </div>
                    )}
                    <Loading loading={isLoading} />
                </div>
            </div>
            <ViewMenuItem isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <div className="flex flex-col p-2">
                    <div className="relative flex-shrink-0 flex items-center justify-center overflow-hidden rounded-lg shadow-lg">
                        <Image
                            className="w-full h-full object-cover"
                            src={selectedItem?.picture?.[1]}
                            alt={selectedItem?.name}
                            width={300}
                            height={300}
                            onLoad={() => setIsLoadingImage(false)}
                            onError={() => setIsLoadingImage(false)}
                        />
                        {isLoadingImage && (
                            <div className="absolute inset-0 flex items-center justify-center bg-taupe-100 dark:bg-taupe-900">
                                <Loading loading={isLoadingImage} />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col justify-between my-2">
                        <div className="flex items-center justify-between tracking-wide">
                            <h1 className="text-md font-bold">{selectedItem?.name}</h1>
                            <div className="flex items-center gap-2">
                                <span
                                    className={`${selectedItem?.discount ? "text line-through text-xs text-taupe-400" : "font-bold text-sm text-taupe-200"}`}
                                >
                                    $ {selectedItem?.price} Birr
                                </span>
                                {selectedItem?.discount && (
                                    <span className="font-bold text-sm text-taupe-200">
                                        ${" "}
                                        {selectedItem?.price -
                                            selectedItem?.price * selectedItem?.discount}{" "}
                                        Birr
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col text-taupe-300 my-2">
                            <p className="text-xs">{selectedItem?.ingredients}</p>
                            <p className="text-xs">{selectedItem?.category?.join(",")}</p>
                        </div>
                    </div>
                    <div className="px-2">
                        <div
                            className={`flex items-center text-sm border border-gray-400 rounded-md transition duration-300 ease shadow-sm 
                                    hover:border-slate-300 focus-within:border-slate-400 focus-within:shadow`}
                        >
                            <div className="flex items-center h-full border-e border-gray-400 select-none">
                                <Button
                                    style="teritary"
                                    onClick={() => {
                                        setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
                                    }}
                                    icon={<FontAwesomeIcon icon={faMinus} />}
                                />
                            </div>
                            <input
                                className="w-full p-2 outline-none rounded-md accent-taupe-900 text-center"
                                type="number"
                                value={quantity}
                                min={1}
                                max={10}
                                onChange={(e) => {
                                    setQuantity((prev) =>
                                        0 > parseInt(e.target.value || "1") ||
                                        parseInt(e.target.value || "1") > 10
                                            ? prev
                                            : parseInt(e.target.value || "0"),
                                    );
                                }}
                            />

                            <div className="flex items-center h-full border-s border-gray-400 select-none">
                                <Button
                                    style="teritary"
                                    onClick={() => {
                                        setQuantity((prev) => prev + 1);
                                    }}
                                    icon={<FontAwesomeIcon icon={faPlus} />}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 my-2">
                        <Button
                            text="Order Now"
                            onClick={handleOrder}
                            isLoading={isLoadingCreate}
                        />
                        <Button
                            text="Add to Orders"
                            style="secondary"
                            onClick={() => {
                                handleAddCart(selectedItem, quantity);
                            }}
                        />
                    </div>
                </div>
            </ViewMenuItem>

            <ViewOrder isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />

            <Modal
                isOpen={isScanModalOpen}
                onClose={() => setIsScanModalOpen(false)}
                title="Scan QR Code"
            >
                {!isLoadingOrder && <QrScanner onScanResult={handleScanResult} />}
                <div className="flex items-center">
                    <Loading loading={isLoadingOrder} />
                </div>
            </Modal>
        </div>
    );
}
