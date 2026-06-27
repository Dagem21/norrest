"use client";

import SignInForm from "@/components/forms/signin/signin";

export default function SignIn() {
    return (
        <div className="flex flex-col flex-1 items-center min-h-screen">
            <div className="w-full min-h-screen flex flex-col items-center justify-center p-2">
                <SignInForm />
            </div>
        </div>
    );
}
