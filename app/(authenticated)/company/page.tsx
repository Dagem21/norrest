"use client";

import Loading from "@/components/loadingComponent";
import useApiFetch from "@/hooks/useAPIFetch";
import { MenuContext } from "@/providers/menu";
import { faExternalLink, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function Company() {
    const menuContext = useContext(MenuContext);
    const [companies, setCompanies] = useState<Array<any>>([])

    useEffect(() => {
        menuContext?.setTitle("Restaurants");
    });

    const { data, isLoading, errors } = useApiFetch(
        {
            url: "/api/at/company",
            method: "GET",
        },
        true,
    );

    useEffect(() => {
        if (!isLoading && data) {
            setCompanies(data?.permission)
        }
        else if (!isLoading && errors?.details) {
            alert(errors?.details?.response?.data?.error)
        }
    }, [data, isLoading, errors])

    return (
        <div className="flex flex-col flex-1 items-center">
            <div className="flex flex-wrap gap-2 justify-start w-full">
                {!isLoading && companies.length > 0 && companies.map(permission =>
                    <div className="w-sm p-2 bg-taupe-200 dark:bg-taupe-600 rounded-lg" key={permission?._id}>
                        <div className="relative">
                            <Link href={`/company/${permission?.company?._id}/settings`}>
                                <FontAwesomeIcon
                                    className="absolute top-0 right-0 cursor-pointer m-1"
                                    icon={faGear}
                                />
                            </Link>
                            <h1 className="text-sm font-bold text-center text-taupe-600 dark:text-taupe-200">
                                {permission?.company?.name}
                            </h1>
                        </div>
                        <hr className="m-3 border-taupe-500 dark:border-taupe-400" />
                        <div className="pb-2">
                            {permission?.branches?.length > 0 && permission?.branches?.map((branch: any) =>
                                <div className="flex justify-between p-2 shadow" key={branch?._id}>
                                    <h1 className="text-sm text-center text-taupe-600 dark:text-taupe-200">
                                        {branch?.name}
                                    </h1>
                                    <Link href={`/company/${branch?.companyID}/branch/${branch?._id}`}>
                                        <FontAwesomeIcon icon={faExternalLink} />
                                    </Link>
                                </div>
                            )}
                            {permission?.branches?.length === 0 && <h1 className="text-sm text-center">No branches found.</h1>}
                        </div>
                    </div>
                )}
                {!isLoading && companies.length === 0 &&
                    <h1 className="text-sm text-center">No registered company yet.</h1>
                }
                <Loading loading={isLoading} />
            </div>
        </div>
    );
}
