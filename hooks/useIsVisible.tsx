"use client";

import { useEffect, useRef, useState } from "react";

// This hook returns a ref and a boolean (isVisible)
function useIsVisible(ref: any) {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) =>
            setIntersecting(entry.isIntersecting),
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref]);

    return isIntersecting;
}

export default useIsVisible;
