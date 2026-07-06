"use client";

import Loading from "@/components/loadingComponent";
import Dropdown from "@/components/ui/dropdown";
import useApiFetch from "@/hooks/useAPIFetch";
import { MenuContext } from "@/providers/menu";
import { SocketContext } from "@/providers/socketProvider";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function BusinessDashboard() {
    const router = useRouter();
    const menuContext = useContext(MenuContext);
    const socketContext = useContext(SocketContext);

    const { data, fetchData, isLoading, errors } = useApiFetch(
        {
            url: "/api/at/company",
            method: "GET",
        },
        true,
    );

    useEffect(() => {
        menuContext?.setTitle("");
    });
    return (
        <div className="flex flex-col flex-1 items-center">
            <div className="flex flex-wrap w-full gap-2">
                <div className="w-sm h-fit flex-1 bg-taupe-200 dark:bg-taupe-600 rounded-lg p-2">
                    sdf
                </div>
                <div className="w-sm flex flex-col gap-2">
                    <div className="bg-taupe-200 dark:bg-taupe-600 rounded-lg p-2">
                        <h1 className="text-sm text-center font-bold">Incoming Orders</h1>
                        {socketContext?.incomingOrders &&
                            socketContext?.incomingOrders?.length === 0 && (
                                <h1 className="text-xs text-center">No orders</h1>
                            )}
                        {socketContext?.incomingOrders &&
                            socketContext?.incomingOrders?.length > 0 &&
                            socketContext?.incomingOrders?.map((order: any) => (
                                <div
                                    className="w-full flex flex-col shadow p-2 mt-2"
                                    key={order?._id}
                                >
                                    <p className="m-0 text-xs text-taupe-300">
                                        {order?.branchID?.companyID?.name}, {order?.branchID?.name}
                                    </p>
                                    <div className="w-full">
                                        {order?.items
                                            ?.slice(-10)
                                            .toReversed()
                                            ?.map((item: any) => (
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
                    <div className="bg-taupe-200 dark:bg-taupe-600 rounded-lg p-2">
                        <h1 className="text-sm text-center font-bold mb-2">Companies</h1>
                        <div className="flex flex-col gap-2">
                            {!isLoading &&
                                data?.permission?.permissions?.length > 0 &&
                                data?.permission?.permissions?.map((permission: any) => (
                                    <div
                                        className="flex items-center justify-between bg-taupe-600 dark:bg-taupe-800 rounded-lg px-2"
                                        key={permission?.company?._id}
                                    >
                                        <h1 className="text-sm">{permission?.company?.name}</h1>
                                        <Dropdown
                                            title="Branches"
                                            defaultLabel={<FontAwesomeIcon icon={faExternalLink} />}
                                            onSelect={(id) => {
                                                console.log(id);
                                                router.push(
                                                    `/company/${permission?.companyID}/branch/${id}`,
                                                );
                                            }}
                                            options={permission?.branches?.map((branch: any) => {
                                                return {
                                                    id: branch?._id,
                                                    text: branch?.name,
                                                };
                                            })}
                                        />
                                    </div>
                                ))}
                            {!isLoading && data?.permission?.permissions?.length === 0 && (
                                <>
                                    <h1 className="text-sm text-center">No companies.</h1>
                                    <Link
                                        className={`bg-taupe-600 dark:bg-taupe-800 hover:bg-taupe-500 text-white font-bold py-2 px-4 rounded-lg cursor-pointer text-center`}
                                        href="/company"
                                    >
                                        Add
                                    </Link>
                                </>
                            )}
                            <div className="m-auto">
                                <Loading loading={isLoading} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
