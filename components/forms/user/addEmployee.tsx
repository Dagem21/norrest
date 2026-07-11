import { permissionDisplayNames, permissionTypes, roleTypes } from "@/assets/enums/enum";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import useApiFetch from "@/hooks/useAPIFetch";
import { ToastContext } from "@/providers/toastProvider";
import employeeSchema from "@/yup/userRegistration/companyEmployee";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EmployeeForm({ onFinish }: { onFinish: () => void }) {
    const params = useParams<{ cid: string; bid: string }>();
    const toaster = useContext(ToastContext);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(employeeSchema),
        mode: "onChange",
        defaultValues: {
            companyID: params.cid,
            branchID: params.bid,
            permissions: [
                permissionTypes.OrderRead,
                permissionTypes.OrderUpdate,
                permissionTypes.OrderDelete,
                permissionTypes.MenuRead,
            ],
        },
    });

    const {
        data,
        fetchData,
        isLoading,
        errors: errorsRegister,
    } = useApiFetch(
        {
            url: `/api/at/company/employee`,
            method: "POST",
        },
        false,
    );

    useEffect(() => {
        if (!isLoading && data) {
            const toast = {
                message: "Employee registered.",
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
        fetchData({ data: { employee: data } });
    };

    return (
        <form
            onSubmit={handleSubmit(handleRegister)}
            className="max-w-md mx-auto flex flex-col gap-4"
        >
            <div>
                <label htmlFor="phone" className="block mb-2 text-xs">
                    Phone Number
                </label>
                <Input
                    type="tel"
                    placeholder="912345678 / example@gmail.com"
                    start="+251/@"
                    {...register("emailOrPhone")}
                    error={errors?.emailOrPhone}
                />
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
                                    disabled={[
                                        permissionTypes.MenuRead,
                                        permissionTypes.OrderRead,
                                    ].includes(permission)}
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

            <Button type="submit" text="Add Employee" disabled={isLoading} isLoading={isLoading} />
        </form>
    );
}
