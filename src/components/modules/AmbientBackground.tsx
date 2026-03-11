"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export const AmbientBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useRef(false);

    useEffect(() => {
        // Check for reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        prefersReducedMotion.current = mediaQuery.matches;

        if (prefersReducedMotion.current) return;

        const ctx = gsap.context(() => {
            // Reduced from 5 orbs to 3 for better performance
            const orbs = [".orb-1", ".orb-2", ".orb-3"];

            orbs.forEach((orb, i) => {
                // Consolidated into single timeline for better performance
                const tl = gsap.timeline({
                    repeat: -1,
                    yoyo: true,
                    delay: i * 2
                });

                tl.to(orb, {
                    x: "random(-15, 15, 5)vw",
                    y: "random(-15, 15, 5)vh",
                    scale: "random(0.9, 1.2)",
                    duration: 20 + i * 5,
                    ease: "sine.inOut"
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Static fallback for reduced motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return (
            <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-black via-zinc-950 to-rose-950/20" />
        );
    }

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
            {/* Background Base */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-rose-950/20 z-0" />

            {/* Reduced to 3 orbs with lower blur for performance */}
            <div className="orb-1 absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-rose-600/15 rounded-full blur-[80px] mix-blend-screen opacity-40 will-change-transform" />
            <div className="orb-2 absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] bg-purple-600/15 rounded-full blur-[90px] mix-blend-screen opacity-30 will-change-transform" />
            <div className="orb-3 absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] bg-amber-600/10 rounded-full blur-[100px] mix-blend-screen opacity-25 will-change-transform" />

            {/* Static noise texture - cached */}
            <div
                className="absolute inset-0 z-50 opacity-[0.03] brightness-100 contrast-150 pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
};
