import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import SignInForm from "./signin";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function SigninPopup({ isOpen, onClose }: ModalProps) {
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
                className={`relative transition-all duration-300 ease-out transform flex flex-col ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                onClick={(event) => event.stopPropagation()}
            >
                <div className="absolute top-0 right-0 p-2">
                    <FontAwesomeIcon
                        className="rounded-full text-taupe-600 dark:text-taupe-200 transition hover:bg-gray-100 hover:text-gray-900"
                        icon={faClose}
                        size="lg"
                        onClick={onClose}
                    />
                </div>
                <div>
                    <SignInForm redirect={false} onclose={onClose} />
                </div>
            </div>
        </div>
    );
}
