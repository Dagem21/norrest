import { useState, useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

interface DropdownOptionProps {
    id?: string;
    text: string;
}

interface DropdownProps {
    options: DropdownOptionProps[];
    onSelect?: (option: string) => void;
    defaultLabel?: ReactNode;
    title?: string;
}

export default function Dropdown({
    options,
    onSelect,
    defaultLabel = "Select an option",
    title = "Select an option",
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<ReactNode>(defaultLabel);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [coords, setCoords] = useState({ top: 0, left: 0 });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            const clickedOutsideTrigger = dropdownRef.current && !dropdownRef.current.contains(target);
            const clickedOutsideMenu = menuRef.current && !menuRef.current.contains(target);

            if (clickedOutsideTrigger && clickedOutsideMenu) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = () => {
        if (!isOpen && dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect();
            const dropdownWidth = 224;
            const paddingFromEdge = 16;

            let calculatedLeft = rect.right + window.scrollX - dropdownWidth;

            const screenWidth = window.innerWidth;
            if (rect.right > screenWidth - paddingFromEdge) {
                calculatedLeft = screenWidth + window.scrollX - dropdownWidth - paddingFromEdge;
            }

            if (calculatedLeft < 0) {
                calculatedLeft = paddingFromEdge;
            }

            setCoords({
                top: rect.bottom + window.scrollY,
                left: calculatedLeft,
            });
        }
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: string) => {
        setIsOpen(false);
        if (onSelect) onSelect(option);
    };

    return (
        <div className="inline-block text-left" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                type="button"
                className="inline-flex items-center justify-center h-9 w-9 bg-taupe-600 dark:bg-taupe-800 py-1 px-2 hover:bg-taupe-500 text-white font-bold rounded active:bg-gray-200 transition-colors"
                aria-label="Options menu"
                aria-expanded={isOpen}
                aria-haspopup="true"
                title={title}
            >
                {selectedOption}
            </button>

            {isOpen &&
                createPortal(
                    <div
                        ref={menuRef}
                        className="absolute z-50 mt-1 w-56 origin-top-right rounded-md bg-taupe-600 dark:bg-taupe-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
                        style={{
                            top: `${coords.top}px`,
                            left: `${coords.left}px`,
                        }}
                    >
                        <div className="py-1" role="menu">
                            {options.map((option, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleOptionClick(option.id ?? option.text)}
                                    className="block w-full text-left px-4 py-2 text-sm text-taupe-800 dark:text-taupe-100 hover:bg-taupe-500 hover:text-taupe-900 transition-colors"
                                    role="menuitem"
                                >
                                    {option.text}
                                </button>
                            ))}
                            {options.length === 0 && (
                                <h1 className="text-sm px-4 py-2">No options available.</h1>
                            )}
                        </div>
                    </div>,
                    document.body,
                )}
        </div>
    );
}