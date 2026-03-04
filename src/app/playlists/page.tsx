"use client";

import { VinylCard } from "@/components/skeuomorphic/VinylCard";

const PLAYLISTS = [
    { id: 1, title: "Rose Pearl Essentials", description: "The definitive sound of our label.", count: "24 Tracks" },
    { id: 2, title: "Late Night Studio", description: "Vibes from the 3AM sessions.", count: "18 Tracks" },
    { id: 3, title: "Heavy Rotation", description: "What our artists are listening to.", count: "50 Tracks" },
    { id: 4, title: "Demo Tape Archive", description: "Unreleased gems and B-sides.", count: "12 Tracks" },
];

export default function PlaylistsPage() {
    return (
        <div className="min-h-screen p-8 lg:p-20">
            <header className="mb-16">
                <h1 className="text-5xl font-bold tracking-tighter mb-4">CURATED</h1>
                <p className="text-white/40 uppercase tracking-[0.3em] text-xs">Hand-picked selections</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {PLAYLISTS.map((playlist) => (
                    <div key={playlist.id} className="group cursor-pointer">
                        {/* Cassette / Tape Style Card */}
                        <div className="bg-neutral-900 border border-white/10 rounded-xl p-6 aspect-video relative overflow-hidden group-hover:border-rose-500/50 transition-colors">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex justify-between items-start mb-8">
                                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                                </div>
                                <span className="font-mono text-[10px] text-white/20">TAPE_{playlist.id}</span>
                            </div>

                            <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-rose-500 transition-colors">{playlist.title}</h3>
                            <p className="text-white/40 text-xs">{playlist.description}</p>

                            <div className="absolute bottom-6 right-6 text-[10px] font-mono text-white/20 border border-white/10 px-2 py-0.5 rounded-full">
                                {playlist.count}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
