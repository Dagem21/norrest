"use client";
import CompanyRegisterForm from "@/components/forms/companyRegister";
import CompanyUserForm from "@/components/forms/CompanyUserForm";

export default function Register() {
    return (
        <div className="flex flex-col flex-1 items-center font-sans">
            <div className="flex flex-col items-center justify-center w-full min-h-screen bg-cover bg-center bg-white dark:bg-gray-800 rounded-lg p-6">
                <div className="w-full sm:w-full md:w-1/2 lg:w-1/3 ">
                    {/* <CompanyRegisterForm /> */}
                    <CompanyUserForm />
                </div>
            </div>
        </div>
    );
}
