"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import useApiFetch from "@/hooks/useAPIFetch";
import { ToastContext } from "@/providers/toastProvider";
import companySchema from "@/yup/company/company";
import companyUpdateSchema from "@/yup/company/companyUpdate";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function UpdateCompanyForm({
    company,
    onFinish,
}: {
    company: any;
    onFinish: () => void;
}) {
    const toaster = useContext(ToastContext);
    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(companyUpdateSchema),
        mode: "onChange",
        defaultValues: {
            _id: company?._id,
            phoneNumber: company?.phoneNumber?.slice(-9),
            email: company?.email,
            name: company?.name,
            website: company?.website,
            description: company?.description,
        },
    });

    const {
        data,
        fetchData,
        isLoading,
        errors: errorsRegister,
    } = useApiFetch(
        {
            url: `/api/at/company?companyID=${company?._id}`,
            method: "PUT",
        },
        false,
    );

    useEffect(() => {
        if (!isLoading && data) {
            const toast = {
                message: "Company updated.",
                type: "success",
            };
            toaster?.addToast(toast);
            onFinish();
        } else if (!isLoading && errorsRegister?.details) {
            const toast = {
                message: errorsRegister?.details?.response?.data?.error,
                type: "error",
            };
            toaster?.addToast(toast);
        }
    }, [data, isLoading, errorsRegister]);

    const companyPicture = watch("picture");

    const handleRegister = (data: any) => {
        const formData = new FormData();
        formData.append("name", data?.name);
        formData.append("email", data?.email);
        formData.append("phoneNumber", data?.phoneNumber);
        formData.append("website", data?.website);
        formData.append("description", data?.description);
        if (data?.picture?.[0]) {
            formData.append("picture", data?.picture?.[0]);
        }

        fetchData({ data: formData });
    };

    return (
        <form className="w-full p-6" onSubmit={handleSubmit(handleRegister)}>
            <div className="mb-4">
                <label htmlFor="email" className="block mb-2.5 text-xs">
                    Company Name
                </label>
                <Input placeholder="Type here..." {...register("name")} error={errors?.name} />
            </div>
            <div className="grid gap-4 mb-4 md:grid-cols-2">
                <div>
                    <label htmlFor="phone" className="block mb-2.5 text-xs">
                        Phone number
                    </label>
                    <Input
                        placeholder="Type here..."
                        start="+251"
                        {...register("phoneNumber")}
                        error={errors?.phoneNumber}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2.5 text-xs">
                        Email address
                    </label>
                    <Input
                        placeholder="Type here..."
                        start={<FontAwesomeIcon icon={faAt} />}
                        {...register("email")}
                        error={errors?.email}
                    />
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="website" className="block mb-2.5 text-xs">
                    Website URL
                </label>
                <Input
                    placeholder="Type here..."
                    {...register("website")}
                    error={errors?.website}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="website" className="block mb-2.5 text-xs">
                    Description
                </label>
                <textarea
                    className="w-full p-2 outline-none rounded-md accent-taupe-900 border border-gray-400 rounded-md transition duration-300 ease shadow-sm 
                        hover:border-slate-300 focus-within:border-slate-400 focus-within:shadow"
                    {...register("description")}
                    rows={4}
                />
            </div>
            <div className="grid gap-4 mb-4 md:grid-cols-2">
                <div>
                    <label htmlFor="website" className="block mb-2.5 text-xs">
                        Company Picture (Logo)
                    </label>
                    <Input
                        type="file"
                        placeholder="Type here..."
                        {...register("picture")}
                        error={errors?.picture}
                    />
                </div>
                <div>
                    {Object.values(companyPicture ?? {})?.length > 0 && (
                        <div className="flex items-center justify-center">
                            <Image
                                src={URL.createObjectURL((companyPicture as any)?.[0])}
                                alt={"Company Logo"}
                                width={50}
                                height={50}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-center">
                <Button
                    type="submit"
                    text="Update Company"
                    isLoading={isLoading}
                    disabled={isLoading}
                />
            </div>
        </form>
    );
}
