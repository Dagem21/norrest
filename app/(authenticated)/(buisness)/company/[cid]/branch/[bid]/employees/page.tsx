"use client";

import EmployeeForm from "@/components/forms/user/addEmployee";
import Modal from "@/components/ui/modal";
import PageNavigator from "@/components/pageNavigator";
import { MenuContext } from "@/providers/menu";
import { formatDate } from "@/utils/formatDate";
import { faBan, faCheckCircle, faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import Button from "@/components/ui/button";
import useApiFetch from "@/hooks/useAPIFetch";
import { useParams } from "next/navigation";
import Loading from "@/components/loadingComponent";
import UpdateEmployeeForm from "@/components/forms/user/updateEmployee";
import { employeeStatusTypes, userStatusTypes } from "@/assets/enums/enum";
import { ToastContext } from "@/providers/toastProvider";

export default function Employee() {
    const params = useParams<{ cid: string; bid: string }>();
    const toaster = useContext(ToastContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedEmpoyee, setSelectedEmpoyee] = useState<any>();
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [isActivateModalOpen, setActivateModalOpen] = useState(false);
    const [isDisableModalOpen, setDisableModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const menuContext = useContext(MenuContext);

    useEffect(() => {
        menuContext?.setTitle("Employees");
    });

    const { data, fetchData, isLoading, errors } = useApiFetch(
        {
            url: `/api/at/company/employee?companyID=${params.cid}&branchID=${params.bid}`,
            method: "GET",
        },
        true,
    );

    const {
        data: dataUpdate,
        fetchData: fetchDataUpdate,
        isLoading: isLoadingUpdate,
        errors: errorsUpdate,
    } = useApiFetch(
        {
            url: `/api/at/company/employee?branchID=${params.bid}`,
            method: "PUT",
        },
        false,
    );

    useEffect(() => {
        if (!isLoadingUpdate && dataUpdate) {
            setActivateModalOpen(false);
            setDisableModalOpen(false);
            setDeleteModalOpen(false);

            fetchData();

            const toast = {
                message: "Permission updated.",
                type: "success",
            };
            toaster?.addToast(toast);
        } else if (!isLoadingUpdate && errorsUpdate?.details) {
            const toast = {
                message: errorsUpdate?.details?.response?.data?.error,
                type: "error",
            };
            toaster?.addToast(toast);
        }
    }, [isLoadingUpdate, dataUpdate, errorsUpdate]);

    const handleEdit = (permission: any) => {
        setSelectedEmpoyee(permission);
        setUpdateModalOpen(true);
    };

    const handleActivate = (permission: any) => {
        setSelectedEmpoyee(permission);
        setActivateModalOpen(true);
    };

    const handleDisable = (permission: any) => {
        setSelectedEmpoyee(permission);
        setDisableModalOpen(true);
    };

    const handleDelete = (permission: any) => {
        setSelectedEmpoyee(permission);
        setDeleteModalOpen(true);
    };

    const handleUpdate = (permission: any, status: userStatusTypes) => {
        fetchDataUpdate({
            data: {
                employee: {
                    _id: permission?._id,
                    status,
                },
            },
        });
    };

    return (
        <div className="flex flex-col flex-1 items-center">
            <div className="flex flex-col w-full">
                <div className="w-full py-4 px-2 bg-taupe-200 dark:bg-taupe-600 rounded-lg overflow-x-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-lg font-bold text-taupe-600 dark:text-taupe-300">
                            Employees Directory
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
                                        Employee Name
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
                                        Role
                                    </th>
                                    <th
                                        scope="col"
                                        className="ps-2 pe-6 py-3 font-medium text-nowrap"
                                    >
                                        Branch
                                    </th>
                                    <th
                                        scope="col"
                                        className="ps-2 pe-6 py-3 font-medium text-nowrap"
                                    >
                                        Last Login
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
                                    data?.permissions?.length > 0 &&
                                    data?.permissions?.map((permission: any, index: number) => (
                                        <tr className="bg-neutral-primary" key={permission?._id}>
                                            <td className="ps-2 pe-6 py-4">1</td>
                                            <th
                                                scope="row"
                                                className="ps-2 pe-6 py-4 font-medium text-heading whitespace-nowrap"
                                            >
                                                {permission?.user?.firstName}
                                            </th>
                                            <td className="ps-2 pe-6 py-4 text-nowrap">
                                                {permission?.user?.email}
                                            </td>
                                            <td className="ps-2 pe-6 py-4 text-nowrap">
                                                {permission?.role}
                                            </td>
                                            <td className="ps-2 pe-6 py-4 text-nowrap">
                                                {permission?.branch
                                                    ? permission?.branch?.name
                                                    : "Main"}
                                            </td>
                                            <td className="ps-2 pe-6 py-4 text-nowrap">
                                                {formatDate("2023-10-01 10:00:00")}
                                            </td>
                                            <td className="ps-2 pe-6 py-3 flex gap-1 ">
                                                <button
                                                    className="bg-blue-950 p-1 hover:bg-blue-700 text-white font-bold rounded"
                                                    title="Edit"
                                                    onClick={() => {
                                                        handleEdit(permission);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faPen} />
                                                </button>

                                                {permission?.status === userStatusTypes.Active && (
                                                    <button
                                                        className="bg-yellow-900 p-1 hover:bg-yellow-700 text-white font-bold rounded"
                                                        title="Disable"
                                                        onClick={() => {
                                                            handleDisable(permission);
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faBan} />
                                                    </button>
                                                )}

                                                {permission?.status ===
                                                    userStatusTypes.Deactivated && (
                                                    <button
                                                        className="bg-green-900 p-1 hover:bg-green-700 text-white font-bold rounded"
                                                        title="Activate"
                                                        onClick={() => {
                                                            handleActivate(permission);
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faCheckCircle} />
                                                    </button>
                                                )}

                                                <button
                                                    className="bg-red-950 p-1 hover:bg-red-700 text-white font-bold rounded"
                                                    title="Remove"
                                                    onClick={() => {
                                                        handleDelete(permission);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        {!isLoading && data?.permissions?.length === 0 && (
                            <h1 className="text-sm text-center my-2">No employees yet.</h1>
                        )}
                        <div className="w-fit m-auto my-2">
                            <Loading loading={isLoading} />
                        </div>
                    </div>
                    <PageNavigator
                        page={1}
                        limit={10}
                        totalPages={10}
                        totalDocs={100}
                        onPageChange={(e: number) => {
                            console.log(e);
                        }}
                        onLimitChange={(e: number) => {
                            console.log(e);
                        }}
                    />
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Add Employee">
                <EmployeeForm
                    onFinish={() => {
                        fetchData();
                        setModalOpen(false);
                    }}
                />
            </Modal>

            <Modal
                isOpen={isUpdateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
                title="Update Employee"
            >
                <UpdateEmployeeForm
                    permission={selectedEmpoyee}
                    onFinish={() => {
                        fetchData();
                        setUpdateModalOpen(false);
                    }}
                />
            </Modal>

            <Modal
                isOpen={isActivateModalOpen}
                onClose={() => setDisableModalOpen(false)}
                title="Activate Employee Access"
            >
                <div>
                    <h1>Are you sure you want to activate this employees' access?</h1>
                    <div className="flex items-center justify-center mt-2">
                        <Button
                            text="Activate"
                            onClick={() => {
                                handleUpdate(selectedEmpoyee, userStatusTypes.Active);
                            }}
                            isLoading={isLoadingUpdate}
                        />
                        <Button
                            text="Cancel"
                            style="secondary"
                            onClick={() => {
                                setDisableModalOpen(false);
                            }}
                        />
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={isDisableModalOpen}
                onClose={() => setDisableModalOpen(false)}
                title="Disable Employee Access"
            >
                <div>
                    <h1>Are you sure you want to disable this employees' access?</h1>
                    <div className="flex items-center justify-center mt-2">
                        <Button
                            text="Disable"
                            onClick={() => {
                                handleUpdate(selectedEmpoyee, userStatusTypes.Deactivated);
                            }}
                            isLoading={isLoadingUpdate}
                        />
                        <Button
                            text="Cancel"
                            style="secondary"
                            onClick={() => {
                                setDisableModalOpen(false);
                            }}
                        />
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Remove Employee Access"
            >
                <div>
                    <h1>Are you sure you want to remove this employees' access?</h1>
                    <div className="flex items-center justify-center mt-2">
                        <Button
                            text="Remove"
                            onClick={() => {
                                handleUpdate(selectedEmpoyee, userStatusTypes.Deleted);
                            }}
                            isLoading={isLoadingUpdate}
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
