"use client";

import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface ToggleProps {
    label?: string;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
}

export const Toggle = ({ label, defaultChecked = false, onChange }: ToggleProps) => {
    const [checked, setChecked] = useState(defaultChecked);
    const switchRef = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const handle = handleRef.current;
        if (!handle) return;

        gsap.to(handle, {
            x: checked ? 20 : 0,
            backgroundColor: checked ? "#e11d48" : "#262626", // Rose 500 vs Neutral 800
            boxShadow: checked ? "0 0 10px rgba(225, 29, 72, 0.5)" : "none",
            duration: 0.3,
            ease: "power2.out",
        });
    }, [checked]);

    const toggle = () => {
        const newState = !checked;
        setChecked(newState);
        if (onChange) onChange(newState);
    };

    return (
        <div className="flex items-center gap-3 cursor-pointer group" onClick={toggle}>
            <div
                ref={switchRef}
                className="w-12 h-6 bg-black rounded-full shadow-skeuo-pressed p-1 relative border border-white/5"
            >
                <div
                    ref={handleRef}
                    className="w-4 h-4 rounded-full bg-neutral-800 shadow-sm"
                />
            </div>
            {label && (
                <span className="text-xs uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                    {label}
                </span>
            )}
        </div>
    );
};
