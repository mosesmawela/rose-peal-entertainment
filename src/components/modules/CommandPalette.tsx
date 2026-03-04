"use client";

import * as React from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAudioStore } from "@/lib/store/useAudioStore";

export const CommandPalette = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { isPlaying, play, pause } = useAudioStore();

    // Toggle with Cmd+K
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-[20vh] animate-in fade-in duration-200">
            <Command className="w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden text-white/90 font-sans">

                <div className="flex items-center px-4 border-b border-white/5">
                    <span className="text-white/40 mr-3">🔍</span>
                    <Command.Input
                        placeholder="Search artists, pages, or actions..."
                        className="w-full bg-transparent p-4 text-sm outline-none placeholder:text-white/20"
                    />
                </div>

                <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
                    <Command.Empty className="p-4 text-center text-xs text-white/40 uppercase tracking-widest">
                        No results found.
                    </Command.Empty>

                    <Command.Group heading="Pages" className="text-[10px] text-white/40 uppercase tracking-widest px-2 py-1 mb-1">
                        <Item onSelect={() => runCommand(() => router.push("/"))}>Home</Item>
                        <Item onSelect={() => runCommand(() => router.push("/releases"))}>Releases</Item>
                        <Item onSelect={() => runCommand(() => router.push("/artists"))}>Artists</Item>
                        <Item onSelect={() => runCommand(() => router.push("/events"))}>Events</Item>
                        <Item onSelect={() => runCommand(() => router.push("/merch"))}>Shop</Item>
                        <Item onSelect={() => runCommand(() => router.push("/studio"))}>The Lab (Studio)</Item>

                        <Item onSelect={() => runCommand(() => router.push("/staff"))}>Staff & Team</Item>
                        <Item onSelect={() => runCommand(() => router.push("/bookings"))}>Bookings</Item>
                        <Item onSelect={() => runCommand(() => router.push("/partnerships"))}>Partnerships</Item>
                        <Item onSelect={() => runCommand(() => router.push("/licensing"))}>Licensing</Item>
                        <Item onSelect={() => runCommand(() => router.push("/press"))}>Press Hub</Item>
                        <Item onSelect={() => runCommand(() => router.push("/distribution"))}>Distribution</Item>
                    </Command.Group>

                    <Command.Group heading="Actions" className="text-[10px] text-white/40 uppercase tracking-widest px-2 py-1 mb-1 mt-2">
                        <Item onSelect={() => runCommand(() => isPlaying ? pause() : play())}>
                            {isPlaying ? "Pause Music" : "Play Music"}
                        </Item>
                        <Item onSelect={() => runCommand(() => router.push("/contact"))}>
                            Contact Support
                        </Item>
                    </Command.Group>

                    <Command.Group heading="System" className="text-[10px] text-white/40 uppercase tracking-widest px-2 py-1 mb-1 mt-2">
                        <Item onSelect={() => runCommand(() => router.push("/admin"))}>Admin Panel</Item>
                    </Command.Group>

                </Command.List>
            </Command>
        </div>
    );
};

// Helper Item Component for styling
const Item = ({ children, onSelect }: { children: React.ReactNode, onSelect: () => void }) => {
    return (
        <Command.Item
            onSelect={onSelect}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/80 aria-selected:bg-rose-500/20 aria-selected:text-white cursor-pointer transition-colors my-0.5"
        >
            {children}
        </Command.Item>
    );
};
