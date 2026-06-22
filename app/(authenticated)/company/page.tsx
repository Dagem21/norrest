"use client";

import CompanyRegisterForm from "@/components/forms/company/companyRegister";
import Loading from "@/components/loadingComponent";
import PageNavigator from "@/components/pageNavigator";
import Button from "@/components/ui/button";
import Dropdown from "@/components/ui/dropdown";
import Modal from "@/components/ui/modal";
import useApiFetch from "@/hooks/useAPIFetch";
import { MenuContext } from "@/providers/menu";
import { ToastContext } from "@/providers/toastProvider";
import { faExternalLink, faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Company() {
    const router = useRouter();
    const toaster = useContext(ToastContext);
    const menuContext = useContext(MenuContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [companies, setCompanies] = useState<any>([]);

    useEffect(() => {
        menuContext?.setTitle("Restaurants");
    });

    const { data, fetchData, isLoading, errors } = useApiFetch(
        {
            url: "/api/at/company",
            method: "GET",
        },
        true,
    );

    useEffect(() => {
        if (!isLoading && data) {
            setCompanies(data?.permission);
        } else if (!isLoading && errors?.details) {
            const toast = {
                message: errors?.details?.response?.data?.error,
                type: "error",
            };
            toaster?.addToast(toast);
        }
    }, [data, isLoading, errors]);

    return (
        <div className="flex flex-col flex-1 items-center">
            <div className="flex flex-wrap gap-2 justify-center w-full">
                <div className="w-full py-4 px-2 bg-taupe-200 dark:bg-taupe-600 rounded-lg overflow-x-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-lg font-bold text-taupe-600 dark:text-taupe-300">
                            Hotels and Restuarants
                        </h1>

                        <Button
                            type="button"
                            onClick={() => setModalOpen(true)}
                            icon={<FontAwesomeIcon icon={faPlus} />}
                        />
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
                                        Branches
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
                                    companies?.permissions?.length > 0 &&
                                    companies?.permissions?.map((permission: any) => (
                                        <tr className="bg-neutral-primary" key={permission?._id}>
                                            <td className="ps-2 pe-6 py-4">1</td>
                                            <th
                                                scope="row"
                                                className="ps-2 pe-6 py-4 font-medium text-heading whitespace-nowrap"
                                            >
                                                {permission?.company?.name}
                                            </th>
                                            <td className="ps-2 pe-6 py-4 text-nowrap">
                                                {permission?.company?.email}
                                            </td>
                                            <td className="ps-2 pe-6 py-4 text-nowrap">
                                                {permission?.company?.phoneNumber}
                                            </td>
                                            <td className="ps-2 pe-6 py-4 text-nowrap">
                                                {permission?.branches?.length}
                                            </td>
                                            <td className="ps-2 py-3 flex gap-3">
                                                <Dropdown
                                                    title="Branches"
                                                    defaultLabel={
                                                        <FontAwesomeIcon icon={faExternalLink} />
                                                    }
                                                    onSelect={(id) => {
                                                        console.log(id);
                                                        router.push(
                                                            `/company/${permission?.companyID}/branch/${id}`,
                                                        );
                                                    }}
                                                    options={permission?.branches?.map(
                                                        (branch: any) => {
                                                            return {
                                                                id: branch?._id,
                                                                text: branch?.name,
                                                            };
                                                        },
                                                    )}
                                                />
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
                    </div>
                    <PageNavigator
                        page={companies?.page}
                        limit={companies?.limit}
                        totalPages={companies?.totalPages}
                        totalDocs={companies?.total}
                        onPageChange={(e: number) => {
                            console.log(e);
                        }}
                        onLimitChange={(e: number) => {
                            console.log(e);
                        }}
                    />
                </div>
                {!isLoading && companies.length === 0 && (
                    <h1 className="text-sm text-center">No registered company yet.</h1>
                )}
                <Loading loading={isLoading} />
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Add Company">
                <CompanyRegisterForm onFinish={fetchData} />
            </Modal>
        </div>
    );
}
