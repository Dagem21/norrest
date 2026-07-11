"use client";

import { orderStatusTypes, permissionTypes } from "@/assets/enums/enum";
import Loading from "@/components/loadingComponent";
import PageNavigator from "@/components/pageNavigator";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import useApiFetch from "@/hooks/useAPIFetch";
import { MenuContext } from "@/providers/menu";
import { ToastContext } from "@/providers/toastProvider";
import { formatDate } from "@/utils/formatDate";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Orders() {
    const toaster = useContext(ToastContext);
    const params = useParams<{ cid: string; bid: string }>();
    const searchParams = useSearchParams();
    const orderStatus = searchParams.get("status");
    const menuContext = useContext(MenuContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>();

    useEffect(() => {
        menuContext?.setTitle(`${orderStatus || ""} Orders`);
    });

    const { data, fetchData, isLoading, errors } = useApiFetch(
        {
            url: `/api/at/company/branch/orders?branchID=${params?.bid}${orderStatus ? `&status=${orderStatus}` : ""}`,
            method: "GET",
        },
        true,
    );

    const { data: dataPermission, isLoading: isLoadingPermission } = useApiFetch(
        {
            url: `/api/at/company/branch/permission?branchID=${params?.bid}`,
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

    useEffect(() => {
        if (!isLoadingOrderUpdate && dataOrderUpdate) {
            const toast = {
                message: "Order status updated.",
                type: "success",
            };
            toaster?.addToast(toast);
            fetchData();
            setModalOpen(false);
        } else if (!isLoadingOrderUpdate && errorsOrderUpdate?.details) {
            const toast = {
                message:
                    errorsOrderUpdate?.details?.response?.data?.error || errorsOrderUpdate?.message,
                type: "error",
            };
            toaster?.addToast(toast);
        }
    }, [isLoadingOrderUpdate, dataOrderUpdate, errorsOrderUpdate]);

    const handlePageChange = (page: number) => {
        fetchData({ params: { page } });
    };

    const handleLimitChange = (limit: number) => {
        fetchData({ params: { limit } });
    };

    const handleOrderView = (order: any) => {
        setSelectedOrder(order);
        setModalOpen(true);
    };

    const handleOrderUpdate = (orderID: string, status: string) => {
        fetchDataOrderUpdate({
            data: { orderID, status },
        });
    };

    return (
        <div className="flex flex-col flex-1 items-center">
            <div className="flex flex-col w-full">
                <div className="flex flex-col w-full">
                    <div className="w-full py-4 px-2 bg-taupe-200 dark:bg-taupe-600 rounded-lg overflow-x-auto">
                        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xl rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-body">
                                <thead className="text-sm text-body bg-taupe-400 dark:bg-taupe-800">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="ps-2 pe-6 py-3 font-medium text-nowrap"
                                        >
                                            #
                                        </th>
                                        <th
                                            scope="col"
                                            className="ps-2 pe-6 py-3 font-medium text-nowrap"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="ps-2 pe-6 py-3 font-medium text-nowrap"
                                        >
                                            Phone Number
                                        </th>
                                        <th
                                            scope="col"
                                            className="ps-2 pe-6 py-3 font-medium text-nowrap"
                                        >
                                            Items
                                        </th>
                                        <th
                                            scope="col"
                                            className="ps-2 pe-6 py-3 font-medium text-nowrap"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="ps-2 pe-6 py-3 font-medium text-nowrap"
                                        >
                                            Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="ps-2 pe-6 py-3 font-medium text-nowrap"
                                        >
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!isLoading &&
                                        data?.orders?.length > 0 &&
                                        data?.orders?.map((order: any, index: number) => (
                                            <tr className="bg-neutral-primary" key={order?._id}>
                                                <td className="ps-2 pe-6 py-4">{index + 1}</td>
                                                <th
                                                    scope="row"
                                                    className="ps-2 pe-6 py-4 font-medium text-heading whitespace-nowrap"
                                                >
                                                    {order?.userID?.firstName || "N/A"}
                                                </th>
                                                <td className="ps-2 pe-6 py-4 text-nowrap">
                                                    {order?.userID?.phoneNumber || "N/A"}
                                                </td>
                                                <td className="ps-2 pe-6 py-4 text-nowrap">
                                                    {order?.items?.length}
                                                </td>
                                                <td className="ps-2 pe-6 py-4 text-nowrap">
                                                    {order?.status}
                                                </td>
                                                <td className="ps-2 pe-6 py-4 text-nowrap">
                                                    {formatDate(order?.updatedAt)}
                                                </td>
                                                <td className="ps-2 pe-6 py-3 flex gap-1 ">
                                                    <button
                                                        className="bg-taupe-900 p-1 hover:bg-taupe-400 text-white font-bold rounded cursor-pointer"
                                                        title="View Order"
                                                        onClick={() => handleOrderView(order)}
                                                    >
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            {!isLoading && data?.orders?.length === 0 && (
                                <h1 className="text-sm text-center my-2">No orders yet.</h1>
                            )}
                            <div className="w-fit m-auto my-2">
                                <Loading loading={isLoading} />
                            </div>
                        </div>
                        <PageNavigator
                            page={data?.page}
                            limit={data?.limit}
                            totalPages={data?.totalPages}
                            totalDocs={data?.total}
                            onPageChange={handlePageChange}
                            onLimitChange={handleLimitChange}
                        />
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Order Details">
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
        </div>
    );
}
