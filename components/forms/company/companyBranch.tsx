import Input from "@/components/ui/input";
import branchSchema from "@/yup/company/branch";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export default function BranchForm() {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(branchSchema),
        mode: "onChange",
    });

    const handleRegister = (data: any) => {
        console.log("New branch:", data);
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

            <button
                type="submit"
                className="bg-taupe-400 hover:bg-taupe-500 text-white font-bold py-2 px-4 rounded-lg"
            >
                Add Branch
            </button>
        </form>
    );
}
