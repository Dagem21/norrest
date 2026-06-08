"use client";

import EmployeeForm from "@/components/forms/user/addEmployee";
import Modal from "@/components/modal";
import PageNavigator from "@/components/pageNavigator";
import { formatDate } from "@/utils/formatDate";
import { faBan, faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Company() {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div className="flex flex-col flex-1 items-center font-sans">
            <div className="flex flex-col w-full h-screen">
                <div className="w-full py-4 px-2 bg-taupe-200 dark:bg-taupe-600 rounded-lg overflow-x-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-lg font-bold text-taupe-600 dark:text-taupe-300">
                            Employees Directory
                        </h1>
                        <button
                            className="flex items-center gap-1 bg-taupe-400 dark:bg-taupe-800 px-3 py-2 hover:bg-taupe-700 text-white font-bold rounded"
                            onClick={() => setModalOpen(true)}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
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
                                <tr className="bg-neutral-primary">
                                    <td className="ps-2 pe-6 py-4">1</td>
                                    <th
                                        scope="row"
                                        className="ps-2 pe-6 py-4 font-medium text-heading whitespace-nowrap"
                                    >
                                        John Doe
                                    </th>
                                    <td className="ps-2 pe-6 py-4 text-nowrap">
                                        john.doe@example.com
                                    </td>
                                    <td className="ps-2 pe-6 py-4 text-nowrap">
                                        Software Engineer
                                    </td>
                                    <td className="ps-2 pe-6 py-4 text-nowrap">Main Branch</td>
                                    <td className="ps-2 pe-6 py-4 text-nowrap">
                                        {formatDate("2023-10-01 10:00:00")}
                                    </td>
                                    <td className="ps-2 pe-6 py-3 flex gap-1 ">
                                        <button
                                            className="bg-blue-950 p-1 hover:bg-blue-700 text-white font-bold rounded"
                                            title="Edit"
                                        >
                                            <FontAwesomeIcon icon={faPen} />
                                        </button>
                                        <button
                                            className="bg-yellow-900 p-1 hover:bg-yellow-700 text-white font-bold rounded"
                                            title="Disable"
                                        >
                                            <FontAwesomeIcon icon={faBan} />
                                        </button>
                                        <button
                                            className="bg-red-950 p-1 hover:bg-red-700 text-white font-bold rounded"
                                            title="Remove"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                                <tr className="bg-neutral-primary">
                                    <td className="ps-2 pe-6 py-4">2</td>
                                    <th
                                        scope="row"
                                        className="ps-2 pe-6 py-4 font-medium text-heading whitespace-nowrap"
                                    >
                                        Jane Smith
                                    </th>
                                    <td className="ps-2 pe-6 py-4 text-nowrap">
                                        jane.smith@example.com
                                    </td>
                                    <td className="ps-2 pe-6 py-4 text-nowrap">Product Manager</td>
                                    <td className="ps-2 pe-6 py-4 text-nowrap">Main Branch</td>
                                    <td className="ps-2 pe-6 py-4 text-nowrap">
                                        {formatDate("2023-10-01 11:00:00")}
                                    </td>
                                    <td className="ps-2 pe-6 py-3 flex gap-1 ">
                                        <button
                                            className="bg-blue-950 p-1 hover:bg-blue-700 text-white font-bold rounded"
                                            title="Edit"
                                        >
                                            <FontAwesomeIcon icon={faPen} />
                                        </button>
                                        <button
                                            className="bg-yellow-900 p-1 hover:bg-yellow-700 text-white font-bold rounded"
                                            title="Disable"
                                        >
                                            <FontAwesomeIcon icon={faBan} />
                                        </button>
                                        <button
                                            className="bg-red-950 p-1 hover:bg-red-700 text-white font-bold rounded"
                                            title="Remove"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
                <EmployeeForm />
            </Modal>
        </div>
    );
}
