import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons/faCircleExclamation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
    start?: React.ReactNode;
    end?: React.ReactNode;
    error?: any;
}

export default function Input({ start, end, className = "", error, ...rest }: InputProps) {
    return (
        <div
            className={`flex items-center text-sm border border-gray-400 rounded-md transition duration-300 ease shadow-sm 
            hover:border-slate-300 focus-within:border-slate-400 focus-within:shadow ${error?.message && "border-red-400"}`}
        >
            {start && (
                <div className="flex items-center h-full border-e border-gray-400 py-2 px-4 select-none">
                    {start}
                </div>
            )}

            <input
                className={`w-full p-2 outline-none rounded-md accent-taupe-900 ${className}`}
                {...rest}
            />

            {error?.message && (
                <div className="me-1" title={error.message}>
                    <FontAwesomeIcon icon={faCircleExclamation} color="red" />
                </div>
            )}

            {end && (
                <div className="flex items-center h-full border-s border-gray-400 py-2 px-4 select-none">
                    {end}
                </div>
            )}
        </div>
    );
}
