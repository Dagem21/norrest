import { ReactNode } from "react";

type ButtonProps = {
    text?: string;
    onClick?: () => void;
    title?: string;
    icon?: ReactNode;
    disabled?: boolean;
    type?: "button" | "submit" | "reset" | undefined;
    style?: "primary" | "secondary" | "teritary" | undefined;
};

export default function Button({
    text,
    icon,
    title,
    onClick,
    disabled = false,
    type,
    style = "primary",
}: ButtonProps) {
    return (
        <button
            type={type || "button"}
            className={`
                ${style === "primary" && "bg-taupe-600 dark:bg-taupe-800"}
                ${style === "secondary" && "border border-taupe-600 dark:border-taupe-800"}
                ${style === "teritary" && ""} 
                mx-2 hover:bg-taupe-500 text-white font-bold py-2 px-4 rounded-lg
            `}
            onClick={onClick}
            disabled={disabled}
            title={title}
        >
            {icon}
            {text}
        </button>
    );
}
