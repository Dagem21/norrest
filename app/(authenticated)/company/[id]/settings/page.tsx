"use client";

import MenuItemForm from "@/components/forms/menu/menuItem";
import Modal from "@/components/modal";
import { faGear, faPen, faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Company() {
    const [editGeneralInfoMode, setEditGeneralInfoMode] = useState(false);
    const [editBranchesMode, setEditBranchesMode] = useState(false);

    return (
        <div className="flex flex-col flex-1 items-center font-sans">

            <div className="flex flex-col w-full h-screen">
                <div className="w-full px-2 overflow-x-auto">
                    <div className="mb-2 p-4 bg-taupe-200 dark:bg-taupe-600 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-lg font-bold text-taupe-600 dark:text-taupe-400">
                                General Information
                            </h1>
                            <button
                                className="flex items-center gap-1 bg-taupe-400 dark:bg-taupe-800 px-3 py-2 hover:bg-taupe-700 text-white font-bold rounded"
                                onClick={() => setEditGeneralInfoMode(!editGeneralInfoMode)}
                            >
                                <FontAwesomeIcon icon={faPen} />
                            </button>
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
                    </div>
                    <div className="mb-2 p-4 bg-taupe-200 dark:bg-taupe-600 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-lg font-bold text-taupe-600 dark:text-taupe-400">
                                Branches
                            </h1>
                            <button
                                className="flex items-center gap-1 bg-taupe-400 dark:bg-taupe-800 px-3 py-2 hover:bg-taupe-700 text-white font-bold rounded"
                                onClick={() => setEditBranchesMode(!editBranchesMode)}
                            >
                                <FontAwesomeIcon icon={faPen} />
                            </button>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
