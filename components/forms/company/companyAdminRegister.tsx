"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function CompanyAdminRegisterForm({
    handleNextStep,
}: {
    handleNextStep: () => void;
}) {
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
            <div className="grid gap-6 mb-6 md:grid-cols-3">
                <div>
                    <label htmlFor="email" className="block mb-2.5 text-sm">
                        First Name
                    </label>
                    <Input placeholder="Type here..." end="" start="" />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2.5 text-sm">
                        Father Name
                    </label>
                    <input
                        className="w-full bg-transparent text-sm border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Type here..."
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2.5 text-sm">
                        Last Name
                    </label>
                    <input
                        className="w-full bg-transparent text-sm border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Type here..."
                    />
                </div>
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="email" className="block mb-2.5 text-sm">
                        Email
                    </label>
                    <input
                        className="w-full bg-transparent text-sm border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Type here..."
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block mb-2.5 text-sm">
                        Phone number
                    </label>
                    <input
                        className="w-full bg-transparent text-sm border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Type here..."
                    />
                </div>
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="password" className="block mb-2.5 text-sm">
                        Password
                    </label>
                    <div className="flex w-full bg-transparent text-sm border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow">
                        <input
                            className="w-full bg-transparent text-sm border-0 rounded-md focus:outline-none"
                            placeholder="Type here..."
                            type={isPasswordVisible.password ? "text" : "password"}
                        />
                        <div className="ms-2">
                            <FontAwesomeIcon
                                icon={isPasswordVisible.password ? faEyeSlash : faEye}
                                className="cursor-pointer"
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
                <div>
                    <label
                        htmlFor="confirm_password"
                        className="block mb-2.5 text-sm"
                    >
                        Confirm password
                    </label>
                    <div className="flex w-full bg-transparent text-sm border border-gray-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow">
                        <input
                            className="w-full bg-transparent text-sm border-0 rounded-md focus:outline-none"
                            placeholder="Type here..."
                            type={isPasswordVisible.confirmPassword ? "text" : "password"}
                        />
                        <div className="ms-2">
                            <FontAwesomeIcon
                                icon={isPasswordVisible.confirmPassword ? faEyeSlash : faEye}
                                className="cursor-pointer"
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
            </div>
            <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                    <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 border border-gray-400 rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                        required
                    />
                </div>
                <label htmlFor="remember" className="ms-2 text-sm font-medium">
                    I agree with the{" "}
                    <a href="#" className="text-fg-brand hover:underline">
                        terms and conditions
                    </a>
                    .
                </label>
            </div>
            <div className="flex items-center justify-center">
                <Button
                    text="Continue"
                    type="submit" />
            </div>
        </form>
    );
}
