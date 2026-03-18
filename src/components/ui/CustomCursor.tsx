"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);

    // Mouse position state
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Physics springs for smooth follow
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 10); // Offset to center
            mouseY.set(e.clientY - 10);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = target.closest("a, button, [role='button'], input, textarea, .clickable");
            setIsHovering(!!isClickable);
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Global Style to hide default cursor on desktop */}
            <style jsx global>{`
                @media (min-width: 768px) {
                    body, a, button, input, textarea {
                        cursor: none;
                    }
                }
            `}</style>

            <motion.div
                className="fixed top-0 left-0 w-5 h-5 bg-white/90 rounded-full pointer-events-none z-[10000] mix-blend-difference hidden md:block"
                style={{
                    x: cursorX,
                    y: cursorY,
                    scale: isHovering ? 2.5 : 1,
                }}
                transition={{ type: "spring", ...springConfig }}
            >
                {/* Optional: Inner Ring or effect */}
                {isHovering && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 border border-white/50 rounded-full animate-ping"
                    />
                )}
            </motion.div>
        </>
    );
};
