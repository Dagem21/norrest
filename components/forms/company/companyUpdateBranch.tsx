import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import useApiFetch from "@/hooks/useAPIFetch";
import { ToastContext } from "@/providers/toastProvider";
import branchUpdateSchema from "@/yup/company/branchUpdate";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function UpdateBranchForm({
    branch,
    onFinish,
}: {
    branch: any;
    onFinish: () => void;
}) {
    const toaster = useContext(ToastContext);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(branchUpdateSchema),
        mode: "onChange",
        defaultValues: {
            _id: branch?._id,
            name: branch?.name,
            phoneNumber: branch?.phoneNumber?.slice(-9),
            email: branch?.email,
            address: branch?.address,
        },
    });

    const {
        data,
        fetchData,
        isLoading,
        errors: errorsRegister,
    } = useApiFetch(
        {
            url: `/api/at/company/branch?branchID=${branch?._id}`,
            method: "PUT",
        },
        false,
    );

    useEffect(() => {
        if (!isLoading && data) {
            const toast = {
                message: "Branch updated.",
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

    const handleRegister = (data: any) => {
        fetchData({ data: { branch: { ...data, companyID: data?.companyID } } });
    };

    return (
        <form
            onSubmit={handleSubmit(handleRegister)}
            className="max-w-md mx-auto flex flex-col gap-4"
        >
            <div>
                <label htmlFor="name" className="block mb-2 text-xs">
                    Name
                </label>
                <Input placeholder="Type here..." {...register("name")} error={errors?.name} />
            </div>

            <div>
                <label htmlFor="phone" className="block mb-2 text-xs">
                    Phone Number
                </label>
                <Input
                    type="tel"
                    placeholder="Type here..."
                    start="+251"
                    {...register("phoneNumber")}
                    error={errors?.phoneNumber}
                />
            </div>

            <div>
                <label htmlFor="email" className="block mb-2 text-xs">
                    Email
                </label>
                <Input
                    type="email"
                    placeholder="Type here..."
                    start={<FontAwesomeIcon icon={faAt} />}
                    {...register("email")}
                    error={errors?.email}
                />
            </div>

            <div>
                <label htmlFor="email" className="block mb-2 text-xs">
                    Address
                </label>
                <Input
                    placeholder="Type here..."
                    {...register("address")}
                    error={errors?.address}
                />
            </div>

            <Button type="submit" text="Update Branch" isLoading={isLoading} disabled={isLoading} />
        </form>
    );
}
