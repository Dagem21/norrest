"use client";

import MenuItemForm from "@/components/forms/menu/menuItem";
import Modal from "@/components/modal";
import { faGear, faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Company() {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div className="flex flex-col flex-1 items-center font-sans">
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Add Menu Item">
                <MenuItemForm />
            </Modal>
        </div>
    );
}
