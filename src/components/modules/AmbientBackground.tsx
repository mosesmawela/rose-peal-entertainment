"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export const AmbientBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const orbs = [".orb-1", ".orb-2", ".orb-3", ".orb-4", ".orb-5"];

            orbs.forEach((orb, i) => {
                // Random motion properties for organic feel
                const duration = 15 + Math.random() * 10;
                const delay = Math.random() * 5;

                // Move X
                gsap.to(orb, {
                    x: () => Math.random() * 40 - 20 + "vw",
                    duration: duration,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: delay
                });

                // Move Y
                gsap.to(orb, {
                    y: () => Math.random() * 40 - 20 + "vh",
                    duration: duration * 1.2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: delay
                });

                // Scale Pulse
                gsap.to(orb, {
                    scale: () => 1 + Math.random() * 0.5,
                    duration: duration * 0.8,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: delay
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
            {/* Background Base */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-rose-950/20 z-0" />

            {/* Fluid Orbs */}
            <div className="orb-1 absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-rose-600/20 rounded-full blur-[100px] mix-blend-screen opacity-40 will-change-transform" />
            <div className="orb-2 absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen opacity-30 will-change-transform" />
            <div className="orb-3 absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-amber-600/10 rounded-full blur-[150px] mix-blend-screen opacity-30 will-change-transform" />
            <div className="orb-4 absolute top-[40%] left-[30%] w-[30vw] h-[30vw] bg-rose-500/10 rounded-full blur-[80px] mix-blend-screen opacity-20 will-change-transform" />
            <div className="orb-5 absolute bottom-[10%] right-[10%] w-[45vw] h-[45vw] bg-indigo-900/40 rounded-full blur-[130px] mix-blend-screen opacity-40 will-change-transform" />

            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 z-50 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 pointer-events-none mix-blend-overlay" />
        </div>
    );
};
