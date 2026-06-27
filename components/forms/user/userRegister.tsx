"use client";
import adminUserSchema from "@/yup/userRegistration/userRegisteration";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { faAt, faCheckCircle, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import useApiFetch from "@/hooks/useAPIFetch";
import { useRouter } from "next/navigation";
import { ToastContext } from "@/providers/toastProvider";

export default function UserRegisterForm() {
    const toaster = useContext(ToastContext);
    const router = useRouter();
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm({
        resolver: yupResolver(adminUserSchema),
        mode: "onChange",
    });

    const {
        data,
        fetchData,
        isLoading,
        errors: errorsRegiter,
    } = useApiFetch(
        {
            url: "/api/iam/register",
            method: "POST",
        },
        false,
    );

    useEffect(() => {
        if (!isLoading) {
            if (data) {
                const toast = {
                    message: "Registration successful.",
                    type: "success",
                };
                toaster?.addToast(toast);
                router.replace("/signin");
            } else if (errorsRegiter?.details) {
                console.log(errorsRegiter);
                const toast = {
                    message: errorsRegiter?.details?.response?.data?.error,
                    type: "error",
                };
                toaster?.addToast(toast);
            }
        }
    }, [data, isLoading, errorsRegiter]);

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    const [isPasswordVisible, setIsPasswordVisible] = useState({
        password: false,
        confirmPassword: false,
    });

    const handleRegister = (data: any) => {
        fetchData({ data: { user: data } });
    };
    return (
        <form className="w-full p-6" onSubmit={handleSubmit(handleRegister)}>
            <div className="grid gap-4 mb-4 md:grid-cols-3">
                <div>
                    <label htmlFor="firstName" className="block mb-2 text-xs">
                        First Name
                    </label>
                    <Input
                        placeholder="Type here..."
                        {...register("firstName")}
                        error={errors?.firstName}
                    />
                </div>
                <div>
                    <label htmlFor="fatherName" className="block mb-2 text-xs">
                        Father Name
                    </label>
                    <Input
                        placeholder="Type here..."
                        {...register("fatherName")}
                        error={errors?.fatherName}
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block mb-2 text-xs">
                        Last Name
                    </label>
                    <Input
                        placeholder="Type here..."
                        {...register("lastName")}
                        error={errors?.lastName}
                    />
                </div>
            </div>
            <div className="grid gap-4 mb-4 md:grid-cols-2">
                <div>
                    <label htmlFor="email" className="block mb-2 text-xs">
                        Email
                    </label>
                    <Input
                        placeholder="Type here..."
                        start={<FontAwesomeIcon icon={faAt} />}
                        {...register("email")}
                        error={errors?.email}
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block mb-2 text-xs">
                        Phone number
                    </label>
                    <Input
                        placeholder="Type here..."
                        start="+251"
                        {...register("phoneNumber")}
                        error={errors?.phoneNumber}
                    />
                </div>
            </div>
            <div className="grid gap-4 mb-4 md:grid-cols-2">
                <div>
                    <label htmlFor="password" className="block mb-2 text-xs">
                        Password
                    </label>
                    <Input
                        type={isPasswordVisible.password ? "text" : "password"}
                        placeholder="Type here..."
                        start="***"
                        end={
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
                        }
                        {...register("password")}
                        error={errors?.password}
                    />
                </div>
                <div>
                    <label htmlFor="confirm_password" className="block mb-2 text-xs">
                        Confirm password
                    </label>
                    <Input
                        type={isPasswordVisible.confirmPassword ? "text" : "password"}
                        placeholder="Type here..."
                        start={
                            password && password === confirmPassword ? (
                                <FontAwesomeIcon icon={faCheckCircle} color="green" />
                            ) : (
                                "***"
                            )
                        }
                        end={
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
                        }
                        {...register("confirmPassword")}
                        error={errors?.confirmPassword}
                    />
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
                <label htmlFor="remember" className="ms-2 text-xs font-medium">
                    I agree with the{" "}
                    <a href="#" className="text-fg-brand hover:underline">
                        terms and conditions
                    </a>
                    .
                </label>
            </div>
            <div className="flex items-center justify-center">
                <Button text="Continue" type="submit" />
            </div>
            <h1 className="text-center mt-2 text-xs">
                Already registered?{" "}
                <Link className="text-sm" href="/signin">
                    Sign In
                </Link>
            </h1>
        </form>
    );
}
