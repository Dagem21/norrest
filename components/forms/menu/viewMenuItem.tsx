import { ReactNode, useEffect, useState } from "react";

type ViewMenuItemProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

export default function ViewMenuItem({ isOpen, onClose, children }: ViewMenuItemProps) {
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

            const timer = setTimeout(() => setShouldRender(false), 900);
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
                className={`w-full max-w-lg max-h-[90vh] rounded-2xl bg-taupe-200 dark:bg-taupe-600 shadow-xl flex flex-col`}
                onClick={(event) => event.stopPropagation()}
            >
                <div className="overflow-y-auto flex-1 min-h-0">{children}</div>
            </div>
        </div>
    );
}
