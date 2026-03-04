"use client";

import { Button } from "@/components/ui/Button";
import { Knob } from "@/components/skeuomorphic/Knob";
import { VinylCard } from "@/components/skeuomorphic/VinylCard";

export default function PlayerPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-black relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-rose-900/10 blur-[100px] animate-pulse-slow" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center max-w-6xl w-full">

                {/* Left: Visual */}
                <div className="flex flex-col items-center gap-8">
                    <VinylCard
                        title="Tracking..."
                        artist="System Active"
                        className="w-80 h-80 lg:w-[500px] lg:h-[500px]"
                    />
                </div>

                {/* Right: Controls module */}
                <div className="flex flex-col gap-12">
                    <div className="space-y-2">
                        <h1 className="text-4xl lg:text-6xl font-bold tracking-tighter">Current Session</h1>
                        <p className="text-rose-500 uppercase tracking-widest text-sm text-shadow-glow">Now Playing</p>
                    </div>

                    <div className="h-32 bg-neutral-900/50 rounded-lg border border-white/5 flex items-center justify-center relative overflow-hidden group">
                        {/* Waveform Visualization Placeholder */}
                        <div className="flex items-end gap-1 h-12">
                            {[...Array(40)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-1 bg-rose-500/50 rounded-full transition-all duration-300 group-hover:bg-rose-500"
                                    style={{
                                        height: `${Math.random() * 100}%`,
                                        animation: `bounce 1s infinite ${Math.random()}s`
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-8 items-center">
                        <div className="flex flex-col items-center gap-4">
                            <Knob label="Gain" value={65} />
                        </div>

                        <div className="flex gap-4 justify-center">
                            <Button variant="primary" className="!w-16 !h-16 !rounded-full text-xl flex items-center justify-center shadow-2xl scale-125">
                                ▶
                            </Button>
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <Knob label="Filter" value={20} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
