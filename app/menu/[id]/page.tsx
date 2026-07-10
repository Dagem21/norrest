"use client";

import MenuItem from "@/components/menuItem";
import { MenuContext } from "@/providers/menu";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import ViewMenuItem from "@/components/forms/menu/viewMenuItem";
import Button from "@/components/ui/button";
import ViewOrder from "@/components/forms/order/viewOrder";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useApiFetch from "@/hooks/useAPIFetch";
import Loading from "@/components/loadingComponent";
import { categoryTypes, orderStatusTypes } from "@/assets/enums/enum";
import PageNavigator from "@/components/pageNavigator";
import { ToastContext } from "@/providers/toastProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faQrcode, faStar, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { useCartStore } from "@/hooks/useCartStore";
import Modal from "@/components/ui/modal";
import QrScanner from "@/components/QRScanner";
import RatingForm from "@/components/forms/menu/rating";

export default function Menu() {
    const params = useParams<{ id: string }>();
    const menuContext = useContext(MenuContext);
    const toaster = useContext(ToastContext);
    const router = useRouter();
    const searchParams = useSearchParams();
    const table = searchParams.get("table");
    const [isModalOpen, setModalOpen] = useState(false);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [menu, setMenu] = useState<Array<any>>([]);
    const [selectedItem, setSelectedItem] = useState<any>();
    const [isLoadingImage, setIsLoadingImage] = useState(true);
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedCatagory, setSelectedCategory] = useState<string | null>();
    const [isScanModalOpen, setIsScanModalOpen] = useState(false);
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
    const [isAddRatingModalOpen, setAddRatingModalOpen] = useState(false);
    const [pageLimit, setPageLimit] = useState({
        page: 1,
        limit: 10,
    });

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

    const {
        data: dataRating,
        fetchData: fetchDataRating,
        isLoading: isLoadingRating,
        errors: errorsRating,
    } = useApiFetch(
        {
            url: `/api/at/rating?branchID=${params.id}`,
            method: "GET",
        },
        false,
    );

    useEffect(() => {
        menuContext?.setTitle("");
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
        createNewCart(
            params.id,
            `${data?.branch?.companyID?.name}, ${data?.branch?.name}`,
            parseInt(table || ""),
        );
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
        <div className="flex flex-col flex-1 items-center">
            <div className="fixed bottom-0 right-0 m-6">
                <div className="flex flex-col gap-2">
                    <button
                        className="rounded-full bg-taupe-400 dark:bg-taupe-600 p-3 shadow-lg cursor-pointer"
                        title="Rating."
                        onClick={() => {
                            if (!dataRating) {
                                fetchDataRating();
                            }
                            setIsRatingModalOpen(true);
                        }}
                    >
                        <FontAwesomeIcon icon={faStar} size="lg" />
                    </button>
                    <button
                        className="rounded-full bg-taupe-400 dark:bg-taupe-600 p-3 shadow-lg cursor-pointer"
                        title="Join other cart."
                        onClick={() => setIsScanModalOpen(true)}
                    >
                        <FontAwesomeIcon icon={faQrcode} size="lg" />
                    </button>
                    <button
                        className="rounded-full bg-taupe-400 dark:bg-taupe-600 p-3 shadow-lg cursor-pointer"
                        title="Cart"
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
                                    className="max-w-30 max-h-30 object-cover rounded-lg"
                                    src={data?.branch?.companyID?.picture?.[0]}
                                    alt={"Company profile"}
                                    width={200}
                                    height={100}
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
                <div className="flex flex-col inset-shadow-[0_0_20px_2px_rgba(0,0,0,0.3)]">
                    <div className="relative flex-shrink-0 flex items-center justify-center overflow-hidden rounded-lg p-5">
                        <div className="shadow-[0_0_10px_2px_rgba(0,0,0,0.3)] rounded-lg">
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
                    </div>
                    <div className="flex flex-col justify-between px-5">
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
                                            selectedItem?.price *
                                                (selectedItem?.discount / 100)}{" "}
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
                    <div className="px-5">
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
                    <div className="flex flex-col gap-2 mt-2 mb-4 px-3">
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

            <Modal
                isOpen={isRatingModalOpen}
                onClose={() => setIsRatingModalOpen(false)}
                title="Rating"
            >
                <div>
                    <Loading loading={isLoadingRating} />
                    {!isLoadingRating && dataRating?.ratings?.length === 0 && (
                        <h1 className="text-sm text-center">No rating found.</h1>
                    )}
                    {!isLoadingRating && dataRating?.ratings?.length > 0 && (
                        <div>
                            {dataRating?.ratings?.map((rating: any) => (
                                <div className="mb-2" key={rating?._id}>
                                    <div className="flex items-center justify-between">
                                        <h1 className="text-sm font-bold text-taupe-300">
                                            {rating?.userID?.firstName}
                                        </h1>
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((starIdx) => {
                                                const isActive = starIdx <= rating?.rating;

                                                return (
                                                    <svg
                                                        key={starIdx}
                                                        className="w-5 h-5"
                                                        aria-hidden="true"
                                                        viewBox="0 0 24 24"
                                                        fill={isActive ? "orange" : "white"}
                                                    >
                                                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                                    </svg>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <h1 className="text-xs text-taupe-300">{rating?.comment}</h1>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="w-full flex items-center justify-center mt-4">
                        <Button
                            text="Add your rating"
                            onClick={() => {
                                setIsRatingModalOpen(false);
                                setAddRatingModalOpen(true);
                            }}
                        />
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={isAddRatingModalOpen}
                onClose={() => setAddRatingModalOpen(false)}
                title="Rating"
            >
                <RatingForm
                    rating={dataRating?.ratings?.find(
                        (rating: any) => rating?.userID?._id === menuContext?.user?._id,
                    )}
                    onFinish={() => {
                        setAddRatingModalOpen(false);
                        fetchDataRating();
                    }}
                />
            </Modal>
        </div>
    );
}
