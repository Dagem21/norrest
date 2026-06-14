"use client";

import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import Button from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faShare } from "@fortawesome/free-solid-svg-icons";

export default function QrGenerator({ url, companyName }: { url: string, companyName: string }) {

    const getCanvasBlob = (): Promise<Blob | null> => {
        return new Promise((resolve) => {
            const canvas = document.getElementById("my-qr-canvas") as HTMLCanvasElement | null;
            if (!canvas) {
                resolve(null);
                return;
            }
            canvas.toBlob((blob) => resolve(blob), "image/png");
        });
    };

    const handleDownload = async () => {
        const canvas = document.getElementById("my-qr-canvas") as HTMLCanvasElement | null;
        if (!canvas) return;

        const pngUrl = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qr-code.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const handleShare = async () => {
        const blob = await getCanvasBlob();
        if (!blob) return;

        // Create a temporary file object from the blob
        const file = new File([blob], "qr-code.png", { type: "image/png" });

        // Check if the browser supports sharing files natively
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    files: [file],
                    title: companyName,
                    text: "Scan the QR Code and discover our Menu!",
                });
            } catch (error) {
                console.error("Error sharing:", error);
            }
        } else {
            // Fallback if browser sharing is unsupported (like some desktop browsers)
            alert("Native sharing is not supported on this browser. You can download the QR code instead!");
        }
    };

    return (
        <div className="p-2 rounded-2xl shadow-xl flex flex-col items-center gap-6">
            <div className="bg-taupe-50 shadow-inner">
                {/* <QRCodeSVG
                    value={url}
                    size={300}               // Size in pixels
                    bgColor={"#ebebeb"}      // Background color
                    fgColor={"#3b3b3b"}      // Foreground/Code color
                    level={"H"}              // Error correction level (L, M, Q, H)
                    includeMargin={true}     // Adds a clean white border around the QR
                    imageSettings={{         // Optional: Add a center logo
                        src: "/radblu.jpg",
                        x: undefined,
                        y: undefined,
                        height: 60,
                        width: 60,
                        excavate: true,
                    }}
                /> */}
                <QRCodeCanvas
                    id="my-qr-canvas"
                    value={url}
                    size={300}               // Size in pixels
                    bgColor={"#ebebeb"}      // Background color
                    fgColor={"#3b3b3b"}      // Foreground/Code color
                    level={"H"}              // Error correction level (L, M, Q, H)
                    includeMargin={true}     // Adds a clean white border around the QR
                    imageSettings={{         // Optional: Add a center logo
                        src: "/radblu.jpg",
                        x: undefined,
                        y: undefined,
                        height: 60,
                        width: 60,
                        excavate: true,
                    }}
                />
            </div>
            <div className="flex items-center justify-center">
                <Button icon={<FontAwesomeIcon icon={faShare} />} onClick={handleShare} />
                <Button icon={<FontAwesomeIcon icon={faDownload} />} onClick={handleDownload} />
            </div>
        </div>
    );
}