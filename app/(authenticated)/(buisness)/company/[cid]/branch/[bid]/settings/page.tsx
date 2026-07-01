"use client";

import BranchForm from "@/components/forms/company/companyBranch";
import UpdateBranchForm from "@/components/forms/company/companyUpdateBranch";
import Loading from "@/components/loadingComponent";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import useApiFetch from "@/hooks/useAPIFetch";
import { MenuContext } from "@/providers/menu";
import { faAt, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Setting() {
    const menuContext = useContext(MenuContext);
    const params = useParams<{ cid: string; bid: string }>();
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        menuContext?.setTitle("Setting");
    });

    const { data, isLoading, errors } = useApiFetch(
        {
            url: `/api/at/company/branch?branchID=${params?.bid}`,
            method: "GET",
        },
        true,
    );

    return (
        <div className="flex flex-col flex-1 items-center">
            <div className="flex flex-col w-full">
                <div className="w-full overflow-x-auto">
                    <div className="mb-2 p-4 bg-taupe-200 dark:bg-taupe-600 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-lg font-bold text-taupe-600 dark:text-taupe-400">
                                Branch Information
                            </h1>
                            <Button
                                type="button"
                                onClick={() => setModalOpen(true)}
                                icon={<FontAwesomeIcon icon={faPen} />}
                            />
                        </div>
                        {!isLoading && data && (
                            <div className="w-full gap-4 mt-4">
                                <div className="grid gap-4 mb-4 md:grid-cols-2 xl:grid-cols-4">
                                    <div>
                                        <label htmlFor="firstName" className="block mb-2 text-xs">
                                            Name
                                        </label>
                                        <div
                                            className={`flex items-center text-sm rounded-md transition duration-300 ease shadow-sm 
                                        hover:border-slate-300 focus-within:border-slate-400 focus-within:shadow`}
                                        >
                                            <div
                                                className={`w-full p-2 outline-none rounded-md accent-taupe-900`}
                                            >
                                                {data?.branch?.name || "N/A"}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block mb-2 text-xs">
                                            Phone number
                                        </label>
                                        <div
                                            className={`flex items-center text-sm rounded-md transition duration-300 ease shadow-sm 
                                        hover:border-slate-300 focus-within:border-slate-400 focus-within:shadow`}
                                        >
                                            <div className="flex items-center h-full border-e border-gray-400 py-2 px-4 select-none">
                                                +251
                                            </div>
                                            <div
                                                className={`w-full p-2 outline-none rounded-md accent-taupe-900`}
                                            >
                                                {data?.branch?.phoneNumber?.slice(-9) || "N/A"}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block mb-2 text-xs">
                                            Email
                                        </label>
                                        <div
                                            className={`flex items-center text-sm rounded-md transition duration-300 ease shadow-sm 
                                        hover:border-slate-300 focus-within:border-slate-400 focus-within:shadow`}
                                        >
                                            <div className="flex items-center h-full border-e border-gray-400 py-2 px-4 select-none">
                                                <FontAwesomeIcon icon={faAt} />
                                            </div>
                                            <div
                                                className={`w-full p-2 outline-none rounded-md accent-taupe-900`}
                                            >
                                                {data?.branch?.email || "N/A"}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block mb-2 text-xs">
                                            Address
                                        </label>
                                        <div
                                            className={`flex items-center text-sm rounded-md transition duration-300 ease shadow-sm 
                                        hover:border-slate-300 focus-within:border-slate-400 focus-within:shadow`}
                                        >
                                            <div
                                                className={`w-full p-2 outline-none rounded-md accent-taupe-900`}
                                            >
                                                {data?.branch?.address || "N/A"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="w-fit m-auto">
                            <Loading loading={isLoading} />
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Update Branch">
                <UpdateBranchForm
                    branch={data?.branch}
                    onFinish={() => {
                        setModalOpen(false);
                    }}
                />
            </Modal>
        </div>
    );
}
