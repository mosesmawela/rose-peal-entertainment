"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface KnobProps {
    min?: number;
    max?: number;
    value?: number;
    onChange?: (value: number) => void;
    label?: string;
}

export const Knob = ({ min = 0, max = 100, value = 50, onChange, label }: KnobProps) => {
    const knobRef = useRef<HTMLDivElement>(null);
    const [currentValue, setCurrentValue] = useState(value);
    const [isDragging, setIsDragging] = useState(false);
    const startY = useRef(0);
    const startValue = useRef(0);

    // Rotation logic
    useGSAP(() => {
        // Map value (min-max) to rotation (-135 to 135 degrees)
        const percentage = (currentValue - min) / (max - min);
        const rotation = -135 + (percentage * 270);

        gsap.to(knobRef.current, {
            rotation: rotation,
            duration: 0.1,
            ease: "power1.out",
        });
    }, [currentValue]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        startY.current = e.clientY;
        startValue.current = currentValue;
        document.body.style.cursor = "ns-resize";
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;

            const deltaY = startY.current - e.clientY;
            const range = max - min;
            // Sensitivity: 100px drag = full range
            const deltaValue = (deltaY / 200) * range;

            let newValue = startValue.current + deltaValue;
            newValue = Math.max(min, Math.min(max, newValue));

            setCurrentValue(newValue);
            if (onChange) onChange(newValue);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.body.style.cursor = "default";
        };

        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, max, min, onChange]);

    return (
        <div className="flex flex-col items-center gap-2 select-none group">
            <div
                className="w-16 h-16 rounded-full bg-linear-to-b from-neutral-800 to-black shadow-skeuo-rest relative flex items-center justify-center cursor-ns-resize border border-white/5 active:shadow-skeuo-pressed"
                onMouseDown={handleMouseDown}
            >
                <div ref={knobRef} className="w-full h-full rounded-full relative">
                    {/* Indicator Line */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-3 bg-rose-500 rounded-full shadow-[0_0_5px_theme(colors.rose.500)]" />
                </div>

                {/* Metal Texture Overlay */}
                <div className="absolute inset-0 rounded-full bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-20 pointer-events-none" />
            </div>

            {label && (
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono group-hover:text-rose-500 transition-colors">
                    {label}
                </span>
            )}
        </div>
    );
};
