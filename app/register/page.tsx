"use client";
import UserRegisterForm from "@/components/forms/user/userRegister";

export default function Register() {
    return (
        <div className="min-h-screen flex flex-col flex-1 items-center justify-center">
            <div className="flex flex-col items-center justify-center w-full px-2">
                <div className="w-full sm:w-full md:w-2/3 lg:w-3/5 xl:w-2/5 bg-taupe-300 dark:bg-taupe-600 shadow rounded-lg p-2">
                    <h1 className="text-center font-bold m-2">Register</h1>
                    <hr className="mb-2 mx-6" />
                    <UserRegisterForm />
                </div>
            </div>
        </div>
    );
}
