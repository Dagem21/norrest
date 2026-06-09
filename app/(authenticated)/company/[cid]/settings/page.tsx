"use client";

import BranchForm from "@/components/forms/company/companyBranch";
import Modal from "@/components/ui/modal";
import Button from "@/components/ui/button";
import { MenuContext } from "@/providers/menu";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";

export default function Setting() {
    const [isModalOpen, setModalOpen] = useState(false);
    const menuContext = useContext(MenuContext);

    useEffect(() => {
        menuContext?.setTitle("Setting");
    });

    const [editGeneralInfoMode, setEditGeneralInfoMode] = useState(false);
    const [editBranchesMode, setEditBranchesMode] = useState(false);

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
                        <div className="flex flex-wrap justify-between gap-4 mt-4">
                            <div className="w-full md:w-1/2 lg:w-1/4">
                                <label className="block text-sm font-medium text-taupe-600 dark:text-taupe-300 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className={`w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-taupe-500 ${editGeneralInfoMode ? "border border-taupe-500" : "cursor-not-allowed shadow-lg"}`}
                                    value="Company Name"
                                    disabled={!editGeneralInfoMode}
                                />
                            </div>

                            <div className="w-full md:w-1/2 lg:w-1/4">
                                <label className="block text-sm font-medium text-taupe-600 dark:text-taupe-300 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="phone"
                                    className={`w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-taupe-500 ${editGeneralInfoMode ? "border border-taupe-500" : "cursor-not-allowed shadow-lg"}`}
                                    value="0987654321"
                                    disabled={!editGeneralInfoMode}
                                />
                            </div>

                            <div className="w-full md:w-1/2 lg:w-1/4">
                                <label className="block text-sm font-medium text-taupe-600 dark:text-taupe-300 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className={`w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-taupe-500 ${editGeneralInfoMode ? "border border-taupe-500" : "cursor-not-allowed shadow-lg"}`}
                                    value="company@example.com"
                                    disabled={!editGeneralInfoMode}
                                />
                            </div>

                            <div className="w-full md:w-1/2 lg:w-1/4">
                                <label className="block text-sm font-medium text-taupe-600 dark:text-taupe-300 mb-1">
                                    Website URL
                                </label>
                                <input
                                    type="url"
                                    className={`w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-taupe-500 ${editGeneralInfoMode ? "border border-taupe-500" : "cursor-not-allowed shadow-lg"}`}
                                    value="https://www.company.com"
                                    disabled={!editGeneralInfoMode}
                                />
                            </div>
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
                                <Button
                                    type="button"
                                    onClick={() => setEditBranchesMode(!editBranchesMode)}
                                    icon={<FontAwesomeIcon icon={faPen} />}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-wrap justify-between items-end gap-4 mt-4">
                                <div className="">
                                    <h1 className="block text-sm font-medium text-taupe-600 dark:text-taupe-300 mb-1 py-2">
                                        # 1
                                    </h1>
                                </div>
                                <div className="w-full md:w-1/2 lg:w-1/5">
                                    <label className="block text-sm font-medium text-taupe-600 dark:text-taupe-300 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className={`w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-taupe-500 ${editBranchesMode ? "border border-taupe-500" : "cursor-not-allowed shadow-lg"}`}
                                        value="Company Name"
                                        disabled={!editBranchesMode}
                                    />
                                </div>
                                <div className="w-full md:w-1/2 lg:w-1/5">
                                    <label className="block text-sm font-medium text-taupe-600 dark:text-taupe-300 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="phone"
                                        className={`w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-taupe-500 ${editBranchesMode ? "border border-taupe-500" : "cursor-not-allowed shadow-lg"}`}
                                        value="0987654321"
                                        disabled={!editBranchesMode}
                                    />
                                </div>
                                <div className="w-full md:w-1/2 lg:w-1/5">
                                    <label className="block text-sm font-medium text-taupe-600 dark:text-taupe-300 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        className={`w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-taupe-500 ${editBranchesMode ? "border border-taupe-500" : "cursor-not-allowed shadow-lg"}`}
                                        value="company@example.com"
                                        disabled={!editBranchesMode}
                                    />
                                </div>
                                <div className="w-full md:w-1/2 lg:w-1/5">
                                    <label className="block text-sm font-medium text-taupe-600 dark:text-taupe-300 mb-1">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        className={`w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-taupe-500 ${editBranchesMode ? "border border-taupe-500" : "cursor-not-allowed shadow-lg"}`}
                                        value="123 Company Street, City, Country"
                                        disabled={!editBranchesMode}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-between items-end gap-4 mt-4">
                                <div className="">
                                    <h1 className="block text-sm font-medium text-taupe-600 dark:text-taupe-300 mb-1 py-2">
                                        # 2
                                    </h1>
                                </div>
                                <div className="w-full md:w-1/2 lg:w-1/5">
                                    <label className="block text-sm font-medium text-taupe-600 dark:text-taupe-300 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className={`w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-taupe-500 ${editBranchesMode ? "border border-taupe-500" : "cursor-not-allowed shadow-lg"}`}
                                        value="Company Name"
                                        disabled={!editBranchesMode}
                                    />
                                </div>
                                <div className="w-full md:w-1/2 lg:w-1/5">
                                    <label className="block text-sm font-medium text-taupe-600 dark:text-taupe-300 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="phone"
                                        className={`w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-taupe-500 ${editBranchesMode ? "border border-taupe-500" : "cursor-not-allowed shadow-lg"}`}
                                        value="0987654321"
                                        disabled={!editBranchesMode}
                                    />
                                </div>
                                <div className="w-full md:w-1/2 lg:w-1/5">
                                    <label className="block text-sm font-medium text-taupe-600 dark:text-taupe-300 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        className={`w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-taupe-500 ${editBranchesMode ? "border border-taupe-500" : "cursor-not-allowed shadow-lg"}`}
                                        value="company@example.com"
                                        disabled={!editBranchesMode}
                                    />
                                </div>
                                <div className="w-full md:w-1/2 lg:w-1/5">
                                    <label className="block text-sm font-medium text-taupe-600 dark:text-taupe-300 mb-1">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        className={`w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-taupe-500 ${editBranchesMode ? "border border-taupe-500" : "cursor-not-allowed shadow-lg"}`}
                                        value="123 Company Street, City, Country"
                                        disabled={!editBranchesMode}
                                    />
                                </div>
                            </div>
                            {editBranchesMode && (
                                <div className="flex justify-center mt-4">
                                    <Button text="Update" type="button" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Add Branch">
                <BranchForm />
            </Modal>
        </div>
    );
}
