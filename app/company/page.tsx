"use client";

import Image from "next/image";
import profile from "../../assets/images/radblu.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "@/components/menu/sidebar";

export default function Register() {
    return (
        <div className="flex flex-col flex-1 items-center font-sans">
            <div className="relative flex flex-col w-full min-h-screen bg-cover bg-center bg-white dark:bg-gray-800 rounded-lg">
                <Sidebar />
                <div className="min-h-screen bg-red-100 flex items-center justify-center">asdf</div>
                <div className="min-h-screen bg-red-500 flex items-center justify-center">asdf</div>
            </div>
        </div>
    );
}
