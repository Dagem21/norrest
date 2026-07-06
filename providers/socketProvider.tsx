"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createContext, ReactNode, useState, useEffect, useContext, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { MenuContext } from "./menu";
import { SIO_URL } from "@/config";

interface SocketContextType {
    addNotification: (
        notification: Omit<NotificationItem, "id" | "isVisible" | "shouldRender">,
    ) => void;
    incomingOrders: any[];
}

interface NotificationItem {
    id: string;
    order: any;
    isVisible: boolean;
    shouldRender: boolean;
}

export const SocketContext = createContext<SocketContextType | undefined>(undefined);

const SocketProvider = ({ children }: { children: ReactNode }) => {
    const menuContext = useContext(MenuContext);
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [incomingOrders, setIncomingOrders] = useState<any[]>([]);

    const socketRef = useRef<Socket | null>(null);

    const addNotification = (newNotification: { order: any }) => {
        const id = newNotification.order?._id || Math.random().toString(36).substring(2, 9);

        // Append new toast to the bottom of the list
        setNotifications((prev) => [
            ...prev,
            { id, order: newNotification.order, isVisible: false, shouldRender: true },
        ]);

        // Trigger the slide-in animation right after mounting
        setTimeout(() => {
            setNotifications((prev) =>
                prev.map((n) => (n.id === id ? { ...n, isVisible: true } : n)),
            );
        }, 10);

        // Auto dismiss this specific toast after 5 seconds
        setTimeout(() => {
            dismissNotification(id);
        }, 5000);
    };

    const dismissNotification = (id: string) => {
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isVisible: false } : n)));

        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 300);
    };

    useEffect(() => {
        const userId = menuContext?.user?._id;
        if (!userId) return;

        console.log("SIO", SIO_URL);
        socketRef.current = io(`${SIO_URL}?userId=${userId}`);

        socketRef.current.on("order_create", (data: any) => {
            console.log(data);
            setIncomingOrders((prev) => [...prev, data]);
            addNotification({ order: data });
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [menuContext?.user?._id]);

    return (
        <SocketContext.Provider value={{ addNotification, incomingOrders }}>
            {children}

            {/* Container for notifications stacking downwards */}
            <div className="fixed top-4 end-0 w-full max-w-sm z-[100] pointer-events-none flex flex-col items-end gap-2 p-2">
                {notifications.map(
                    (notif) =>
                        notif.shouldRender && (
                            <div
                                key={notif.id}
                                className={`w-full p-3 rounded bg-taupe-800 shadow-md shadow-taupe-600/30 border-l-4 pointer-events-auto transform transition-all duration-300 ease-out ${
                                    notif.isVisible
                                        ? "translate-x-0 opacity-100"
                                        : "translate-x-full opacity-0"
                                }`}
                                style={{ borderColor: "#ffe44c" }}
                            >
                                <div className="w-full flex flex-col">
                                    <p className="m-0 text-xs text-taupe-300">
                                        {notif.order?.branchID?.companyID?.name},{" "}
                                        {notif.order?.branchID?.name}
                                    </p>
                                    <div className="w-full">
                                        {notif.order?.items?.map((item: any) => (
                                            <div
                                                className="w-full flex justify-between"
                                                key={item?._id}
                                            >
                                                <p className="m-0 text-sm text-taupe-100">
                                                    {item?.itemID?.name}
                                                </p>
                                                <p className="m-0 text-sm text-taupe-100">
                                                    x {item?.quantity}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <FontAwesomeIcon
                                    icon={faClose}
                                    onClick={() => dismissNotification(notif.id)}
                                    className="fixed top-0 end-0 m-1 p-1 text-taupe-400 hover:text-white cursor-pointer rounded transition-colors"
                                />
                            </div>
                        ),
                )}
            </div>
        </SocketContext.Provider>
    );
};

export default SocketProvider;
