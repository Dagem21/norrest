"use client";

import { userTypes } from "@/assets/enums/enum";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import ToggleSwitch from "@/components/ui/toggleSwitch";
import useApiFetch from "@/hooks/useAPIFetch";
import { MenuContext } from "@/providers/menu";
import { ToastContext } from "@/providers/toastProvider";
import profileUpdateSchema from "@/yup/userRegistration/updateUser";
import { faAt, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Settings() {
    const menuContext = useContext(MenuContext);
    const toaster = useContext(ToastContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isBusiness, setIsBusiness] = useState<boolean>(
        menuContext?.user?.type === userTypes.Business,
    );

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        resolver: yupResolver(profileUpdateSchema),
        mode: "onChange",
        defaultValues: {
            _id: menuContext?.user?._id,
            firstName: menuContext?.user?.firstName ?? ".",
            fatherName: menuContext?.user?.fatherName ?? "",
            lastName: menuContext?.user?.lastName ?? "",
            email: menuContext?.user?.email ?? "",
            phoneNumber: menuContext?.user?.phoneNumber ?? "",
        },
    });

    const {
        data,
        fetchData,
        isLoading,
        errors: errorsUpdate,
    } = useApiFetch(
        {
            url: "/api/at/user/update",
            method: "PUT",
        },
        false,
    );

    useEffect(() => {
        menuContext?.setTitle("Profile Setting");
    });

    useEffect(() => {
        if (!isLoading && data) {
            setModalOpen(false);
            const toast = {
                message: "Account updated. Please login again.",
                type: "success",
            };
            toaster?.addToast(toast);
        } else if (!isLoading && errorsUpdate?.details) {
            const toast = {
                message: errorsUpdate?.details?.response?.data?.error,
                type: "error",
            };
            toaster?.addToast(toast);
        }
    }, [isLoading, data, errorsUpdate]);

    const handleUserTypeChange = (e: any) => {
        setIsBusiness(e.target.checked);
    };

    const handleUpdate = (data: any) => {
        fetchData({
            data: {
                user: {
                    ...data,
                    type: isBusiness ? userTypes.Business : userTypes.Customer,
                },
            },
        });
    };

    return (
        <div className="flex flex-col flex-1 items-center min-h-screen">
            <div className="w-full flex flex items-center justify-center">
                <div className="bg-taupe-200 dark:bg-taupe-600 rounded-lg p-4">
                    <div className="grid gap-4 mb-4 md:grid-cols-3">
                        <div>
                            <label htmlFor="firstName" className="block mb-2 text-xs">
                                First Name
                            </label>
                            <div
                                className={`flex items-center text-sm rounded-md transition duration-300 ease shadow-sm 
                                        hover:border-slate-300 focus-within:border-slate-400 focus-within:shadow`}
                            >
                                <div
                                    className={`w-full p-2 outline-none rounded-md accent-taupe-900`}
                                >
                                    {menuContext?.user?.firstName || "N/A"}
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="fatherName" className="block mb-2 text-xs">
                                Father Name
                            </label>
                            <div
                                className={`flex items-center text-sm rounded-md transition duration-300 ease shadow-sm 
                                        hover:border-slate-300 focus-within:border-slate-400 focus-within:shadow`}
                            >
                                <div
                                    className={`w-full p-2 outline-none rounded-md accent-taupe-900`}
                                >
                                    {menuContext?.user?.fatherName || "N/A"}
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block mb-2 text-xs">
                                Last Name
                            </label>
                            <div
                                className={`flex items-center text-sm rounded-md transition duration-300 ease shadow-sm 
                                        hover:border-slate-300 focus-within:border-slate-400 focus-within:shadow`}
                            >
                                <div
                                    className={`w-full p-2 outline-none rounded-md accent-taupe-900`}
                                >
                                    {menuContext?.user?.lastName || "N/A"}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-4 mb-4 md:grid-cols-2">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-xs">
                                Email
                            </label>
                            <div
                                className={`flex items-center text-sm rounded-md transition duration-300 ease shadow-sm 
                                        hover:border-slate-300 focus-within:border-slate-400 focus-within:shadow`}
                            >
                                <div className="flex items-center h-full border-e border-gray-400 py-2 px-4 select-none">
                                    <FontAwesomeIcon icon={faAt} />
                                </div>
                                <div
                                    className={`w-full p-2 outline-none rounded-md accent-taupe-900`}
                                >
                                    {menuContext?.user?.email || "N/A"}
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="phone" className="block mb-2 text-xs">
                                Phone number
                            </label>
                            <div
                                className={`flex items-center text-sm rounded-md transition duration-300 ease shadow-sm 
                                        hover:border-slate-300 focus-within:border-slate-400 focus-within:shadow`}
                            >
                                <div className="flex items-center h-full border-e border-gray-400 py-2 px-4 select-none">
                                    +251
                                </div>
                                <div
                                    className={`w-full p-2 outline-none rounded-md accent-taupe-900`}
                                >
                                    {menuContext?.user?.phoneNumber?.slice(-9) || "N/A"}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Button
                            icon={<FontAwesomeIcon icon={faPen} />}
                            text=" Edit profile"
                            onClick={() => {
                                reset({
                                    ...menuContext?.user,
                                    phoneNumber: menuContext?.user?.phoneNumber?.slice(-9),
                                });
                                setModalOpen(true);
                            }}
                        />
                        <Button text="Change password" />
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Edit Profile">
                <form onSubmit={handleSubmit(handleUpdate)}>
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
                                placeholder="example@gmail.com"
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
                                placeholder="7/9********"
                                start="+251"
                                {...register("phoneNumber")}
                                error={errors?.phoneNumber}
                            />
                        </div>
                    </div>
                    <div className="grid gap-4 mb-4 md:grid-cols-1">
                        <div className="flex gap-2">
                            <ToggleSwitch value={isBusiness} onChange={handleUserTypeChange} />
                            <label className="text-sm">Enable Business access.</label>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Button type="submit" text="Update" />
                    </div>
                </form>
            </Modal>
        </div>
    );
}
