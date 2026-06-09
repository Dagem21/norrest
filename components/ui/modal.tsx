import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useEffect, useState } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
};

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
            setIsVisible(true);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 shadow-lg transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
            onClick={onClose}
        >
            <div
                className={`max-h-[90vh] w-full max-w-2xl rounded-2xl bg-taupe-200 dark:bg-taupe-600 shadow-xl transition-all duration-300 ease-out transform flex flex-col ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-center justify-between px-6 py-4 flex-shrink-0 bg-taupe-400 dark:bg-taupe-700 rounded-t-2xl">
                    <h2 className="text-lg font-semibold">{title ?? "Modal"}</h2>
                    <FontAwesomeIcon
                        className="rounded-full text-taupe-600 dark:text-taupe-200 transition hover:bg-gray-100 hover:text-gray-900"
                        icon={faClose}
                        size="lg"
                        onClick={onClose}
                    />
                </div>
                <div className="px-6 py-5 overflow-auto" style={{ maxHeight: "calc(90vh - 72px)" }}>
                    {children}
                </div>
            </div>
        </div>
    );
}
