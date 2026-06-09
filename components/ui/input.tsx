export default function Input({ ...params }) {
    return (
        <div
            className="bg-green-300 flex gap-2 items-center text-sm border border-gray-400 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        >
            {"start" in params && <div className="h-full border-e py-2 px-4">H</div>}
            <input
                className="h-full transition duration-300 ease focus:outline-none focus:border-slate-400 p-2 bg-red-300"
                {...params}
            />
            {"end" in params && <div className="bg-red-500">H</div>}
        </div>
    );
}
