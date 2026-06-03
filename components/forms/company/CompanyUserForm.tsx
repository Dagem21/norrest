"use client";

export default function CompanyUserForm({ handleNextStep }: { handleNextStep: () => void }) {
    return (
        <form className="w-full p-6">
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2.5 text-sm text-gray-400">
                    Company Name
                </label>
                <input
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-200 text-sm border border-gray-600 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="Type here..."
                />
            </div>
            <div className="mb-6">
                <label htmlFor="phone" className="block mb-2.5 text-sm text-gray-400">
                    Phone number
                </label>
                <input
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-200 text-sm border border-gray-600 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="Type here..."
                />
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2.5 text-sm text-gray-400">
                    Email address
                </label>
                <input
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-200 text-sm border border-gray-600 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="Type here..."
                />
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2.5 text-sm text-gray-400">
                    Role and Permissions
                </label>
                <select className="w-full bg-transparent placeholder:text-slate-400 text-slate-200 text-sm border border-gray-600 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
            </div>
            <div className="flex items-center justify-center">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-sm text-white rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
                >
                    Continue
                </button>
            </div>
        </form>
    );
}
