"use client";

import BranchForm from "@/components/forms/company/companyBranch";
import Modal from "@/components/ui/modal";
import Button from "@/components/ui/button";
import { MenuContext } from "@/providers/menu";
import { faAt, faGear, faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import Input from "@/components/ui/input";
import { useParams } from "next/navigation";
import useApiFetch from "@/hooks/useAPIFetch";
import Image from "next/image";
import Loading from "@/components/loadingComponent";
import Link from "next/link";
import UpdateBranchForm from "@/components/forms/company/companyUpdateBranch";
import UpdateCompanyForm from "@/components/forms/company/companyUpdate";

export default function Setting() {
    const params = useParams<{ cid: string }>();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isCompanyModalOpen, setCompanyModalOpen] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState<any>();
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

    const {
        data: dataBranch,
        fetchData,
        isLoading: isLoadingBranch,
        errors: errorsBranch,
    } = useApiFetch(
        {
            url: `/api/at/company/branch?companyID=${params?.cid}`,
            method: "GET",
        },
        true,
    );

    const [editGeneralInfoMode, setEditGeneralInfoMode] = useState(false);

    const handleEditCompany = () => {
        setCompanyModalOpen(true);
    };

    const handleEdit = (branch: any) => {
        setSelectedBranch(branch);
        setModalOpen(true);
    };

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
                                onClick={handleEditCompany}
                                icon={<FontAwesomeIcon icon={faPen} />}
                            />
                        </div>
                        {!isLoading && data && (
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center justify-center max-w-sm shadow-lg">
                                    <Image
                                        className="w-screen sm:max-w-sm rounded-lg object-cover"
                                        src={data?.company?.picture?.[1]}
                                        alt={data?.company?.name}
                                        width={500}
                                        height={500}
                                    />
                                </div>
                                <div className="grow flex flex-col gap-2">
                                    <div>
                                        <label htmlFor="fatherName" className="block mb-2 text-xs">
                                            Name
                                        </label>
                                        <div
                                            className={`w-70 flex items-center text-sm rounded-md transition duration-300 ease shadow-sm 
                                        hover:border-slate-300 focus-within:border-slate-400 focus-within:shadow`}
                                        >
                                            <div
                                                className={`w-full p-2 outline-none rounded-md accent-taupe-900`}
                                            >
                                                {data?.company?.name || "N/A"}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block mb-2 text-xs">
                                            Phone number
                                        </label>
                                        <div
                                            className={`w-70 flex items-center text-sm rounded-md transition duration-300 ease shadow-sm 
                                        hover:border-slate-300 focus-within:border-slate-400 focus-within:shadow`}
                                        >
                                            <div className="flex items-center h-full border-e border-gray-400 py-2 px-4 select-none">
                                                +251
                                            </div>
                                            <div
                                                className={`w-full p-2 outline-none rounded-md accent-taupe-900`}
                                            >
                                                {data?.company?.phoneNumber?.slice(-9) || "N/A"}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-xs">
                                            Email
                                        </label>
                                        <div
                                            className={`w-70 flex items-center text-sm rounded-md transition duration-300 ease shadow-sm 
                                                                                                            hover:border-slate-300 focus-within:border-slate-400 focus-within:shadow`}
                                        >
                                            <div className="flex items-center h-full border-e border-gray-400 py-2 px-4 select-none">
                                                <FontAwesomeIcon icon={faAt} />
                                            </div>
                                            <div
                                                className={`w-full p-2 outline-none rounded-md accent-taupe-900`}
                                            >
                                                {data?.company?.email || "N/A"}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="fatherName" className="block mb-2 text-xs">
                                            Name
                                        </label>
                                        <div
                                            className={`w-70 flex items-center text-sm rounded-md transition duration-300 ease shadow-sm 
                                        hover:border-slate-300 focus-within:border-slate-400 focus-within:shadow`}
                                        >
                                            <div
                                                className={`w-full p-2 outline-none rounded-md accent-taupe-900`}
                                            >
                                                {data?.company?.website || "N/A"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
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
                                                        onClick={() => handleEdit(branch)}
                                                    >
                                                        <FontAwesomeIcon icon={faPen} />
                                                    </button>
                                                    <Link
                                                        className="bg-taupe-900 py-1 px-2 hover:bg-taupe-700 text-white font-bold rounded"
                                                        title="Remove"
                                                        href={`/company/${params.cid}/branch/${branch?._id}/settings`}
                                                    >
                                                        <FontAwesomeIcon icon={faGear} />
                                                    </Link>
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
                            {!isLoadingBranch && dataBranch?.branches?.length === 0 && (
                                <h1 className="text-sm text-center my-2">No branches yet.</h1>
                            )}
                            <div className="w-fit m-auto my-2">
                                <Loading loading={isLoading} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Add Branch">
                <BranchForm
                    onFinish={() => {
                        fetchData();
                        setModalOpen(false);
                    }}
                />
            </Modal>

            <Modal
                isOpen={isCompanyModalOpen}
                onClose={() => setCompanyModalOpen(false)}
                title="Update Company"
            >
                <UpdateCompanyForm
                    company={data?.company}
                    onFinish={() => {
                        setCompanyModalOpen(false);
                    }}
                />
            </Modal>

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Update Branch">
                <UpdateBranchForm
                    branch={selectedBranch}
                    onFinish={() => {
                        setModalOpen(false);
                        fetchData();
                    }}
                />
            </Modal>
        </div>
    );
}
