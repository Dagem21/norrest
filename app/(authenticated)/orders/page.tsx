"use client";

import { orderStatusTypes } from "@/assets/enums/enum";
import Loading from "@/components/loadingComponent";
import PageNavigator from "@/components/pageNavigator";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import useApiFetch from "@/hooks/useAPIFetch";
import { useCartStore } from "@/hooks/useCartStore";
import { MenuContext } from "@/providers/menu";
import { ToastContext } from "@/providers/toastProvider";
import { formatDate } from "@/utils/formatDate";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Orders() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderStatus = searchParams.get("status");
    const menuContext = useContext(MenuContext);
    const toaster = useContext(ToastContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>();
    const [openOrder, setOpenOrder] = useState(false)
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const {
        carts,
        addToActiveCart,
        setActiveCart,
        updateCartID,
        clearCart,
    } = useCartStore();

    useEffect(() => {
        menuContext?.setTitle("My Orders");
    });

    const { data, fetchData, isLoading, errors } = useApiFetch(
        {
            url: `/api/at/user/orders?${orderStatus ? `status=${orderStatus}` : ""}`,
            method: "GET",
        },
        true,
    );

    const { data: dataDelete, fetchData: fetchDataDelete, isLoading: isLoadingDelete, errors: errorsDelete } = useApiFetch(
        {
            url: `/api/at/user/orders`,
            method: "DELETE",
        },
        false,
    );

    useEffect(() => {
        if (!isLoadingDelete && dataDelete) {
            setDeleteModalOpen(false);

            fetchData();

            const toast = {
                message: "Order deleted.",
                type: "success",
            };
            toaster?.addToast(toast);
        } else if (!isLoadingDelete && errorsDelete?.details) {
            const toast = {
                message: errorsDelete?.details?.response?.data?.error,
                type: "error",
            };
            toaster?.addToast(toast);
        }
    }, [isLoadingDelete, dataDelete, errorsDelete]);

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

    const handleOrderUpdate = () => {
        const branchID = selectedOrder?.branchID?._id;
        clearCart(branchID);
        setActiveCart(branchID);
        updateCartID(selectedOrder?._id, branchID);
        selectedOrder?.items?.forEach((it: any) => {
            const item = {
                id: it?._id,
                quantity: it?.quantity,
                item: it?.itemID,
            }
            addToActiveCart(item, branchID)
        });

        router.push(`/menu/${branchID}`)
    }

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
                                        data?.orders?.map((order: any) => (
                                            <tr className="bg-neutral-primary" key={order?._id}>
                                                <td className="ps-2 pe-6 py-4">1</td>
                                                <th
                                                    scope="row"
                                                    className="ps-2 pe-6 py-4 font-medium text-heading whitespace-nowrap"
                                                >
                                                    {`${order?.branchID?.companyID?.name}, ${order?.branchID?.name}` ||
                                                        "N/A"}
                                                </th>
                                                <td className="ps-2 pe-6 py-4 text-nowrap">
                                                    {order?.items?.length}
                                                </td>
                                                <td className="ps-2 pe-6 py-4 text-nowrap">
                                                    {order?.status}
                                                </td>
                                                <td className="ps-2 pe-6 py-4 text-nowrap">
                                                    {formatDate(order?.createdAt)}
                                                </td>
                                                <td className="ps-2 pe-6 py-3 flex gap-1 ">
                                                    <button
                                                        className="bg-taupe-900 p-1 hover:bg-taupe-400 text-white font-bold rounded cursor-pointer"
                                                        title="View Order"
                                                        onClick={() => handleOrderView(order)}
                                                    >
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </button>
                                                    {(order?.status === orderStatusTypes.Cart || order?.status === orderStatusTypes.Pending) &&
                                                        <button
                                                            className="bg-yellow-900 p-1 hover:bg-yellow-400 text-white font-bold rounded cursor-pointer"
                                                            title="Update Order"
                                                            onClick={() => {
                                                                const branchID = selectedOrder?.branchID?._id;
                                                                const cart = carts[branchID];
                                                                if (cart) {
                                                                    setSelectedOrder(order);
                                                                    setOpenOrder(true);
                                                                }
                                                                else {
                                                                    setSelectedOrder(order);
                                                                    handleOrderUpdate()
                                                                }
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faPen} />
                                                        </button>
                                                    }
                                                    {(order?.status === orderStatusTypes.Cart || order?.status === orderStatusTypes.Pending) &&
                                                        <button
                                                            className="bg-red-900 p-1 hover:bg-red-400 text-white font-bold rounded cursor-pointer"
                                                            title="Delete Order"
                                                            onClick={() => {
                                                                setSelectedOrder(order);
                                                                setDeleteModalOpen(true);
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    }
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
                <div className="flex flex-col">
                    <div className="shadow">
                        <div className="flex items-center justify-center">
                            <Image
                                className="object-cover rounded-lg"
                                src={selectedOrder?.branchID?.companyID?.picture?.[0]}
                                alt={"Company profile"}
                                width={100}
                                height={25}
                            />
                        </div>
                        <h1 className="text-sm text-center text-taupe-300 font-bold">
                            {`${selectedOrder?.branchID?.companyID?.name}, ${selectedOrder?.branchID?.name}`}
                        </h1>
                        <h1 className="text-sm text-center text-taupe-300 font-bold">Items</h1>

                        <hr className="text-taupe-500 my-2 mx-4" />

                        {selectedOrder?.items?.length === 0 && (
                            <h1 className="text-center text-sm">No items in order.</h1>
                        )}
                        {selectedOrder?.items?.length > 0 && (
                            <div className="flex flex-col gap-2 p-2">
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
                </div>
            </Modal>

            <Modal
                isOpen={openOrder}
                onClose={() => setOpenOrder(false)}
                title="Update Order"
            >
                <div>
                    <h1>This will clear items in your current cart?</h1>
                    <div className="flex items-center justify-center mt-2">
                        <Button
                            text="Continue"
                            onClick={handleOrderUpdate}
                        />
                        <Button
                            text="Cancel"
                            style="secondary"
                            onClick={() => {
                                setOpenOrder(false);
                            }}
                        />
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Delete order"
            >
                <div>
                    <h1>Are you sure you want to delete this order?</h1>
                    <div className="flex items-center justify-center mt-2">
                        <Button
                            text="Delete"
                            onClick={() => {
                                fetchDataDelete({ data: { id: selectedOrder?._id } })
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
        </div>
    );
}
