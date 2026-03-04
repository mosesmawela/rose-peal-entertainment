"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = React.useRef(null);

    React.useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMenuOpen]);

    useGSAP(() => {
        if (isMenuOpen) {
            gsap.to(menuRef.current, { x: "0%", duration: 0.8, ease: "power3.inOut" });
            gsap.fromTo(".menu-item",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, delay: 0.3 }
            );
        } else {
            gsap.to(menuRef.current, { x: "100%", duration: 0.8, ease: "power3.inOut" });
        }
    }, { dependencies: [isMenuOpen] });

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 pointer-events-none">
                <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">

                    {/* Brand Logo */}
                    <Link href="/" className="group flex items-center gap-3 relative z-[60]">
                        <div className="relative h-10 w-auto transition-transform duration-500 group-hover:scale-105">
                            <img
                                src="https://ik.imagekit.io/mosesmawela/Rose%20Pearl/logo(icon).svg?updatedAt=1770182492360"
                                alt="Rose Pearl Icon"
                                className="h-full w-auto object-contain invert"
                            />
                        </div>
                        <div className="relative h-6 w-auto transition-transform duration-500 group-hover:scale-105">
                            <img
                                src="https://ik.imagekit.io/mosesmawela/Rose%20Pearl/logo2Itext).svg?updatedAt=1770182492522"
                                alt="Rose Pearl Text"
                                className="h-full w-auto object-contain invert"
                            />
                        </div>
                    </Link>

                    {/* Integrated Desktop Nav Bar */}
                    <div className="hidden md:flex items-center gap-6 glass-panel pl-8 pr-1.5 py-1.5 rounded-full shadow-2xl backdrop-blur-md bg-black/40 border border-white/5 relative z-[60]">
                        <Link href="/releases" className="text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-rose-500 transition-colors">Releases</Link>
                        <Link href="/artists" className="text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-rose-500 transition-colors">Artists</Link>
                        <Link href="/events" className="text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-rose-500 transition-colors">Events</Link>
                        <Link href="/merch" className="text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-rose-500 transition-colors">Shop</Link>

                        <div className="w-px h-4 bg-white/10 mx-2" />

                        {/* Integrated Menu Button */}
                        <Button
                            variant="primary"
                            className={`
                                !px-6 !py-2 !text-[10px] uppercase tracking-widest transition-all duration-300 rounded-full
                                ${!isMenuOpen ? "bg-rose-600 border-rose-500 shadow-[0_0_20px_rgba(225,29,72,0.6)] animate-pulse hover:animate-none hover:scale-105" : "bg-neutral-800 border-white/10"}
                            `}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? "Close" : "Menu"}
                        </Button>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-4 relative z-[60]">
                        <div className="hidden md:block scale-90">
                            <ThemeToggle />
                        </div>
                        {/* Mobile Menu Button (Hidden on Desktop) */}
                        <div className="md:hidden">
                            <Button
                                variant="primary"
                                className={`
                                    !px-6 !py-2 !text-[10px] uppercase tracking-widest transition-all duration-300
                                    ${!isMenuOpen ? "bg-rose-600 border-rose-500 shadow-[0_0_20px_rgba(225,29,72,0.6)] animate-pulse hover:animate-none" : "bg-neutral-800 border-white/10"}
                                `}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? "Close" : "Menu"}
                            </Button>
                        </div>
                    </div>

                </div>
            </nav>

            {/* FULL SCREEN MENU OVERLAY */}
            <div
                ref={menuRef}
                className="fixed inset-0 z-40 bg-black/95 vinyl-texture flex items-center justify-center translate-x-full overflow-y-auto"
            >
                <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-4 gap-12 p-12">

                    {/* Column 1: Music */}
                    <div className="space-y-6">
                        <h3 className="text-rose-500 text-xs uppercase tracking-[0.3em] font-bold border-b border-rose-500/20 pb-4 mb-4">Catalog</h3>
                        <div className="flex flex-col gap-4">
                            <Link href="/releases" onClick={() => setIsMenuOpen(false)} className="menu-item text-3xl font-bold hover:text-rose-500 transition-colors">Releases</Link>
                            <Link href="/artists" onClick={() => setIsMenuOpen(false)} className="menu-item text-3xl font-bold hover:text-rose-500 transition-colors">Artists</Link>
                            <Link href="/playlists" onClick={() => setIsMenuOpen(false)} className="menu-item text-3xl font-bold hover:text-rose-500 transition-colors opacity-50">Playlists</Link>
                        </div>
                    </div>

                    {/* Column 2: Experience */}
                    <div className="space-y-6">
                        <h3 className="text-rose-500 text-xs uppercase tracking-[0.3em] font-bold border-b border-rose-500/20 pb-4 mb-4">Experience</h3>
                        <div className="flex flex-col gap-4">
                            <Link href="/events" onClick={() => setIsMenuOpen(false)} className="menu-item text-3xl font-bold hover:text-rose-500 transition-colors">Events</Link>
                            <Link href="/studio" onClick={() => setIsMenuOpen(false)} className="menu-item text-3xl font-bold hover:text-rose-500 transition-colors">Studio</Link>
                            <Link href="/merch" onClick={() => setIsMenuOpen(false)} className="menu-item text-3xl font-bold hover:text-rose-500 transition-colors">Merch Store</Link>
                        </div>
                    </div>

                    {/* Column 3: Business */}
                    <div className="space-y-6">
                        <h3 className="text-rose-500 text-xs uppercase tracking-[0.3em] font-bold border-b border-rose-500/20 pb-4 mb-4">Business</h3>
                        <div className="flex flex-col gap-2">
                            <Link href="/submissions" onClick={() => setIsMenuOpen(false)} className="menu-item text-xl text-white/60 hover:text-white transition-colors">Demo Submissions</Link>
                            <Link href="/licensing" onClick={() => setIsMenuOpen(false)} className="menu-item text-xl text-white/60 hover:text-white transition-colors">Licensing & Sync</Link>
                            <Link href="/distribution" onClick={() => setIsMenuOpen(false)} className="menu-item text-xl text-white/60 hover:text-white transition-colors">Distribution</Link>
                            <Link href="/partnerships" onClick={() => setIsMenuOpen(false)} className="menu-item text-xl text-white/60 hover:text-white transition-colors">Brand Partnerships</Link>
                        </div>
                    </div>

                    {/* Column 4: Company */}
                    <div className="space-y-6">
                        <h3 className="text-rose-500 text-xs uppercase tracking-[0.3em] font-bold border-b border-rose-500/20 pb-4 mb-4">Company</h3>
                        <div className="flex flex-col gap-2">
                            <Link href="/staff" onClick={() => setIsMenuOpen(false)} className="menu-item text-xl text-white/60 hover:text-white transition-colors">Staff & Team</Link>
                            <Link href="/press" onClick={() => setIsMenuOpen(false)} className="menu-item text-xl text-white/60 hover:text-white transition-colors">Press Hub</Link>
                            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="menu-item text-xl text-white/60 hover:text-white transition-colors">Contact Us</Link>
                            <Link href="/bookings" onClick={() => setIsMenuOpen(false)} className="menu-item text-xl text-white/60 hover:text-white transition-colors">Bookings</Link>
                        </div>

                        <div className="pt-8">
                            <Link href="/suite" onClick={() => setIsMenuOpen(false)} className="menu-item text-xs uppercase tracking-widest text-rose-500 hover:underline">Rose Suite (God Mode)</Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};
