import { useState } from "react";

export default function BranchForm() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const branch = {
            name,
            email,
            phone,
            address,
        };

        console.log("New branch:", branch);

        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
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
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
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
                <label htmlFor="email" className="block mb-2">
                    Address
                </label>
                <input
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-white-500"
                    id="address"
                    type="text"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    required
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
