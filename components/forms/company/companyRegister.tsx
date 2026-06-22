"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import companySchema from "@/yup/company/company";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useForm } from "react-hook-form";

export default function CompanyRegisterForm({ onFinish }: { onFinish: () => void }) {
    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(companySchema),
        mode: "onChange",
    });

    const companyPicture = watch("picture");

    const handleRegister = (data: any) => {
        onFinish();
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
                <Button text="Continue" type="submit" />
            </div>
        </form>
    );
}
