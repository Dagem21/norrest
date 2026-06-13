"use client";

import QrScanner from "@/components/QRScanner";
import { MenuContext } from "@/providers/menu";
import { useContext, useEffect } from "react";

export default function Branch() {
    const menuContext = useContext(MenuContext);

    useEffect(() => {
        menuContext?.setTitle("Menu (Scan QR Code)");
    });

    return (
        <div className="flex flex-col flex-1 items-center bg-taupe-100 dark:bg-taupe-900 p-2">
            <div className="flex flex-col w-screen">
                <QrScanner />
            </div>
        </div>
    );
}
