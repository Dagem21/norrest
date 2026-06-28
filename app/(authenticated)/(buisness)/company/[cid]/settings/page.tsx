"use client";

import BranchForm from "@/components/forms/company/companyBranch";
import Modal from "@/components/ui/modal";
import Button from "@/components/ui/button";
import { MenuContext } from "@/providers/menu";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import Input from "@/components/ui/input";
import { useParams } from "next/navigation";
import useApiFetch from "@/hooks/useAPIFetch";
import Image from "next/image";
import Loading from "@/components/loadingComponent";

export default function Setting() {
    const params = useParams<{ cid: string }>();
    const [isModalOpen, setModalOpen] = useState(false);
    const menuContext = useContext(MenuContext);

    useEffect(() => {
        menuContext?.setTitle("Setting");
    });

    const { data, isLoading, errors } = useApiFetch(
        {
            url: `/api/at/company?companyID=${params?.cid}`,
            method: "GET",
        },
        true,
    );

    const { data: dataBranch, fetchData, isLoading: isLoadingBranch, errors: errorsBranch } = useApiFetch(
        {
            url: `/api/at/company/branch?companyID=${params?.cid}`,
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
                                General Information
                            </h1>
                            <Button
                                type="button"
                                onClick={() => setEditGeneralInfoMode(!editGeneralInfoMode)}
                                icon={<FontAwesomeIcon icon={faPen} />}
                            />
                        </div>
                        {!isLoading && data &&
                            <div className="flex flex-wrap gap-4">
                                <div className="max-w-sm shadow-lg">
                                    <Image
                                        className="w-screen sm:max-w-sm rounded-lg object-cover"
                                        src={data?.company?.picture?.[1]}
                                        alt={data?.company?.name}
                                        width={1000}
                                        height={1000}
                                    />
                                </div>
                                <div className="grow flex flex-col gap-2">
                                    <div className="w-full md:w-sm">
                                        <label className="block text-xs font-medium text-taupe-600 dark:text-taupe-400 mb-1">
                                            Name
                                        </label>
                                        <Input
                                            disabled={!editGeneralInfoMode}
                                            className={`${!editGeneralInfoMode && "border-0 cursor-not-allowed shadow-lg"}`}
                                            value={data?.company?.name}
                                        />
                                    </div>

                                    <div className="w-full md:w-sm">
                                        <label className="block text-xs font-medium text-taupe-600 dark:text-taupe-400 mb-1">
                                            Phone Number
                                        </label>
                                        <Input
                                            type="phone"
                                            disabled={!editGeneralInfoMode}
                                            className={`${!editGeneralInfoMode && "border-0 cursor-not-allowed shadow-lg"}`}
                                            value={data?.company?.phoneNumber}
                                        />
                                    </div>

                                    <div className="w-full md:w-sm">
                                        <label className="block text-xs font-medium text-taupe-600 dark:text-taupe-400 mb-1">
                                            Email Address
                                        </label>
                                        <Input
                                            type="email"
                                            disabled={!editGeneralInfoMode}
                                            className={`${!editGeneralInfoMode && "border-0 cursor-not-allowed shadow-lg"}`}
                                            value={data?.company?.email}
                                        />
                                    </div>

                                    <div className="w-full md:w-sm">
                                        <label className="block text-xs font-medium text-taupe-600 dark:text-taupe-400 mb-1">
                                            Website URL
                                        </label>
                                        <Input
                                            type="url"
                                            disabled={!editGeneralInfoMode}
                                            className={`${!editGeneralInfoMode && "border-0 cursor-not-allowed shadow-lg"}`}
                                            value={data?.company?.website}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="w-fit m-auto my-2">
                            <Loading loading={isLoading} />
                        </div>
                        {editGeneralInfoMode && (
                            <div className="flex justify-center mt-4">
                                <Button
                                    text="Update"
                                    type="button"
                                    onClick={() => setModalOpen(true)}
                                />
                            </div>
                        )}
                    </div>
                    <div className="mb-2 p-4 bg-taupe-200 dark:bg-taupe-600 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-lg font-bold text-taupe-600 dark:text-taupe-400">
                                Branches
                            </h1>
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    onClick={() => setModalOpen(!isModalOpen)}
                                    icon={<FontAwesomeIcon icon={faPlus} />}
                                />
                            </div>
                        </div>
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
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="ps-2 pe-6 py-3 font-medium text-nowrap"
                                        >
                                            Phone
                                        </th>
                                        <th
                                            scope="col"
                                            className="ps-2 pe-6 py-3 font-medium text-nowrap"
                                        >
                                            Address
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
                                    {!isLoadingBranch &&
                                        dataBranch?.branches?.length > 0 &&
                                        dataBranch?.branches?.map((branch: any, index: number) => (
                                            <tr className="bg-neutral-primary" key={branch?._id}>
                                                <td className="ps-2 pe-6 py-4">{index + 1}</td>
                                                <th
                                                    scope="row"
                                                    className="ps-2 pe-6 py-4 font-medium text-heading whitespace-nowrap"
                                                >
                                                    {branch?.name}
                                                </th>
                                                <td className="ps-2 pe-6 py-4 text-nowrap">
                                                    {branch?.email}
                                                </td>
                                                <td className="ps-2 pe-6 py-4 text-nowrap">
                                                    {branch?.phoneNumber}
                                                </td>
                                                <td className="ps-2 pe-6 py-4 text-nowrap">
                                                    {branch?.address}
                                                </td>
                                                <td className="ps-2 py-3 flex gap-3">
                                                    <button
                                                        className="bg-blue-950 py-1 px-2 hover:bg-blue-700 text-white font-bold rounded"
                                                        title="Edit"
                                                    >
                                                        <FontAwesomeIcon icon={faPen} />
                                                    </button>
                                                    <button
                                                        className="bg-red-950 py-1 px-2 hover:bg-red-700 text-white font-bold rounded"
                                                        title="Remove"
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            {!isLoadingBranch && dataBranch?.branches?.length === 0 &&
                                <h1 className="text-sm text-center my-2">No branches yet.</h1>
                            }
                            <div className="w-fit m-auto my-2">
                                <Loading loading={isLoading} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Add Branch">
                <BranchForm onFinish={() => {
                    fetchData();
                    setModalOpen(false);
                }} />
            </Modal>
        </div>
    );
}
