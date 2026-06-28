import { useState } from "react";

export default function ToggleSwitch({ value, onChange }: { value: boolean, onChange: (e: any) => void }) {

    return (
        <div className="flex items-center gap-3 select-none">
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={value}
                    onChange={onChange}
                    className="sr-only peer"
                />

                <div className="w-9 h-5 bg-taupe-200 rounded-full transition-colors duration-200 ease-in-out peer-focus:ring-2 peer-focus:ring-taupe-500 peer-checked:bg-taupe-800"></div>

                <div className="absolute top-[2px] left-[2px] w-4 h-4 bg-taupe-900 rounded-full border border-taupe-300 transition-transform duration-200 ease-in-out peer-checked:translate-x-full"></div>
            </label>
        </div>
    );
}
