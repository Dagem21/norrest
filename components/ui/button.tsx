import { ReactNode } from "react";

type ButtonProps = {
    text?: string;
    onClick?: () => void;
    title?: string;
    icon?: ReactNode;
    disabled?: boolean;
    type?: "button" | "submit" | "reset" | undefined;
};

export default function Button({
    text,
    icon,
    title,
    onClick,
    disabled = false,
    type,
}: ButtonProps) {
    return (
        <button
            type={type || "button"}
            className="bg-taupe-400 dark:bg-taupe-800 hover:bg-taupe-500 text-white font-bold py-2 px-4 rounded-lg"
            onClick={onClick}
            disabled={disabled}
            title={title}
        >
            {icon}
            {text}
        </button>
    );
}
