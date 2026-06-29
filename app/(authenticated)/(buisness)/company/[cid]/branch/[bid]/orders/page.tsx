"use client";

import Loading from "@/components/loadingComponent";
import useApiFetch from "@/hooks/useAPIFetch";
import { MenuContext } from "@/providers/menu";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Orders() {
    const params = useParams<{ cid: string; bid: string }>();
    const searchParams = useSearchParams();
    const orderStatus = searchParams.get("status");
    const menuContext = useContext(MenuContext);

    useEffect(() => {
        menuContext?.setTitle(`${orderStatus || ""} Orders`);
    });

    const {
        data,
        fetchData,
        isLoading,
        errors,
    } = useApiFetch(
        {
            url: `/api/at/company/branch/orders?branchID=${params?.bid}${orderStatus ? `&status=${orderStatus}` : ''}`,
            method: "GET",
        },
        true,
    );

    return (
        <div className="flex flex-col flex-1 items-center">
            <div className="flex flex-col w-full">
                {!isLoading &&
                    <div className="p-2">
                        {data?.orders && data?.orders?.length === 0 &&
                            <h1 className="text-sm text-center text-taupe-600 dark:text-taupe-200">
                                No incoming orders!
                            </h1>
                        }
                    </div>
                }
                <div className="flex items-center">
                    <Loading loading={isLoading} />
                </div>
            </div>
        </div>
    );
}
