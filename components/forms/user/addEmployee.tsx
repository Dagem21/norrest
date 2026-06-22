import Input from "@/components/ui/input";
import employeeSchema from "@/yup/userRegistration/companyEmployee";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

const permissions = ["Appetizer", "Entree", "Dessert", "Drink", "Vegan", "Gluten Free"];

export default function EmployeeForm() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(employeeSchema),
        mode: "onChange",
    });

    const handleCategoryChange = (permission: string) => {
        setSelectedPermissions((current) =>
            current.includes(permission)
                ? current.filter((p) => p !== permission)
                : [...current, permission],
        );
    };

    const handleRegister = (data: any) => {
        console.log("New employee:", data);

        setName("");
        setEmail("");
        setPhone("");
        setRole("");
        setSelectedPermissions([]);
    };

    return (
        <form onSubmit={handleSubmit(handleRegister)} className="max-w-md mx-auto flex flex-col gap-4">
            <div>
                <label htmlFor="name" className="block mb-2">
                    Name
                </label>
                <input
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-white-500"
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="phone" className="block mb-2 text-xs">
                    Name
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
                <label htmlFor="role" className="block mb-2">
                    Role
                </label>
                <input
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-white-500"
                    id="role"
                    type="text"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    required
                />
            </div>

            <fieldset className="border p-3 rounded-lg">
                <legend className="mb-2">Permissions</legend>
                <div className="grid grid-cols-3 gap-2">
                    {permissions.map((permission) => (
                        <label key={permission} className="block mb-2">
                            <input
                                className="mr-2 leading-tight"
                                type="checkbox"
                                checked={selectedPermissions.includes(permission)}
                                onChange={() => handleCategoryChange(permission)}
                            />
                            {permission}
                        </label>
                    ))}
                </div>
            </fieldset>

            <button
                type="submit"
                className="bg-taupe-400 hover:bg-taupe-500 text-white font-bold py-2 px-4 rounded-lg"
            >
                Add Employee
            </button>
        </form>
    );
}
