"use client";

import { userTypes } from "@/assets/enums/enum";
import { MenuContext } from "@/providers/menu";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useContext } from "react";

export default function BuisnessLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const menuContext = useContext(MenuContext);

    if (menuContext?.user?.type !== userTypes.Buisness) {
        return (
            <div className="flex flex-col items-center justify-center">
                <p>Please upgrade your account to buisness first.</p>
                <Link href="/settings">
                    Go to settings. <FontAwesomeIcon icon={faExternalLink} />
                </Link>
            </div>
        );
    }

    return <>{children}</>;
}
