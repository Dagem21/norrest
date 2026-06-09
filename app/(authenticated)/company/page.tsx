"use client";

import { MenuContext } from "@/providers/menu";
import { faExternalLink, faGear, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function Company() {
    const menuContext = useContext(MenuContext);

    useEffect(() => {
        menuContext?.setTitle("Restaurants");
    });

    return (
        <div className="flex flex-col flex-1 items-center">
            <div className="flex flex-wrap gap-2 justify-between w-full">
                <div className="w-sm p-2 bg-taupe-200 dark:bg-taupe-600 rounded-lg">
                    <div className="relative">
                        <Link href={`/company/${1}/settings`}>
                            <FontAwesomeIcon
                                className="absolute top-0 right-0 cursor-pointer m-1"
                                icon={faGear}
                            />
                        </Link>
                        <h1 className="text-sm font-bold text-center text-taupe-600 dark:text-taupe-200">
                            Company Name
                        </h1>
                    </div>
                    <hr className="m-3 border-taupe-500 dark:border-taupe-400" />
                    <div className="pb-2">
                        <div className="flex justify-between p-2 shadow">
                            <h1 className="text-sm text-center text-taupe-600 dark:text-taupe-200">
                                Branch Name.
                            </h1>
                            <Link href={`/company/${1}/branch/${1}`}>
                                <FontAwesomeIcon icon={faExternalLink} />
                            </Link>
                        </div>
                        <div className="flex justify-between p-2 shadow">
                            <h1 className="text-sm text-center text-taupe-600 dark:text-taupe-200">
                                Branch Name.
                            </h1>
                            <FontAwesomeIcon icon={faExternalLink} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
