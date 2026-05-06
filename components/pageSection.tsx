"use client";

import useIsVisible from "@/hooks/useIsVisible";
import { useRef } from "react";

export const PageSection = ({ title, bgColor }: { title: string; bgColor: string }) => {
    const sectionRef = useRef(null);
    const isVisible = useIsVisible(sectionRef);

    return (
        <section
            ref={sectionRef}
            className={`h-screen flex items-center justify-center snap-start ${bgColor}`}
        >
            <div
                className={`
                    transition-all duration-1000 ease-out transform
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
                `}
            >
                <h1 className="text-6xl font-bold text-white">{title}</h1>
            </div>
        </section>
    );
};
