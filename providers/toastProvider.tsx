"use client";

import { toastTypes } from "@/assets/enums/enum";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createContext, ReactNode, useState, useEffect } from "react";

interface ToastContextType {
    addToast: (toast: any) => void;
}

interface toastType {
    type: toastTypes;
    message: string;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toast, setToast] = useState<toastType | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (toast) {
            setShouldRender(true);
            const entryTimer = setTimeout(() => setIsVisible(true), 10);

            const autoDismissTimer = setTimeout(() => {
                setIsVisible(false);
            }, 5000);

            return () => {
                clearTimeout(entryTimer);
                clearTimeout(autoDismissTimer);
            };
        } else {
            setIsVisible(false);
        }
    }, [toast]);

    useEffect(() => {
        if (!isVisible && shouldRender) {
            const unmountTimer = setTimeout(() => {
                setShouldRender(false);
                setToast(null);
            }, 300);

            return () => clearTimeout(unmountTimer);
        }
    }, [isVisible, shouldRender]);

    const addToast = (newToast: toastType) => {
        if (toast) {
            setIsVisible(false);
            setTimeout(() => {
                setToast(newToast);
            }, 200);
        } else {
            setToast(newToast);
        }
    };

    const handleManualDelete = () => {
        setIsVisible(false);
    };

    const getBorderColor = () => {
        switch (toast?.type) {
            case toastTypes.success:
                return "#62ff54c7";
            case toastTypes.error:
                return "#ff5f54c7";
            case toastTypes.warning:
                return "#ffe554c7";
            default:
                return "#62ff54c7";
        }
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}

            <div className="fixed top-4 end-4 w-full max-w-sm z-[100] pointer-events-none flex flex-col items-end gap-2 overflow-hidden p-2">
                {shouldRender && toast && (
                    <div
                        className={`w-full flex justify-between items-center p-3 rounded bg-taupe-800 shadow-md shadow-taupe-600/30 border-l-4 pointer-events-auto transform transition-all duration-300 ease-out ${
                            isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                        }`}
                        style={{ borderColor: getBorderColor() }}
                    >
                        <p className="flex-1 m-0 text-sm text-white">{toast.message}</p>
                        <FontAwesomeIcon
                            icon={faClose}
                            onClick={handleManualDelete}
                            className="m-0 p-1 text-taupe-400 hover:text-white cursor-pointer rounded transition-colors"
                        />
                    </div>
                )}
            </div>
        </ToastContext.Provider>
    );
};

export default ToastProvider;
