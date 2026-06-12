"use client";
import adminUserSchema from "@/yup/userRegistration/companyAdmin";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { faAt, faCheckCircle, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CompanyAdminRegisterForm({
    handleNextStep,
}: {
    handleNextStep: () => void;
}) {
    const {
        register, formState: { errors }, handleSubmit, watch
    } = useForm({
        resolver: yupResolver(adminUserSchema),
        mode: "onChange"
    });

    const password = watch('Password');
    const confirmPassword = watch('ConfirmPassword');

    const [isPasswordVisible, setIsPasswordVisible] = useState({
        password: false,
        confirmPassword: false,
    });

    const handleRegister = (data: any) => {
        console.log(data)
        handleNextStep();
    };
    return (
        <form className="w-full p-6" onSubmit={handleSubmit(handleRegister)}>
            <div className="grid gap-6 mb-6 md:grid-cols-3">
                <div>
                    <label htmlFor="email" className="block mb-2.5 text-sm">
                        First Name
                    </label>
                    <Input
                        placeholder="Type here..."
                        {...register('FirstName')}
                        error={errors?.FirstName}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2.5 text-sm">
                        Father Name
                    </label>
                    <Input
                        placeholder="Type here..."
                        {...register('FatherName')}
                        error={errors?.FatherName}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2.5 text-sm">
                        Last Name
                    </label>
                    <Input
                        placeholder="Type here..."
                        {...register('LastName')}
                        error={errors?.LastName}
                    />
                </div>
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="email" className="block mb-2.5 text-sm">
                        Email
                    </label>
                    <Input
                        placeholder="Type here..."
                        start={<FontAwesomeIcon icon={faAt} />}
                        {...register('Email')}
                        error={errors?.Email}
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block mb-2.5 text-sm">
                        Phone number
                    </label>
                    <Input
                        placeholder="Type here..."
                        start="+251"
                        {...register('PhoneNumber')}
                        error={errors?.PhoneNumber}
                    />
                </div>
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="password" className="block mb-2.5 text-sm">
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
                        {...register('Password')}
                        error={errors?.Password}
                    />
                </div>
                <div>
                    <label
                        htmlFor="confirm_password"
                        className="block mb-2.5 text-sm"
                    >
                        Confirm password
                    </label>
                    <Input
                        type={isPasswordVisible.confirmPassword ? "text" : "password"}
                        placeholder="Type here..."
                        start={(password && password === confirmPassword) ?
                            <FontAwesomeIcon
                                icon={faCheckCircle}
                                color="green"
                            /> : "***"}
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
                        {...register('ConfirmPassword')}
                        error={errors?.ConfirmPassword}
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
            <h1 className="text-center mt-2 text-xs">Already registered? <span className="text-sm">Sign In</span></h1>
        </form>
    );
}
