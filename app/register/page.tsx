"use client";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Register() {
    const [isPasswordVisible, setIsPasswordVisible] = useState({
        password: false,
        confirmPassword: false,
    });
    return (
        <div className="flex flex-col flex-1 items-center font-sans">
            <div className="flex flex-col items-center justify-center w-full min-h-screen bg-cover bg-center bg-white dark:bg-gray-800 rounded-lg">
                <form className="shadow shadow-md shadow-gray-500 p-6">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-400">
                        Register your company
                    </h2>
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
                            <label htmlFor="website" className="block mb-2.5 text-sm text-gray-400">
                                Website URL
                            </label>
                            <input
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-200 text-sm border border-gray-600 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                placeholder="Type here..."
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2.5 text-sm text-gray-400">
                            Email address
                        </label>
                        <input
                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-200 text-sm border border-gray-600 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Type here..."
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2.5 text-sm text-gray-400">
                            Password
                        </label>
                        <div className="flex w-full bg-transparent placeholder:text-slate-400 text-slate-200 text-sm border border-gray-600 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow">
                            <input
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-200 text-sm border-0 rounded-md focus:outline-none"
                                placeholder="Type here..."
                                type={isPasswordVisible.password ? "text" : "password"}
                            />
                            <div className="ms-2">
                                <FontAwesomeIcon
                                    icon={isPasswordVisible.password ? faEyeSlash : faEye}
                                    className="cursor-pointer text-gray-400"
                                    onClick={() =>
                                        setIsPasswordVisible((prev) => ({
                                            ...prev,
                                            password: !prev.password,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="confirm_password"
                            className="block mb-2.5 text-sm text-gray-400"
                        >
                            Confirm password
                        </label>
                        <div className="flex w-full bg-transparent placeholder:text-slate-400 text-slate-200 text-sm border border-gray-600 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow">
                            <input
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-200 text-sm border-0 rounded-md focus:outline-none"
                                placeholder="Type here..."
                                type={isPasswordVisible.confirmPassword ? "text" : "password"}
                            />
                            <div className="ms-2">
                                <FontAwesomeIcon
                                    icon={isPasswordVisible.confirmPassword ? faEyeSlash : faEye}
                                    className="cursor-pointer text-gray-400"
                                    onClick={() =>
                                        setIsPasswordVisible((prev) => ({
                                            ...prev,
                                            confirmPassword: !prev.confirmPassword,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input
                                id="remember"
                                type="checkbox"
                                value=""
                                className="w-4 h-4 border border-gray-600 rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                                required
                            />
                        </div>
                        <label
                            htmlFor="remember"
                            className="ms-2 text-sm font-medium text-gray-400"
                        >
                            I agree with the{" "}
                            <a href="#" className="text-fg-brand hover:underline">
                                terms and conditions
                            </a>
                            .
                        </label>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-sm text-white rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
                        >
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
