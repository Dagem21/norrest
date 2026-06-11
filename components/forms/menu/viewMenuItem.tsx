import { ReactNode, useEffect, useState } from "react";

type ViewMenuItemProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

export default function ViewMenuItem({ isOpen, onClose, children }: ViewMenuItemProps) {
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
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 shadow-lg transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
            onClick={onClose}
        >
            <div
                className={`max-h-[90vh] rounded-2xl bg-taupe-200 dark:bg-taupe-600 shadow-xl transition-all duration-300 ease-out transform flex flex-col ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                onClick={(event) => event.stopPropagation()}
            >
                <div className="px-2 py-5 overflow-auto" style={{ maxHeight: "calc(90vh - 72px)" }}>
                    {children}
                </div>
            </div>
        </div>
    );
}
