"use client";

import { toastTypes } from "@/assets/enums/enum";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createContext, ReactNode, useState } from "react";

interface ToastContextType {
    addToast: React.Dispatch<React.SetStateAction<any>>;
}

interface toastType {
    type: toastTypes;
    message: string;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<toastType | null>();

    const deleteToast = () => {
        setToasts(null);
    };

    const addToast = (toast: toastType) => {
        if (toasts) {
            deleteToast();
        }
        setToasts(toast);
    };

    const MakeToast = ({ toast }: { toast: toastType }) => {
        const color =
            toast?.type === toastTypes.success
                ? "#62ff54c7"
                : toast?.type === toastTypes.error
                  ? "#ff5f54c7"
                  : toast?.type === toastTypes.warning
                    ? "#ffe554c7"
                    : "#62ff54c7";

        const timerID = setTimeout(() => {
            deleteToast();
        }, 5000);

        const handleDelete = () => {
            deleteToast();
            clearTimeout(timerID);
        };

        return (
            <div
                className="flex justify-between items-center p-3 rounded max-w-sm mt-2"
                style={{ backgroundColor: color }}
            >
                <p className="flex-1 m-0 text-sm">{toast?.message}</p>
                <FontAwesomeIcon icon={faClose} onClick={handleDelete} className="m-0 p-0" />
            </div>
        );
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            <div className="bg-transparent fixed top-0 end-0 w-sm z-100">
                {toasts && <MakeToast toast={toasts} />}
            </div>
            {children}
        </ToastContext.Provider>
    );
};

export default ToastProvider;
