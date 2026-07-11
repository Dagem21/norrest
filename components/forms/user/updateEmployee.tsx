import {
    employeeStatusTypes,
    permissionDisplayNames,
    permissionTypes,
    roleTypes,
} from "@/assets/enums/enum";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import useApiFetch from "@/hooks/useAPIFetch";
import { ToastContext } from "@/providers/toastProvider";
import updateEmployeeSchema from "@/yup/userRegistration/companyEmployeeUpdate";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function UpdateEmployeeForm({
    permission,
    onFinish,
}: {
    permission?: any;
    onFinish: () => void;
}) {
    const params = useParams<{ cid: string; bid: string }>();
    const toaster = useContext(ToastContext);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(updateEmployeeSchema),
        mode: "onChange",
        defaultValues: {
            _id: permission?._id,
            branchID: permission?.branchID,
            permissions: permission?.permissions,
            role: permission?.role,
        },
    });

    const {
        data,
        fetchData,
        isLoading,
        errors: errorsUpdate,
    } = useApiFetch(
        {
            url: `/api/at/company/employee?branchID=${params.bid}`,
            method: "PUT",
        },
        false,
    );

    useEffect(() => {
        if (!isLoading && data) {
            const toast = {
                message: "Permission updated.",
                type: "success",
            };
            toaster?.addToast(toast);
            onFinish();
        } else if (!isLoading && errorsUpdate?.details) {
            const toast = {
                message: errorsUpdate?.details?.response?.data?.error,
                type: "error",
            };
            toaster?.addToast(toast);
        }
    }, [data, isLoading, errorsUpdate]);

    const handleRegister = (data: any) => {
        fetchData({ data: { employee: data } });
    };

    return (
        <form
            onSubmit={handleSubmit(handleRegister)}
            className="max-w-md mx-auto flex flex-col gap-4"
        >
            <div>
                <label htmlFor="fatherName" className="block mb-2 text-xs">
                    Name
                </label>
                <div
                    className={`w-70 flex items-center text-sm rounded-md transition duration-300 ease shadow-sm 
                                        hover:border-slate-300 focus-within:border-slate-400 focus-within:shadow`}
                >
                    <div className={`w-full p-2 outline-none rounded-md accent-taupe-900`}>
                        {permission?.user?.firstName || "N/A"}
                    </div>
                </div>
            </div>
            <div>
                <label htmlFor="role" className="block mb-2 text-xs">
                    Role
                </label>
                <Select
                    options={Object.values(roleTypes).map((role) => {
                        return { text: role };
                    })}
                    {...register("role")}
                    error={errors?.role}
                />
            </div>

            <fieldset className="border border-gray-400 p-3 rounded-lg">
                <legend className="text-xs">Permissions</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Object.values(permissionTypes).map((permission, i) => (
                        <div className="flex items-start" key={i}>
                            <div className="flex items-center h-5">
                                <Input
                                    id={permission}
                                    type="checkbox"
                                    value={permission}
                                    {...register("permissions")}
                                />
                            </div>
                            <label
                                htmlFor="remember"
                                className="ms-2 text-sm text-taupe-800 dark:text-taupe-300"
                            >
                                {permissionDisplayNames[permission]}
                            </label>
                        </div>
                    ))}
                </div>
            </fieldset>

            <Button
                type="submit"
                text="Update Permission"
                disabled={isLoading}
                isLoading={isLoading}
            />
        </form>
    );
}
