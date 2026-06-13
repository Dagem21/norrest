"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import Button from "./ui/button";
import { useRouter } from "next/navigation";

export default function CustomUiScanner() {
    const router = useRouter()
    const [scanResult, setScanResult] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [scanError, setScanError] = useState<string | null>();
    const scannerRef = useRef<Html5Qrcode | null>(null);

    useEffect(() => {
        scannerRef.current = new Html5Qrcode("custom-reader");

        return () => {
            if (scannerRef.current?.isScanning) {
                scannerRef.current.stop().catch((err) => console.error(err));
            }
        };
    }, []);

    useEffect(() => {
        try {
            if (scanResult) {
                const parsedUrl = new URL(scanResult);
                if (parsedUrl.protocol !== "https:") {
                    setScanError("Invalid QR Code.");
                    return
                }

                const menuPathRegex = /^\/menu\/[a-zA-Z0-9_-]+\/?$/;
                if (!menuPathRegex.test(parsedUrl.pathname)) {
                    setScanError("Invalid QR Code.");
                }

                router.push(scanResult);
            }
        } catch (error) {
            setScanError("Invalid QR Code.");
        }
    }, [scanResult]);

    const startScanning = async () => {
        if (!scannerRef.current) return;
        setIsScanning(true);
        setScanError(null);

        try {
            await scannerRef.current.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: 250 },
                (decodedText) => {
                    setScanResult(decodedText);
                    stopScanning();
                },
                (errorMessage) => { }
            );
        } catch (err) {
            setIsScanning(false);
        }
    };

    const stopScanning = async () => {
        if (scannerRef.current?.isScanning) {
            await scannerRef.current.stop();
        }
        setIsScanning(false);
    };

    return (
        <div className="w-sm mx-auto bg-taupe-600 text-white rounded-2xl p-4 shadow-2xl space-y-6">
            <div className="text-center">
                <h3 className="text-lg font-bold tracking-wide">Menu</h3>
                <p className="text-xs mt-1">Scan the QR Code</p>
            </div>

            <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-taupe-700">
                <div id="custom-reader" className="w-full h-full" />

                {isScanning && !scanResult && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        <div className="w-80 h-80 border-2 border-taupe-400 rounded-lg animate-pulse shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
                    </div>
                )}
            </div>

            <div className="flex flex-col items-center gap-3">
                {scanError && (
                    <div className="w-full p-3 text-red-400 text-xs rounded-lg text-center break-all">
                        {scanError}
                    </div>
                )}

                {!isScanning ? (
                    <Button
                        onClick={startScanning}
                        text={scanResult ? "Scan Another" : "Open Camera"} />
                ) : (
                    <Button
                        onClick={stopScanning}
                        text="Cancel Scanning" />
                )}
            </div>
        </div>
    );
}