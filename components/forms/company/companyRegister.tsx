"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CompanyRegisterForm({ handleNextStep }: { handleNextStep: () => void }) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleNextStep();
    };

    return (
        <form className="w-full p-6" onSubmit={handleSubmit}>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2.5 text-sm">
                    Company Name
                </label>
                <Input placeholder="Type here..." />
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="phone" className="block mb-2.5 text-sm">
                        Phone number
                    </label>
                    <Input placeholder="Type here..." start="+251" />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2.5 text-sm">
                        Email address
                    </label>
                    <Input placeholder="Type here..." start={<FontAwesomeIcon icon={faAt} />} />
                </div>
            </div>
            <div className="mb-6">
                <label htmlFor="website" className="block mb-2.5 text-sm">
                    Website URL
                </label>
                <Input placeholder="Type here..." />
            </div>
            <div className="flex items-center justify-center">
                <Button text="Continue" type="submit" />
                <Button text="Skip" type="button" style="secondary" />
            </div>
        </form>
    );
}
