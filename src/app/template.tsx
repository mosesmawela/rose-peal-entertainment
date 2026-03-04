"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Drop In Animation
        gsap.fromTo(containerRef.current,
            { y: -20, opacity: 0, filter: "blur(10px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }
        );
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="will-change-transform">
            {children}
        </div>
    );
}
