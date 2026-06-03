"use client";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function CompanyRegisterForm({ handleNextStep }: { handleNextStep: () => void }) {
    const [isPasswordVisible, setIsPasswordVisible] = useState({
        password: false,
        confirmPassword: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleNextStep();
    };

    return (
        <form className="w-full p-6" onSubmit={handleSubmit}>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2.5 text-sm text-gray-400">
                    Company Name
                </label>
                <input
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-200 text-sm border border-gray-600 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="Type here..."
                />
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="phone" className="block mb-2.5 text-sm text-gray-400">
                        Phone number
                    </label>
                    <input
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-200 text-sm border border-gray-600 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Type here..."
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2.5 text-sm text-gray-400">
                        Email address
                    </label>
                    <input
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-200 text-sm border border-gray-600 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Type here..."
                    />
                </div>
            </div>
            <div className="mb-6">
                <label htmlFor="website" className="block mb-2.5 text-sm text-gray-400">
                    Website URL
                </label>
                <input
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-200 text-sm border border-gray-600 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="Type here..."
                />
            </div>
            <div className="flex items-center justify-center">
                <button
                    type="submit"
                    className="px-4 py-2 mx-2 bg-blue-500 text-sm text-white rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
                >
                    Continue
                </button>
                <button
                    type="button"
                    className="rounded-md bg-transparent px-4 py-2 text-sm font-semibold text-gray-300 border border-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150"
                >
                    Skip
                </button>
            </div>
        </form>
    );
}
