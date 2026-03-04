"use client";

import { Button } from "@/components/ui/Button";
import { Knob } from "@/components/skeuomorphic/Knob";
import { useAudioStore } from "@/lib/store/useAudioStore";
import { useSoundEffect } from "@/hooks/useSoundEffect";
import { useState } from "react";
import { Minimize2, Maximize2 } from "lucide-react";
import Image from "next/image";

export const MusicPlayer = () => {
    const { isPlaying, currentTrack, play, pause, volume, setVolume, nextTrack, prevTrack } = useAudioStore();
    const [isMinimized, setIsMinimized] = useState(true);
    const [isHidden, setIsHidden] = useState(false);
    const { play: playSound } = useSoundEffect();

    const displayTrack = currentTrack; // Store now always has a default
    const videoUrl = displayTrack?.videoUrl;

    const togglePlay = () => {
        playSound('toggle');
        if (isPlaying) pause();
        else play();
    };

    const handleNext = () => {
        playSound('click');
        nextTrack();
    };

    const handlePrev = () => {
        playSound('click');
        prevTrack();
    };

    if (!displayTrack) return null;

    if (isHidden) {
        return (
            <button
                onClick={() => setIsHidden(false)}
                className="fixed bottom-4 right-4 z-50 bg-brand-rose text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
                aria-label="Show Player"
            >
                🎵
            </button>
        );
    }

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 px-4 pb-4 pointer-events-none transition-all duration-500 ease-out">
            <div className={`
                max-w-5xl mx-auto glass-panel rounded-2xl shadow-2xl 
                pointer-events-auto border border-white/10 bg-background/80 backdrop-blur-xl 
                transition-all duration-500 ease-in-out relative
                ${isMinimized ? 'w-[300px] p-2 flex gap-3' : 'w-full p-4 flex items-center justify-between gap-6'}
            `}>

                {/* Minimize Toggle (Absolute) */}
                {/* Minimize Toggle (Absolute) */}
                <div className="absolute -top-10 right-0 flex gap-1">
                    <button
                        onClick={() => { playSound('click'); setIsHidden(true); }}
                        className="bg-black/60 backdrop-blur-md p-2 rounded-t-lg border-t border-l border-r border-white/10 text-white/50 hover:text-white transition-colors"
                        title="Hide Player"
                    >
                        ✕
                    </button>
                    <button
                        onClick={() => { playSound('click'); setIsMinimized(!isMinimized); }}
                        className="bg-black/60 backdrop-blur-md p-2 rounded-t-lg border-t border-l border-r border-white/10 text-white/50 hover:text-white transition-colors"
                    >
                        {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                    </button>
                </div>

                {/* Track Info */}
                <div className={`flex items-center gap-4 ${isMinimized ? 'flex-1 overflow-hidden' : 'w-1/4'}`}>
                    <div className={`
                        relative bg-neutral-800 rounded-sm shadow-inner vinyl-texture overflow-hidden
                        ${isMinimized ? 'w-10 h-10' : 'w-12 h-12'}
                        ${isPlaying && !videoUrl ? 'animate-spin-slow' : ''} 
                    `}>
                        {videoUrl ? (
                            <video
                                src={videoUrl}
                                className="w-full h-full object-cover opacity-90"
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        ) : (
                            displayTrack.coverUrl && <Image src={displayTrack.coverUrl} alt="Cover" fill className="object-cover opacity-80" />
                        )}
                    </div>

                    <div className="flex flex-col overflow-hidden">
                        <span className={`font-bold text-foreground truncate ${isMinimized ? 'text-[10px]' : 'text-xs'}`}>
                            {displayTrack.title}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground truncate">
                            {displayTrack.artist}
                        </span>
                    </div>
                </div>

                {/* Controls (Hidden when minimized) */}
                {!isMinimized && (
                    <div className="flex items-center gap-4 flex-1 justify-center animate-in fade-in duration-500">
                        <Button variant="glass" className="!p-2 shadow-none hover:bg-transparent text-white/50 hover:text-white" onClick={handlePrev}>
                            ⏮
                        </Button>
                        <Button
                            variant="primary"
                            className="!w-12 !h-12 !rounded-full !p-0 flex items-center justify-center shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:scale-105 active:scale-95 transition-transform"
                            onClick={togglePlay}
                        >
                            {isPlaying ? "❚❚" : "▶"}
                        </Button>
                        <Button variant="glass" className="!p-2 shadow-none hover:bg-transparent text-white/50 hover:text-white" onClick={handleNext}>
                            ⏭
                        </Button>
                    </div>
                )}

                {/* Minimized Controls */}
                {isMinimized && (
                    <div className="flex items-center gap-2">
                        <button onClick={handleNext} className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white/50 hover:text-white">
                            ⏭
                        </button>
                        <button onClick={togglePlay} className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                            {isPlaying ? "❚❚" : "▶"}
                        </button>
                    </div>
                )}

                {/* Volume / Extra (Hidden when minimized) */}
                {!isMinimized && (
                    <div className="w-1/4 flex justify-end items-center gap-4">
                        {/* Mini Volume Knob */}
                        <div className="scale-75">
                            <Knob value={volume} min={0} max={100} label="VOL" onChange={setVolume} />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};
