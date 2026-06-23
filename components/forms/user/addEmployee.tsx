import { permissionTypes, roleTypes } from "@/assets/enums/enum";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import useApiFetch from "@/hooks/useAPIFetch";
import { ToastContext } from "@/providers/toastProvider";
import employeeSchema from "@/yup/userRegistration/companyEmployee";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        watch,
    } = useForm({
        resolver: yupResolver(employeeSchema),
        mode: "onChange",
        defaultValues: {
            companyID: params.cid,
            branchID: params.bid,
        },
    });

    const {
        data,
        fetchData,
        isLoading,
        errors: errorsRegister,
    } = useApiFetch(
        {
            url: `/api/at/company/employee/add`,
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

    const phoneNumber = watch("phoneNumber");
    const email = watch("email");

    const handleRegister = (data: any) => {
        fetchData({ data: { employee: data } });
    };

    return (
        <form
            onSubmit={handleSubmit(handleRegister)}
            className="max-w-md mx-auto flex flex-col gap-4"
        >
            <div className="flex flex-col">
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
                        disabled={email ? true : false}
                    />
                </div>

                <h1 className="text-center text-sm">--- OR ---</h1>

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
                        disabled={phoneNumber ? true : false}
                    />
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
                <div className="grid grid-cols-3 gap-2">
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
                                {permission}
                            </label>
                        </div>
                    ))}
                </div>
            </fieldset>

            <Button
                type="submit"
                text={`${isLoading ? "Adding Employee" : "Add Employee"}`}
                disabled={isLoading}
            />
        </form>
    );
}
