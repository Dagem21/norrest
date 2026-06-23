import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons/faCircleExclamation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    start?: React.ReactNode;
    end?: React.ReactNode;
    error?: any;
    options: Array<{ id?: string; text: string }>;
}

export default function Select({
    start,
    end,
    className = "",
    error,
    options,
    ...rest
}: SelectProps) {
    return (
        <div
            className={`flex items-center text-sm border border-gray-400 rounded-md transition duration-300 ease shadow-sm 
            hover:border-slate-300 focus-within:border-slate-400 focus-within:shadow ${className} ${error?.message && "border-red-400"}`}
        >
            {start && (
                <div className="flex items-center h-full border-e border-gray-400 py-2 px-4 select-none">
                    {start}
                </div>
            )}

            <select
                className="w-full p-2 outline-none rounded-md accent-taupe-900 text-white px-4 py-2 text-base text-sm"
                {...rest}
            >
                {options.map((opt) => (
                    <option
                        className="bg-taupe-300 dark:bg-taupe-600 text-white"
                        value={opt.id ?? opt.text}
                        key={opt.id ?? opt.text}
                    >
                        {opt.text}
                    </option>
                ))}
            </select>

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
