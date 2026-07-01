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
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            setShouldRender(true);
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";

            const timer = setTimeout(() => setIsVisible(true), 10);
            return () => {
                window.removeEventListener("keydown", handleKeyDown);
                clearTimeout(timer);
            };
        } else {
            setIsVisible(false);
            document.body.style.overflow = "auto";

            const timer = setTimeout(() => setShouldRender(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    if (!shouldRender) {
        return null;
    }

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 shadow-lg transition-opacity duration-300 ${
                isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            onClick={onClose}
        >
            <div
                className={`max-h-[90vh] w-full max-w-2xl rounded-2xl bg-taupe-200 dark:bg-taupe-600 shadow-xl transition-all duration-300 ease-out transform flex flex-col ${
                    isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-center justify-between px-6 py-4 flex-shrink-0 bg-taupe-400 dark:bg-taupe-700 rounded-t-2xl">
                    <h2 className="text-lg font-semibold">{title ?? "Modal"}</h2>
                    <FontAwesomeIcon
                        className="p-1 rounded-full text-taupe-600 dark:text-taupe-200 cursor-pointer transition hover:bg-black/5 dark:hover:bg-white/10"
                        icon={faClose}
                        size="lg"
                        onClick={onClose}
                    />
                </div>

                <div className="px-6 py-5 overflow-y-auto flex-1 min-h-0">{children}</div>
            </div>
        </div>
    );
}
