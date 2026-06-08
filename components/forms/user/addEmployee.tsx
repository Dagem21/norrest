import { useState } from "react";

const permissions = ["Appetizer", "Entree", "Dessert", "Drink", "Vegan", "Gluten Free"];

export default function EmployeeForm() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

    const handleCategoryChange = (permission: string) => {
        setSelectedPermissions((current) =>
            current.includes(permission)
                ? current.filter((p) => p !== permission)
                : [...current, permission],
        );
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const employee = {
            name,
            email,
            phone,
            role,
            permissions: selectedPermissions,
        };

        console.log("New employee:", employee);

        setName("");
        setEmail("");
        setPhone("");
        setRole("");
        setSelectedPermissions([]);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col gap-4">
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
                <label htmlFor="phone" className="block mb-2">
                    Phone Number
                </label>
                <input
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-white-500"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="email" className="block mb-2">
                    Email
                </label>
                <input
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-white-500"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
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
