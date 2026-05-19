"use client";

import Image from "next/image";
import profile from "../../assets/images/radblu.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

export default function Register() {
    return (
        <div className="flex flex-col flex-1 items-center font-sans">
            <div className="flex flex-col w-full min-h-screen bg-cover bg-center bg-white dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between w-full p-2 rounded-lg shadow-xl mt-2">
                    <div className="flex items-center gap-4">
                        <Image
                            src={profile}
                            alt="Picture of the author"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <h1 className="text-md font-bold text-gray-400">
                            Welcome, <span className="text-blue-500">User Name</span>
                        </h1>
                    </div>
                    <div className="me-2">
                        <FontAwesomeIcon
                            icon={faSignOut}
                            size="lg"
                            className="text-gray-600 hover:text-gray-400 cursor-pointer transition duration-300"
                            title="Logout"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
