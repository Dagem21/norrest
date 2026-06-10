import React from "react";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
    start?: React.ReactNode;
    end?: React.ReactNode;
}

export default function Input({ start, end, className = "", ...rest }: InputProps) {
    return (
        <div
            className={`flex items-center gap-2 text-sm border border-gray-400 rounded-md transition duration-300 ease shadow-sm 
            hover:border-slate-300 focus-within:border-slate-400 focus-within:shadow ${className}`}
        >
            {start && (
                <div className="flex items-center h-full border-e border-gray-400 py-2 px-4 select-none">
                    {start}
                </div>
            )}

            <input
                className="w-full p-2 outline-none rounded-md"
                {...rest}
            />

            {end && (
                <div className="flex items-center h-full border-s border-gray-400 py-2 px-4 select-none">
                    {end}
                </div>
            )}
        </div>
    );
}