"use client";

import MenuItemForm from "@/components/forms/menu/menuItem";
import MenuItem from "@/components/menuItem";
import QrGenerator from "@/components/QRGenerator";
import Modal from "@/components/ui/modal";
import useApiFetch from "@/hooks/useAPIFetch";
import { MenuContext } from "@/providers/menu";
import {
    faGear,
    faHome,
    faPlus,
    faQrcode,
    faStar,
    faTrash,
    faUsers,
    faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Loading from "@/components/loadingComponent";
import Image from "next/image";
import ViewMenuItem from "@/components/forms/menu/viewMenuItem";
import Button from "@/components/ui/button";
import PageNavigator from "@/components/pageNavigator";
import { ToastContext } from "@/providers/toastProvider";
import { orderStatusTypes, permissionTypes } from "@/assets/enums/enum";
import { API_URL } from "@/config";
import Input from "@/components/ui/input";
import { SocketContext } from "@/providers/socketProvider";
import UpdateMenuItemForm from "@/components/forms/menu/updateMenuItem";
import DiscountMenuItemForm from "@/components/forms/menu/menuDiscount";

export default function Branch() {
    const toaster = useContext(ToastContext);
    const menuContext = useContext(MenuContext);
    const socketContext = useContext(SocketContext);
    const params = useParams<{ cid: string; bid: string }>();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isDiscountModalOpen, setDiscountModalOpen] = useState(false);
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [isLoadingImage, setIsLoadingImage] = useState(true);
    const [isQRModalOpen, setQRModalOpen] = useState(false);
    const [tableNumer, setTableNumber] = useState("");
    const [menu, setMenu] = useState<Array<any>>([]);
    const [pendingOrders, setPendingOrders] = useState<any[]>([]);
    const [processingOrders, setProcessingOrders] = useState<any[]>([]);
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
    const [isModalOpenOrder, setModalOpenOrder] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>();
    const [pageLimit, setPageLimit] = useState({
        page: 1,
        limit: 10,
    });

    const [selectedItem, setSelectedItem] = useState<any>();

    const { data: dataPermission, isLoading: isLoadingPermission } = useApiFetch(
        {
            url: `/api/at/company/branch/permission?branchID=${params?.bid}`,
            method: "GET",
        },
        true,
    );

    const { data, isLoading, errors } = useApiFetch(
        {
            url: `/api/at/company/branch?branchID=${params?.bid}`,
            method: "GET",
        },
        true,
    );

    const {
        data: dataMenu,
        fetchData: fetchMenu,
        isLoading: isLoadingMenu,
        errors: errorsmenu,
    } = useApiFetch(
        {
            url: `/api/at/menu?branchID=${params?.bid}`,
            method: "GET",
        },
        true,
    );

    const {
        data: dataOrderCount,
        isLoading: isLoadingOrderCount,
        errors: errorsOrderCount,
    } = useApiFetch(
        {
            url: `/api/at/company/branch/orders/count?branchID=${params?.bid}`,
            method: "GET",
        },
        true,
    );

    const {
        data: dataOrderPending,
        fetchData: fetchDataOrderPending,
        isLoading: isLoadingOrderPending,
    } = useApiFetch(
        {
            url: `/api/at/company/branch/orders?branchID=${params?.bid}&status=Pending`,
            method: "GET",
        },
        true,
    );

    const {
        data: dataOrderProcessing,
        fetchData: fetchDataOrderProcessing,
        isLoading: isLoadingOrderProcessing,
    } = useApiFetch(
        {
            url: `/api/at/company/branch/orders?branchID=${params?.bid}&status=Processing`,
            method: "GET",
        },
        true,
    );

    const {
        data: dataOrderUpdate,
        fetchData: fetchDataOrderUpdate,
        isLoading: isLoadingOrderUpdate,
        errors: errorsOrderUpdate,
    } = useApiFetch(
        {
            url: `/api/at/company/branch/orders`,
            method: "PUT",
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
            url: `/api/at/rating?branchID=${params.bid}`,
            method: "GET",
        },
        false,
    );

    const {
        data: dataDelete,
        fetchData: fetchDataDelete,
        isLoading: isLoadingDelete,
        errors: errorsDelete,
    } = useApiFetch(
        {
            url: "/api/at/menu",
            method: "DELETE",
        },
        false,
    );

    useEffect(() => {
        if (!isLoading && data) {
            menuContext?.setTitle(
                <Link href={`/company`}>
                    <FontAwesomeIcon icon={faHome} />{" "}
                    {`${data?.branch?.companyID?.name}, ${data?.branch?.name}`}
                </Link>,
            );
        } else if (!isLoading && errors?.details) {
            const toast = {
                message: errors?.details?.response?.data?.error || errors?.message,
                type: "error",
            };
            toaster?.addToast(toast);
        }
    }, [data, isLoading, errors]);

    useEffect(() => {
        if (!isLoadingMenu && dataMenu) {
            setMenu(dataMenu?.items);
        } else if (!isLoadingMenu && errorsmenu?.details) {
            const toast = {
                message: errors?.details?.response?.data?.error || errors?.message,
                type: "error",
            };
            toaster?.addToast(toast);
        }
    }, [isLoadingMenu, dataMenu, errorsmenu]);

    useEffect(() => {
        if (!isLoadingOrderPending && dataOrderPending) {
            const incomingOrders =
                socketContext?.incomingOrders?.filter(
                    (order: any) => order?.branchID?._id === params.bid,
                ) ?? [];

            const pendOrders = [...incomingOrders, ...dataOrderPending?.orders]
                .sort((a, b) => {
                    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
                })
                .slice(0, 10);

            setPendingOrders([...pendOrders]);
        }
    }, [dataOrderPending, isLoadingOrderPending, socketContext?.incomingOrders]);

    useEffect(() => {
        if (!isLoadingOrderProcessing && dataOrderProcessing) {
            setProcessingOrders(dataOrderProcessing?.orders);
        }
    }, [dataOrderProcessing, isLoadingOrderProcessing]);

    useEffect(() => {
        if (!isLoadingOrderUpdate && dataOrderUpdate) {
            const toast = {
                message: "Order status updated.",
                type: "success",
            };
            toaster?.addToast(toast);
            fetchDataOrderPending();
            socketContext?.clearIncomingOrders();
            fetchDataOrderProcessing();
            setModalOpenOrder(false);
        } else if (!isLoadingOrderUpdate && errorsOrderUpdate?.details) {
            const toast = {
                message:
                    errorsOrderUpdate?.details?.response?.data?.error || errorsOrderUpdate?.message,
                type: "error",
            };
            toaster?.addToast(toast);
        }
    }, [isLoadingOrderUpdate, dataOrderUpdate, errorsOrderUpdate]);

    useEffect(() => {
        if (!isLoadingDelete && dataDelete) {
            const toast = {
                message: "Menu item deleted.",
                type: "success",
            };
            toaster?.addToast(toast);
            fetchMenu();
            setDeleteModalOpen(false);
        } else if (!isLoadingDelete && errorsDelete?.details) {
            const toast = {
                message: errorsDelete?.details?.response?.data?.error || errorsDelete?.message,
                type: "error",
            };
            toaster?.addToast(toast);
        }
    }, [isLoadingDelete, dataDelete, errorsDelete]);

    const handleViewMenuItem = (item: any) => {
        setSelectedItem(item);
        setViewModalOpen(true);
    };

    const handleOrderClick = (order: any) => {
        setSelectedOrder(order);
        setModalOpenOrder(true);
    };

    const handleOrderUpdate = (orderID: string, status: string) => {
        fetchDataOrderUpdate({
            data: { orderID, status },
        });
    };

    const handlePageChange = (page: number) => {
        setPageLimit((prev) => ({ ...prev, page }));
    };

    const handleLimitChange = (limit: number) => {
        setPageLimit((prev) => ({ ...prev, limit }));
    };

    return (
        <div className="flex flex-col flex-1 items-center">
            <div className="flex flex-col w-full">
                <div className="flex flex-wrap justify-center gap-2 w-full">
                    <div className="h-fit w-screen sm:w-2/7">
                        <div className="p-2 bg-taupe-200 dark:bg-taupe-600 rounded-lg">
                            <h1 className="text-sm font-bold text-center text-taupe-600 dark:text-taupe-200">
                                Pending Orders
                            </h1>
                            <hr className="m-3 border-taupe-500 dark:border-taupe-400" />
                            <div className="pb-2">
                                {pendingOrders && pendingOrders?.length === 0 && (
                                    <h1 className="text-xs text-center">No orders yet.</h1>
                                )}
                                {pendingOrders?.length > 0 &&
                                    pendingOrders.map((order: any) => (
                                        <div
                                            className="w-full flex flex-col shadow p-2 mt-2 cursor-pointer"
                                            key={order?._id}
                                            onClick={() => {
                                                handleOrderClick(order);
                                            }}
                                        >
                                            <div className="w-full">
                                                {order?.items?.map((item: any) => (
                                                    <div
                                                        className="w-full flex justify-between"
                                                        key={item?._id}
                                                    >
                                                        <p className="m-0 text-sm text-taupe-100">
                                                            {item?.itemID?.name}
                                                        </p>
                                                        <p className="m-0 text-sm text-taupe-100">
                                                            x {item?.quantity}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="mt-2 p-2 bg-taupe-200 dark:bg-taupe-600 rounded-lg">
                            <h1 className="text-sm font-bold text-center text-taupe-600 dark:text-taupe-200">
                                Processing Orders
                            </h1>
                            <hr className="m-3 border-taupe-500 dark:border-taupe-400" />
                            <div className="pb-2">
                                {processingOrders && processingOrders?.length === 0 && (
                                    <h1 className="text-xs text-center">No orders yet.</h1>
                                )}
                                {processingOrders?.length > 0 &&
                                    processingOrders.map((order: any) => (
                                        <div
                                            className="w-full flex flex-col shadow p-2 mt-2 cursor-pointer"
                                            key={order?._id}
                                            onClick={() => {
                                                handleOrderClick(order);
                                            }}
                                        >
                                            <div className="w-full">
                                                {order?.items?.map((item: any) => (
                                                    <div
                                                        className="w-full flex justify-between"
                                                        key={item?._id}
                                                    >
                                                        <p className="m-0 text-sm text-taupe-100">
                                                            {item?.itemID?.name}
                                                        </p>
                                                        <p className="m-0 text-sm text-taupe-100">
                                                            x {item?.quantity}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                            {!isLoadingPermission &&
                                dataPermission &&
                                (dataPermission?.permission?.branchID === params?.bid ||
                                    (!dataPermission?.permission?.branchID &&
                                        dataPermission?.permission?.companyID === params?.cid)) && (
                                    <>
                                        {dataPermission?.permission?.permissions?.some(
                                            (item: permissionTypes) =>
                                                [permissionTypes.Admin].includes(item),
                                        ) && (
                                            <Link
                                                className="flex-1 p-2 flex flex-col items-center bg-taupe-200 dark:bg-taupe-600 rounded-lg cursor-pointer hover:bg-taupe-300 dark:hover:bg-taupe-500 transition duration-300"
                                                href={`/company/${params.cid}/branch/${params.bid}/settings`}
                                            >
                                                <FontAwesomeIcon
                                                    className="m-2"
                                                    icon={faGear}
                                                    size="lg"
                                                />
                                                <h1 className="text-sm font-bold text-center text-taupe-600 dark:text-taupe-200">
                                                    Settings
                                                </h1>
                                            </Link>
                                        )}
                                        {dataPermission?.permission?.permissions?.some(
                                            (item: permissionTypes) =>
                                                [
                                                    permissionTypes.Admin,
                                                    permissionTypes.EmployeeRead,
                                                ].includes(item),
                                        ) && (
                                            <Link
                                                className="flex-1 p-2 flex flex-col items-center bg-taupe-200 dark:bg-taupe-600 rounded-lg cursor-pointer hover:bg-taupe-300 dark:hover:bg-taupe-500 transition duration-300"
                                                href={`/company/${params.cid}/branch/${params.bid}/employees`}
                                            >
                                                <FontAwesomeIcon
                                                    className="m-2"
                                                    icon={faUsers}
                                                    size="lg"
                                                />
                                                <h1 className="text-sm font-bold text-center text-taupe-600 dark:text-taupe-200">
                                                    Employees
                                                </h1>
                                            </Link>
                                        )}
                                    </>
                                )}
                            <div
                                className="flex-1 p-2 flex flex-col items-center bg-taupe-200 dark:bg-taupe-600 rounded-lg cursor-pointer hover:bg-taupe-300 dark:hover:bg-taupe-500 transition duration-300"
                                onClick={() => {
                                    if (!dataRating) {
                                        fetchDataRating();
                                    }
                                    setIsRatingModalOpen(true);
                                }}
                            >
                                <FontAwesomeIcon className="m-2" icon={faStar} size="lg" />
                                <h1 className="text-sm font-bold text-center text-taupe-600 dark:text-taupe-200">
                                    {parseFloat(data?.branch?.rating || 0).toFixed(1)}/5.0
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="relative flex flex-col gap-2 w-screen h-fit sm:w-4/7">
                        <div className="p-2 bg-taupe-200 dark:bg-taupe-600 rounded-lg">
                            <div className="flex items-center justify-between px-2">
                                <div>
                                    <FontAwesomeIcon
                                        className="cursor-pointer"
                                        icon={faQrcode}
                                        size="lg"
                                        onClick={() => setQRModalOpen(true)}
                                    />
                                </div>
                                <h1 className="text-sm font-bold text-center text-taupe-600 dark:text-taupe-200">
                                    Menu
                                </h1>
                                <div>
                                    {!isLoadingPermission &&
                                        dataPermission &&
                                        (dataPermission?.permission?.branchID === params?.bid ||
                                            (!dataPermission?.permission?.branchID &&
                                                dataPermission?.permission?.companyID ===
                                                    params?.cid)) &&
                                        dataPermission?.permission?.permissions?.some(
                                            (item: permissionTypes) =>
                                                [
                                                    permissionTypes.Admin,
                                                    permissionTypes.MenuCreate,
                                                ].includes(item),
                                        ) && (
                                            <FontAwesomeIcon
                                                className="cursor-pointer"
                                                icon={faPlus}
                                                size="lg"
                                                onClick={() => setModalOpen(true)}
                                            />
                                        )}
                                </div>
                            </div>
                            <hr className="m-3 border-taupe-500 dark:border-taupe-400" />
                            <div className="pb-2">
                                <div className="flex flex-col gap-2">
                                    {!isLoadingMenu && menu?.length > 0 && (
                                        <div>
                                            {menu
                                                .slice(
                                                    (pageLimit.page - 1) * pageLimit.limit,
                                                    pageLimit.page * pageLimit.limit,
                                                )
                                                .map((item: any) => (
                                                    <div
                                                        onClick={() => handleViewMenuItem(item)}
                                                        key={item?._id}
                                                    >
                                                        <MenuItem
                                                            price={item?.price}
                                                            name={item?.name}
                                                            categories={item?.category?.join(", ")}
                                                            description={item?.ingredients}
                                                            image={item?.picture?.[0]}
                                                            discount={item?.discount}
                                                            discountStart={item?.discountStart}
                                                            discountEnd={item?.discountEnd}
                                                        />
                                                    </div>
                                                ))}
                                            <PageNavigator
                                                page={pageLimit.page}
                                                limit={pageLimit.limit}
                                                totalDocs={menu.length}
                                                totalPages={Math.ceil(
                                                    (menu.length ?? 0) / pageLimit.limit,
                                                )}
                                                onPageChange={handlePageChange}
                                                onLimitChange={handleLimitChange}
                                            />
                                        </div>
                                    )}
                                </div>
                                {!isLoadingMenu && dataMenu?.items?.length === 0 && (
                                    <h1 className="text-sm text-center text-taupe-600 dark:text-taupe-200">
                                        No items in menu.
                                    </h1>
                                )}
                                <div className="flex items-center">
                                    <Loading loading={isLoadingMenu} />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 flex-wrap justify-center">
                            <Link
                                className="flex-1 bg-taupe-200 dark:bg-taupe-600 rounded-lg p-2 cursor-pointer hover:bg-taupe-300 dark:hover:bg-taupe-500 transition duration-300"
                                href={`/company/${params.cid}/branch/${params.bid}/orders`}
                            >
                                <h1 className="text-sm text-center text-taupe-600 dark:text-taupe-200">
                                    All Orders
                                </h1>
                                <div className="p-2">
                                    <h1 className="text-sm font-bold text-center text-taupe-600 dark:text-taupe-200">
                                        <Loading loading={isLoadingOrderCount} />
                                        {!isLoadingOrderCount && errorsOrderCount?.details && (
                                            <FontAwesomeIcon icon={faWarning} />
                                        )}
                                        {!isLoadingOrderCount &&
                                            !errorsOrderCount?.details &&
                                            dataOrderCount?.orderCount?.counts?.reduce(
                                                (acc: number, current: any) => acc + current.count,
                                                0,
                                            )}
                                    </h1>
                                </div>
                            </Link>
                            <Link
                                className="flex-1 bg-taupe-200 dark:bg-taupe-600 rounded-lg p-2 cursor-pointer hover:bg-taupe-300 dark:hover:bg-taupe-500 transition duration-300"
                                href={`/company/${params.cid}/branch/${params.bid}/orders?status=Pending`}
                            >
                                <h1 className="text-sm text-center text-taupe-600 dark:text-taupe-200">
                                    Pending Orders
                                </h1>
                                <div className="p-2">
                                    <h1 className="text-sm font-bold text-center text-taupe-600 dark:text-taupe-200">
                                        <Loading loading={isLoadingOrderCount} />
                                        {!isLoadingOrderCount && errorsOrderCount?.details && (
                                            <FontAwesomeIcon icon={faWarning} />
                                        )}
                                        {!isLoadingOrderCount &&
                                            !errorsOrderCount?.details &&
                                            dataOrderCount?.orderCount?.counts?.find(
                                                (ct: any) => ct.status === orderStatusTypes.Pending,
                                            )?.count}
                                    </h1>
                                </div>
                            </Link>
                            <Link
                                className="flex-1 bg-taupe-200 dark:bg-taupe-600 rounded-lg p-2 cursor-pointer hover:bg-taupe-300 dark:hover:bg-taupe-500 transition duration-300"
                                href={`/company/${params.cid}/branch/${params.bid}/orders?status=Processing`}
                            >
                                <h1 className="text-sm text-center text-taupe-600 dark:text-taupe-200">
                                    Processing Orders
                                </h1>
                                <div className="p-2">
                                    <h1 className="text-sm font-bold text-center text-taupe-600 dark:text-taupe-200">
                                        <Loading loading={isLoadingOrderCount} />
                                        {!isLoadingOrderCount && errorsOrderCount?.details && (
                                            <FontAwesomeIcon icon={faWarning} />
                                        )}
                                        {!isLoadingOrderCount &&
                                            !errorsOrderCount?.details &&
                                            dataOrderCount?.orderCount?.counts?.find(
                                                (ct: any) =>
                                                    ct.status === orderStatusTypes.Processing,
                                            )?.count}
                                    </h1>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpenOrder}
                onClose={() => setModalOpenOrder(false)}
                title="Order Details"
            >
                <div className="flex flex-col shadow p-2">
                    <div className="flex flex-col">
                        <h1 className="text-sm text-center">Customer</h1>
                        <hr className="text-taupe-500 my-2" />
                        <h1 className="flex-1 text-sm text-taupe-300">
                            Customer Name:{" "}
                            <span className="text-taupe-100 font-bold">
                                {selectedOrder?.userID?.firstName || "N/A"}
                            </span>
                        </h1>
                        <h1 className="flex-1 text-sm text-taupe-300">
                            Phone Number :{" "}
                            <span className="text-taupe-100 font-bold">
                                {selectedOrder?.userID?.phoneNumber || "N/A"}
                            </span>
                        </h1>
                        {selectedOrder?.table && (
                            <h1 className="flex-1 text-sm text-taupe-300">
                                Table :{" "}
                                <span className="text-taupe-100 font-bold">
                                    {selectedOrder?.table}
                                </span>
                            </h1>
                        )}
                        <hr className="text-taupe-500 my-2" />
                    </div>
                    <div className="mb-2">
                        <h1 className="text-sm text-center">Order Items</h1>

                        <hr className="text-taupe-500 my-2" />

                        {selectedOrder?.items?.length === 0 && (
                            <h1 className="text-center text-sm">No items in order.</h1>
                        )}
                        {selectedOrder?.items?.length > 0 && (
                            <div className="flex flex-col gap-2">
                                {selectedOrder?.items?.map((item: any) => {
                                    return (
                                        <div
                                            className="flex items-center justify-between text-sm font-bold"
                                            key={item?._id}
                                        >
                                            <h1>{item?.itemID?.name}</h1>
                                            <h1>
                                                {item?.quantity} x {item?.itemID?.price} Birr
                                            </h1>
                                        </div>
                                    );
                                })}

                                <hr className="text-taupe-500 m-2" />

                                <h1 className="text-end text-sm">
                                    Total :{" "}
                                    {selectedOrder?.items?.reduce(
                                        (acc: number, current: any) =>
                                            acc + current?.quantity * current?.itemID?.price,
                                        0,
                                    )}{" "}
                                    Birr
                                </h1>
                            </div>
                        )}
                    </div>
                    {dataPermission?.permission?.permissions?.some((item: permissionTypes) =>
                        [permissionTypes.Admin, permissionTypes.OrderUpdate].includes(item),
                    ) && (
                        <Button
                            text={
                                selectedOrder?.status === orderStatusTypes.Pending
                                    ? orderStatusTypes.Processing
                                    : selectedOrder?.status === orderStatusTypes.Processing
                                      ? orderStatusTypes.Processed
                                      : ""
                            }
                            onClick={() => {
                                handleOrderUpdate(
                                    selectedOrder?._id,
                                    selectedOrder?.status === orderStatusTypes.Pending
                                        ? orderStatusTypes.Processing
                                        : selectedOrder?.status === orderStatusTypes.Processing
                                          ? orderStatusTypes.Processed
                                          : "",
                                );
                            }}
                            isLoading={isLoadingOrderUpdate}
                        />
                    )}
                </div>
            </Modal>

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Add Menu Item">
                <MenuItemForm
                    onFinish={() => {
                        fetchMenu();
                        setModalOpen(false);
                    }}
                />
            </Modal>

            <Modal
                isOpen={isUpdateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
                title="Update Menu Item"
            >
                <UpdateMenuItemForm
                    order={selectedItem}
                    onFinish={() => {
                        fetchMenu();
                        setUpdateModalOpen(false);
                    }}
                />
            </Modal>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Remove Menu Item"
            >
                <div>
                    <h1>Are you sure you want to remove this menu item?</h1>
                    <div className="flex items-center justify-center mt-2">
                        <Button
                            text="Remove"
                            onClick={() => {
                                fetchDataDelete({ data: { id: selectedItem?._id } });
                            }}
                            isLoading={isLoadingDelete}
                        />
                        <Button
                            text="Cancel"
                            style="secondary"
                            onClick={() => {
                                setDeleteModalOpen(false);
                            }}
                        />
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={isDiscountModalOpen}
                onClose={() => setDiscountModalOpen(false)}
                title="Add Discount"
            >
                <DiscountMenuItemForm
                    order={selectedItem}
                    onFinish={() => {
                        fetchMenu();
                        setDiscountModalOpen(false);
                    }}
                />
            </Modal>

            <Modal
                isOpen={isQRModalOpen}
                onClose={() => setQRModalOpen(false)}
                title="Menu QR Code"
            >
                <QrGenerator
                    url={`${API_URL}/menu/${params?.bid}${tableNumer ? `?table=${tableNumer}` : ""}`}
                    title={`${data?.branch?.companyID?.name}, ${data?.branch?.name}`}
                >
                    <div className="flex items-center gap-2">
                        <p className="text-sm">Table Number : </p>
                        <Input type="number" onChange={(e) => setTableNumber(e.target.value)} />
                    </div>
                </QrGenerator>
            </Modal>

            <ViewMenuItem isOpen={isViewModalOpen} onClose={() => setViewModalOpen(false)}>
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
                    {(dataPermission?.permission?.permissions?.includes(
                        permissionTypes.MenuUpdate,
                    ) ||
                        dataPermission?.permission?.permissions?.includes(
                            permissionTypes.Admin,
                        )) && (
                        <div className="flex flex-col gap-2 px-5 mb-2">
                            <Button
                                text="Edit"
                                onClick={() => {
                                    setViewModalOpen(false);
                                    setUpdateModalOpen(true);
                                }}
                            />
                        </div>
                    )}

                    <div className="flex px-5 mb-4">
                        {(dataPermission?.permission?.permissions?.includes(
                            permissionTypes.MenuUpdate,
                        ) ||
                            dataPermission?.permission?.permissions?.includes(
                                permissionTypes.Admin,
                            )) && (
                            <div className="flex-1 flex flex-col">
                                <Button
                                    text="Add Discount"
                                    style="secondary"
                                    onClick={() => {
                                        setViewModalOpen(false);
                                        setDiscountModalOpen(true);
                                    }}
                                />
                            </div>
                        )}
                        {(dataPermission?.permission?.permissions?.includes(
                            permissionTypes.MenuDelete,
                        ) ||
                            dataPermission?.permission?.permissions?.includes(
                                permissionTypes.Admin,
                            )) && (
                            <Button
                                className="bg-red-800"
                                icon={<FontAwesomeIcon icon={faTrash} />}
                                style="teritary"
                                title="Delete"
                                onClick={() => {
                                    setViewModalOpen(false);
                                    setDeleteModalOpen(true);
                                }}
                            />
                        )}
                    </div>
                </div>
            </ViewMenuItem>

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
                </div>
            </Modal>
        </div>
    );
}
