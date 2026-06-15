"use client";

import QrScanner from "@/components/QRScanner";
import Modal from "@/components/ui/modal";
import { MenuContext } from "@/providers/menu";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";

export default function Branch() {
    const menuContext = useContext(MenuContext);
    const [isScanModalOpen, setIsScanModalOpen] = useState(false);

    useEffect(() => {
        menuContext?.setTitle("Menu (Scan QR Code)");
    });

    return (
        <div className="flex flex-col flex-1 items-center bg-taupe-100 dark:bg-taupe-900 p-2">
            <div className="flex flex-col w-full">
                <div className="bg-taupe-200 dark:bg-taupe-600 p-2 rounded-lg flex flex-col items-center">
                    <h1 className="text-sm font-bold">Explore Menu</h1>
                </div>
            </div>
            <div className="fixed bottom-0 right-0 m-6">
                <button
                    className="rounded-full bg-taupe-400 dark:bg-taupe-600 p-3 shadow-lg"
                    onClick={() => setIsScanModalOpen(true)}
                >
                    <FontAwesomeIcon icon={faQrcode} size="lg" />
                </button>
            </div>
            <Modal
                isOpen={isScanModalOpen}
                onClose={() => setIsScanModalOpen(false)}
                title="Scan QR Code"
            >
                <QrScanner />
            </Modal>
        </div>
    );
}
