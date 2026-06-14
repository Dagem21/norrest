"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import employeeSchema from "@/yup/userRegistration/companyEmployee";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CompanyUserForm({ handleNextStep }: { handleNextStep: () => void }) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(employeeSchema),
        mode: "onChange",
    });

    const [permissionsList, setPermissionsList] = useState([
        {
            _id: "asdf1",
            name: "Manage Orders",
        },
        {
            _id: "asdf2",
            name: "Manage Menu",
        },
        {
            _id: "asdf3",
            name: "Manage Users",
        },
        {
            _id: "asdf4",
            name: "Manage Users",
        },
        {
            _id: "asdf5",
            name: "Manage Users",
        },
        {
            _id: "asdf6",
            name: "Manage Users",
        },
    ]);

    const handleRegister = (data: any) => {
        console.log(data);
    };

    return (
        <form className="w-full p-6" onSubmit={handleSubmit(handleRegister)}>
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
                    <label htmlFor="phoneNumber" className="block mb-2 text-xs">
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
            <div className="mb-4">
                <label htmlFor="role" className="block mb-2 text-xs">
                    Role
                </label>
                <Input placeholder="Type here..." {...register("role")} error={errors?.role} />
            </div>
            <div className="mb-4">
                <label htmlFor="permissions" className="block mb-2 text-xs">
                    Permissions
                </label>
                <div className="flex justify-start flex-wrap gap-4">
                    {permissionsList.map((permission) => (
                        <div className="flex items-start" key={permission._id}>
                            <div className="flex items-center h-5">
                                <Input
                                    id={permission._id}
                                    type="checkbox"
                                    value={permission._id}
                                    {...register("permissions")}
                                />
                            </div>
                            <label
                                htmlFor="remember"
                                className="ms-2 text-sm text-taupe-800 dark:text-taupe-300"
                            >
                                {permission.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-center">
                <Button text="Continue" type="submit" />
                <Button text="Skip" type="button" style="secondary" />
            </div>
        </form>
    );
}
