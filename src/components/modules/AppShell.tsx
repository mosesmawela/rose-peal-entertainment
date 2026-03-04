"use client";

import { useAudioStore } from "@/lib/store/useAudioStore";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/modules/Navbar";
import { Footer } from "@/components/modules/Footer";
import { MusicPlayer } from "@/components/modules/MusicPlayer";
import { CommandPalette } from "@/components/modules/CommandPalette";
import { WelcomeScreen } from "@/components/modules/WelcomeScreen";
import { AmbientBackground } from "@/components/modules/AmbientBackground";
import { BackgroundLogo } from "@/components/modules/BackgroundLogo";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { useEffect, useState } from "react";

export function AppShell({ children }: { children: React.ReactNode }) {
    const { hasEntered } = useAudioStore();
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const isSuite = pathname?.startsWith("/suite");

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Avoid hydration mismatch

    // Bypass splash screen and consumer layout for Suite
    if (isSuite) {
        return (
            <>
                <CustomCursor />
                {children}
            </>
        );
    }

    return (
        <>
            <CustomCursor />
            <WelcomeScreen />

            {hasEntered && (
                <div className="animate-in fade-in duration-1000 relative">
                    <AmbientBackground />
                    <BackgroundLogo />
                    <Navbar />
                    <CommandPalette />
                    <div className="relative z-10 pt-24 pb-32">
                        {children}
                    </div>
                    <Footer />
                    <MusicPlayer />
                </div>
            )}
        </>
    );
}
