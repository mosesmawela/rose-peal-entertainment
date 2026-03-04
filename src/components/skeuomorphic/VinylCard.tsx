"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface VinylCardProps {
    title: string;
    artist: string;
    className?: string;
    coverUrl?: string;
}

export const VinylCard = ({ title, artist, className = "", coverUrl }: VinylCardProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const recordRef = useRef<HTMLDivElement>(null);
    const coverRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const container = containerRef.current;
        const record = recordRef.current;
        const cover = coverRef.current;
        if (!container || !record || !cover) return;

        // Disc slide and spin animation
        const hoverAnim = gsap.timeline({ paused: true });

        hoverAnim
            .to(record, {
                x: 60,
                duration: 0.5,
                ease: "power2.out",
            })
            .to(record, {
                rotation: 360,
                duration: 2,
                repeat: -1,
                ease: "none",
            }, "<"); // Start spinning immediately

        container.addEventListener("mouseenter", () => {
            hoverAnim.play().timeScale(1); // Ensure forward speed
        });

        container.addEventListener("mouseleave", () => {
            // Reverse slide, stop spin smoothly
            gsap.to(record, { x: 0, duration: 0.4, ease: "power2.in" });
            hoverAnim.pause();
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={`relative w-48 h-48 group cursor-pointer ${className}`}>
            {/* Vinyl Disc (Behind Cover) */}
            <div
                ref={recordRef}
                className="absolute top-1 left-1 w-[95%] h-[95%] rounded-full bg-black shadow-xl flex items-center justify-center vinyl-texture z-0"
            >
                {/* Label */}
                <div className="w-1/3 h-1/3 bg-rose-500 rounded-full flex items-center justify-center text-[8px] text-white/80 font-mono border-2 border-dashed border-white/20">
                    RP-01
                </div>
            </div>

            {/* Sleeve Cover (Front) */}
            <div className="absolute inset-0 bg-neutral-900 rounded-sm shadow-skeuo-rest z-10 overflow-hidden border border-white/5 transition-transform duration-200 group-active:scale-95 group-active:shadow-skeuo-pressed">
                {/* Album Cover */}
                <div
                    ref={coverRef}
                    className="absolute inset-0 z-20 rounded-sm shadow-2xl overflow-hidden bg-neutral-900"
                >
                    {coverUrl ? (
                        <img
                            src={coverUrl}
                            alt={`${title} Cover`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-rose-900 to-black p-8 flex flex-col justify-between">
                            <div className="text-rose-500/50 text-xs font-mono uppercase tracking-widest">
                                Rose Pearl Ent.
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-2xl leading-none mb-2">{title}</h3>
                                <p className="text-white/60 text-sm">{artist}</p>
                            </div>
                        </div>
                    )}

                    {/* Gloss / Texture Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50 pointer-events-none" />
                </div>
            </div>
        </div>
    );
};
