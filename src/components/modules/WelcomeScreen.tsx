"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/Button";
import { useAudioStore } from "@/lib/store/useAudioStore";

// Assets
const LOGO_ICON = "https://ik.imagekit.io/mosesmawela/Rose%20Pearl/logo(icon).svg?updatedAt=1770182492360";
const LOGO_TEXT = "https://ik.imagekit.io/mosesmawela/Rose%20Pearl/logo2Itext).svg?updatedAt=1770182492522";

export const WelcomeScreen = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { hasEntered, setHasEntered, play } = useAudioStore();
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    // Steal logic: Simulate loading
    useEffect(() => {
        if (hasEntered) return;

        const duration = 1500; // 1.5s load (Optimized from 2.5s)
        const startTime = Date.now();

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min((elapsed / duration) * 100, 100);
            setLoadingProgress(progress);

            if (progress >= 100) {
                clearInterval(interval);
                setIsReady(true);
            }
        }, 30);

        return () => clearInterval(interval);
    }, [hasEntered]);

    // Pulsating Animation
    useGSAP(() => {
        if (isReady) {
            gsap.to(".logo-pulse", {
                scale: 1.1,
                opacity: 0.6,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            gsap.fromTo(".enter-btn",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
            );
        }
    }, { scope: containerRef, dependencies: [isReady] });

    const handleEnter = () => {
        setIsExiting(true);

        // Exit Animation
        gsap.to(containerRef.current, {
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
                setHasEntered(true);
                play(); // Start music
            }
        });
    };

    if (hasEntered) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center vinyl-texture"
        >
            <div className="relative flex flex-col items-center gap-12 w-full max-w-4xl px-8">

                {/* Logo Container */}
                <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* Pulsating Glow */}
                    <div className="logo-pulse absolute inset-0 bg-rose-500/20 rounded-full blur-3xl opacity-0" />

                    {/* Loading Ring (Progress) */}
                    {!isReady && (
                        <svg className="absolute inset-[-10px] w-[calc(100%+20px)] h-[calc(100%+20px)] -rotate-90">
                            <circle cx="50%" cy="50%" r="48%" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                            <circle
                                cx="50%" cy="50%" r="48%"
                                fill="none"
                                stroke="#e11d48"
                                strokeWidth="2"
                                strokeDasharray="300"
                                strokeDashoffset={300 - (300 * loadingProgress) / 100}
                                className="transition-all duration-100 ease-linear"
                            />
                        </svg>
                    )}

                    {/* Logo Icon (Inverted) */}
                    <div className="relative z-10 w-24 h-24">
                        <Image
                            src={LOGO_ICON}
                            alt="Rose Pearl Icon"
                            fill
                            className="object-contain invert contrast-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                            priority
                        />
                    </div>
                </div>

                {/* Text Logo (Inverted) */}
                <div className="relative w-64 h-16 opacity-90">
                    <Image
                        src={LOGO_TEXT}
                        alt="Rose Pearl Text"
                        fill
                        className="object-contain invert"
                        priority
                    />
                </div>

                {/* Status Text & Button */}
                <div className="flex flex-col items-center gap-6 min-h-[80px]">
                    {!isReady ? (
                        <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-mono animate-pulse">
                            System Initializing [{Math.round(loadingProgress)}%]
                        </p>
                    ) : (
                        <div className="enter-btn opacity-0">
                            <Button
                                variant="glass"
                                onClick={handleEnter}
                                className="!px-10 !py-4 !text-xs !tracking-[0.25em] border-rose-500/40 hover:bg-rose-500/20 hover:border-rose-500/80 transition-all duration-500 shadow-[0_0_30px_rgba(225,29,72,0.1)] hover:shadow-[0_0_50px_rgba(225,29,72,0.3)]"
                            >
                                ENTER EXPERIENCE
                            </Button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};
