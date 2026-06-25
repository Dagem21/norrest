"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import useApiFetch from "@/hooks/useAPIFetch";
import { useAppStore } from "@/hooks/useAppStore";
import { faAt, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Register() {
    const router = useRouter();
    const { login } = useAppStore();

    const [credentials, setCredentials] = useState({
        identifier: "",
        password: "",
    });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { data, fetchData, isLoading, errors } = useApiFetch(
        {
            url: "/api/iam/login",
            method: "POST",
        },
        false,
    );

    useEffect(() => {
        if (!isLoading) {
            if (data) {
                login(data?.user);
                router.replace("/dashboard");
            }
        }
    }, [data, isLoading, errors]);

    const handleSubmit = (e: any) => {
        e?.preventDefault();
        fetchData({ data: credentials });
    };

    return (
        <div className="flex flex-col flex-1 items-center min-h-screen">
            <div className="w-full min-h-screen flex flex-col items-center justify-center p-2 bg-taupe-100 dark:bg-taupe-900">
                <div className="w-full max-w-md bg-taupe-200 dark:bg-taupe-600/60 shadow rounded-lg px-4 py-8">
                    <h1 className="text-lg font-bold text-center">Sign In</h1>
                    <h1 className="text-xs font-medium text-center">
                        Login to explore more services
                    </h1>
                    <hr className="m-3 border-taupe-500 dark:border-taupe-400" />
                    <form className="max-w-sm flex flex-col gap-4 m-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-xs">
                                Email / Phone Number
                            </label>
                            <Input
                                placeholder="Type here..."
                                start={<FontAwesomeIcon icon={faAt} />}
                                value={credentials?.identifier}
                                onChange={(e) =>
                                    setCredentials((prev) => ({
                                        ...prev,
                                        identifier: e.target.value,
                                    }))
                                }
                                autoFocus
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-xs">
                                Password
                            </label>
                            <Input
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder="Type here..."
                                start="***"
                                end={
                                    <FontAwesomeIcon
                                        icon={isPasswordVisible ? faEyeSlash : faEye}
                                        className="cursor-pointer"
                                        onClick={() => setIsPasswordVisible((prev) => !prev)}
                                    />
                                }
                                value={credentials?.password}
                                onChange={(e) =>
                                    setCredentials((prev) => ({
                                        ...prev,
                                        password: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>

                        {errors?.details && (
                            <div>
                                <h1 className="text-red-400 text-sm">
                                    {errors?.details?.response?.data?.error}
                                </h1>
                            </div>
                        )}

                        <div className="flex flex-col items-strech w-full">
                            <Button text="Login" type="submit" />
                            <h1 className="text-center text-xs">
                                Don't have an account?{" "}
                                <Link href={`/register`} className="text-sm cusrsor-pointer">
                                    Register
                                </Link>
                            </h1>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
