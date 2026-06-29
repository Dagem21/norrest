"use client";

import Modal from "@/components/ui/modal";
import { MenuContext } from "@/providers/menu";
import { ToastContext } from "@/providers/toastProvider";
import { useContext, useEffect, useState } from "react";

export default function Orders() {
    const menuContext = useContext(MenuContext);
    const toaster = useContext(ToastContext);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        menuContext?.setTitle("Orders");
    });

    return (
        <div className="flex flex-col flex-1 items-center min-h-screen">
            <div className="w-full flex flex items-center justify-center"></div>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Edit Profile">
                sdfg
            </Modal>
        </div>
    );
}
