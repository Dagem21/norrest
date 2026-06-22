import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import useApiFetch from "@/hooks/useAPIFetch";
import { ToastContext } from "@/providers/toastProvider";
import branchSchema from "@/yup/company/branch";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function BranchForm({ onFinish }: { onFinish: () => void }) {
    const params = useParams<{ cid: string }>();
    const toaster = useContext(ToastContext);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(branchSchema),
        mode: "onChange",
        defaultValues: {
            companyID: params?.cid,
        },
    });

    const { data, fetchData, isLoading, errors: errorsRegister } = useApiFetch(
        {
            url: `/api/at/company/branch/add`,
            method: "POST",
        },
        false,
    );

    useEffect(() => {
        if (!isLoading && data) {
            const toast = {
                message: "Branch added.",
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
        fetchData({ data: { branch: { ...data, companyID: data?.companyID } } })
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

            <Button
                type="submit"
                text={`${isLoading ? "Adding Branch" : "Add Branch"}`}
                disabled={isLoading}
            />
        </form>
    );
}
