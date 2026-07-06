"use client";

import MenuItemForm from "@/components/forms/menu/menuItem";
import MenuItem from "@/components/menuItem";
import QrGenerator from "@/components/QRGenerator";
import Modal from "@/components/ui/modal";
import useApiFetch from "@/hooks/useAPIFetch";
import { MenuContext } from "@/providers/menu";
import { faGear, faPlus, faQrcode, faUsers, faWarning } from "@fortawesome/free-solid-svg-icons";
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

export default function Branch() {
    const toaster = useContext(ToastContext);
    const menuContext = useContext(MenuContext);
    const socketContext = useContext(SocketContext);
    const params = useParams<{ cid: string; bid: string }>();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [isLoadingImage, setIsLoadingImage] = useState(true);
    const [isQRModalOpen, setQRModalOpen] = useState(false);
    const [tableNumer, setTableNumber] = useState("");
    const [menu, setMenu] = useState<Array<any>>([]);
    const [pageLimit, setPageLimit] = useState({
        page: 1,
        limit: 10,
    });

    const [selectedItem, setSelectedItem] = useState<any>();

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
        data: dataPermission,
        isLoading: isLoadingPermission,
        errors: errorsPermission,
    } = useApiFetch(
        {
            url: `/api/at/company/branch/permission?branchID=${params?.bid}`,
            method: "GET",
        },
        true,
    );

    const {
        data: dataOrderCount,
        fetchData: fetchOrderCount,
        isLoading: isLoadingOrderCount,
        errors: errorsOrderCount,
    } = useApiFetch(
        {
            url: `/api/at/company/branch/orders/count?branchID=${params?.bid}`,
            method: "GET",
        },
        true,
    );

    useEffect(() => {
        if (!isLoading && data) {
            menuContext?.setTitle(`${data?.branch?.companyID?.name}, ${data?.branch?.name}`);
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

    const handleViewMenuItem = (item: any) => {
        setSelectedItem(item);
        setViewModalOpen(true);
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
                                Incoming Orders
                            </h1>
                            <hr className="m-3 border-taupe-500 dark:border-taupe-400" />
                            <div className="pb-2">
                                {socketContext?.incomingOrders &&
                                    socketContext?.incomingOrders?.length === 0 && (
                                        <h1 className="text-xs text-center">No orders yet.</h1>
                                    )}
                                {socketContext?.incomingOrders &&
                                    socketContext?.incomingOrders?.length > 0 &&
                                    socketContext?.incomingOrders
                                        .filter((order: any) => order?.branchID?._id === params.bid)
                                        ?.slice(-10)
                                        .toReversed()
                                        .map((order: any) => (
                                            <div
                                                className="w-full flex flex-col shadow p-2 mt-2"
                                                key={order?._id}
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
                                Pending Orders
                            </h1>
                            <hr className="m-3 border-taupe-500 dark:border-taupe-400" />
                            <div className="pb-2">
                                <h1 className="text-sm text-center text-taupe-600 dark:text-taupe-200">
                                    No orders yet.
                                </h1>
                            </div>
                        </div>
                        {!isLoadingPermission &&
                            dataPermission &&
                            (dataPermission?.permission?.branchID === params?.bid ||
                                (!dataPermission?.permission?.branchID &&
                                    dataPermission?.permission?.companyID === params?.cid)) &&
                            dataPermission?.permission?.permissions?.includes(
                                permissionTypes?.Admin,
                            ) && (
                                <div className="flex gap-2 mt-2">
                                    <Link
                                        className="flex-1 p-2 flex flex-col items-center bg-taupe-200 dark:bg-taupe-600 rounded-lg cursor-pointer hover:bg-taupe-300 dark:hover:bg-taupe-500 transition duration-300"
                                        href={`/company/${params.cid}/branch/${params.bid}/settings`}
                                    >
                                        <FontAwesomeIcon className="m-2" icon={faGear} size="lg" />
                                        <h1 className="text-sm font-bold text-center text-taupe-600 dark:text-taupe-200">
                                            Settings
                                        </h1>
                                    </Link>
                                    <Link
                                        className="flex-1 p-2 flex flex-col items-center bg-taupe-200 dark:bg-taupe-600 rounded-lg cursor-pointer hover:bg-taupe-300 dark:hover:bg-taupe-500 transition duration-300"
                                        href={`/company/${params.cid}/branch/${params.bid}/employees`}
                                    >
                                        <FontAwesomeIcon className="m-2" icon={faUsers} size="lg" />
                                        <h1 className="text-sm font-bold text-center text-taupe-600 dark:text-taupe-200">
                                            Employees
                                        </h1>
                                    </Link>
                                </div>
                            )}
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
                                        dataPermission?.permission?.permissions?.includes(
                                            permissionTypes?.Admin,
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
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Add Menu Item">
                <MenuItemForm
                    onFinish={() => {
                        fetchMenu();
                        setModalOpen(false);
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
                <div className="flex flex-col p-2 cursor-pointer">
                    <div className="flex items-center flex-wrap shadow-lg">
                        <div>
                            <Image
                                className="w-screen sm:max-w-sm rounded-lg object-cover"
                                src={selectedItem?.picture?.[1]}
                                alt={selectedItem?.name}
                                width={1000}
                                height={1000}
                                onLoad={() => setIsLoadingImage(false)}
                                onError={() => setIsLoadingImage(false)}
                            />
                            <Loading loading={isLoadingImage} />
                        </div>
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
                    <div className="flex flex-col gap-2 my-2">
                        <Button text="Edit" />
                    </div>
                </div>
            </ViewMenuItem>
        </div>
    );
}
