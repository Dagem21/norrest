"use client";

import Loading from "@/components/loadingComponent";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import useApiFetch from "@/hooks/useAPIFetch";
import { MenuContext } from "@/providers/menu";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Setting() {
    const menuContext = useContext(MenuContext);
    const params = useParams<{ cid: string; bid: string }>();

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

    const [editGeneralInfoMode, setEditGeneralInfoMode] = useState(false);

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
                                onClick={() => setEditGeneralInfoMode(!editGeneralInfoMode)}
                                icon={<FontAwesomeIcon icon={faPen} />}
                            />
                        </div>
                        {!isLoading && data &&
                            <div className="flex flex-wrap justify-between gap-4 mt-4">
                                <div className="w-full md:w-1/2 lg:w-1/4">
                                    <label className="block text-xs font-medium text-taupe-600 dark:text-taupe-400 mb-1">
                                        Name
                                    </label>
                                    <Input
                                        className={`${!editGeneralInfoMode && "border-0 cursor-not-allowed shadow-lg"}`}
                                        type="text"
                                        value={data?.branch?.name}
                                        disabled={!editGeneralInfoMode}
                                    />
                                </div>

                                <div className="w-full md:w-1/2 lg:w-1/4">
                                    <label className="block text-xs font-medium text-taupe-600 dark:text-taupe-400 mb-1">
                                        Phone Number
                                    </label>
                                    <Input
                                        className={`${!editGeneralInfoMode && "border-0 cursor-not-allowed shadow-lg"}`}
                                        type="phone"
                                        value={data?.branch?.phoneNumber}
                                        disabled={!editGeneralInfoMode}
                                    />
                                </div>

                                <div className="w-full md:w-1/2 lg:w-1/4">
                                    <label className="block text-xs font-medium text-taupe-600 dark:text-taupe-400 mb-1">
                                        Email Address
                                    </label>
                                    <Input
                                        className={`${!editGeneralInfoMode && "border-0 cursor-not-allowed shadow-lg"}`}
                                        type="email"
                                        value={data?.branch?.email}
                                        disabled={!editGeneralInfoMode}
                                    />
                                </div>

                                <div className="w-full md:w-1/2 lg:w-1/5">
                                    <label className="block text-xs font-medium text-taupe-600 dark:text-taupe-400 mb-1">
                                        Address
                                    </label>
                                    <Input
                                        className={`${!editGeneralInfoMode && "border-0 cursor-not-allowed shadow-lg"}`}
                                        type="text"
                                        value={data?.branch?.address}
                                        disabled={!editGeneralInfoMode}
                                    />
                                </div>
                            </div>}
                        <div className="w-fit m-auto">
                            <Loading loading={isLoading} />
                        </div>
                        {editGeneralInfoMode && (
                            <div className="flex justify-center mt-4">
                                <Button text="Update" type="button" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
