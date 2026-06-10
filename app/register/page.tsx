"use client";
import CompanyAdminRegisterForm from "@/components/forms/company/companyAdminRegister";
import CompanyRegisterForm from "@/components/forms/company/companyRegister";
import CompanyUserForm from "@/components/forms/company/CompanyUserForm";
import { useState } from "react";

export default function Register() {
    const [step, setStep] = useState(1);

    const handleNextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    return (
        <div className="flex flex-col flex-1 items-center">
            <div className="flex flex-col items-center justify-center w-full p-2 bg-taupe-100 dark:bg-taupe-900">
                <div className="w-full sm:w-full md:w-2/3 lg:w-3/5 xl:w-2/5 bg-taupe-200 dark:bg-taupe-600 shadow rounded-lg p-2">
                    <div className="w-full px-6 py-2">
                        <h2 className="text-2xl font-bold text-center mb-6">
                            {step === 1 && "Start your Journey"}
                            {step === 2 && "Almost there!"}
                            {step === 3 && "Last step"}
                        </h2>
                        <div className="mb-6">
                            <ol className="flex items-center justify-center w-full text-sm font-bold text-center text-body sm:text-base">
                                <li
                                    className={`flex md:w-full ${step > 1 && "text-taupe-900"} items-center text-fg-brand sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-default after:border-px after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}
                                >
                                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-fg-disabled">
                                        {step > 1 ? (
                                            <svg
                                                className="w-5 h-5 me-1.5"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                />
                                            </svg>
                                        ) : (
                                            <span className="me-2">1</span>
                                        )}
                                        Personal{" "}
                                        <span className="hidden sm:inline-flex sm:ms-2">Info</span>
                                    </span>
                                </li>
                                <li
                                    className={`flex md:w-full ${step > 2 && "text-taupe-900"} items-center text-fg-brand sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-default after:border-px after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}
                                >
                                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-fg-disabled">
                                        {step > 2 ? (
                                            <svg
                                                className="w-5 h-5 me-1.5"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                />
                                            </svg>
                                        ) : (
                                            <span className="me-2">2</span>
                                        )}
                                        Company{" "}
                                        <span className="hidden sm:inline-flex sm:ms-2">Info</span>
                                    </span>
                                </li>
                                <li className={`flex items-center ${step > 3 && "text-taupe-900"}`}>
                                    {step > 3 ? (
                                        <svg
                                            className="w-5 h-5 me-1.5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                            />
                                        </svg>
                                    ) : (
                                        <span className="me-2">3</span>
                                    )}
                                    Employees
                                </li>
                            </ol>
                        </div>
                    </div>
                    <hr className="mb-2 mx-6" />
                    {step === 1 && <CompanyAdminRegisterForm handleNextStep={handleNextStep} />}
                    {step === 2 && <CompanyRegisterForm handleNextStep={handleNextStep} />}
                    {step === 3 && <CompanyUserForm handleNextStep={handleNextStep} />}
                </div>
            </div>
        </div>
    );
}
