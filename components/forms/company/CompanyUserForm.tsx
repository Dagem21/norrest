"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CompanyUserForm({ handleNextStep }: { handleNextStep: () => void }) {
    return (
        <form className="w-full p-6">
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2.5 text-sm">
                    Company Name
                </label>
                <Input placeholder="Type here..." />
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="email" className="block mb-2.5 text-sm">
                        Email
                    </label>
                    <Input placeholder="Type here..." start={<FontAwesomeIcon icon={faAt} />} />
                </div>
                <div>
                    <label htmlFor="phone" className="block mb-2.5 text-sm">
                        Phone number
                    </label>
                    <Input placeholder="Type here..." start="+251" />
                </div>
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2.5 text-sm">
                    Role and Permissions
                </label>
                <select className="w-full border border-gray-400 rounded-md transition duration-300 ease shadow-sm 
            hover:border-slate-300 focus-within:border-slate-400 focus-within:shadow p-2" />
            </div>
            <div className="flex items-center justify-center">
                <Button text="Continue" type="submit" />
            </div>
        </form>
    );
}
