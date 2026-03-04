
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal, Users, Music, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MockArtist } from "@/lib/mock/data";

interface ArtistCardProps {
    artist: MockArtist;
}

export function ArtistCard({ artist }: ArtistCardProps) {
    const isBreakout = artist.id === "a1"; // simulate visual variety

    return (
        <motion.div
            className="group relative h-[420px] w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.4, ease: "backOut" }}
        >
            {/* Vinyl Disc - slides out on hover */}
            <motion.div
                className="absolute top-4 left-4 right-4 aspect-square rounded-full bg-black shadow-xl flex items-center justify-center overflow-hidden z-0"
                initial={{ y: 0 }}
                whileHover={{ y: -60, rotate: 120 }}
                transition={{ duration: 0.8, ease: "circOut" }}
            >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-spin-slow" />
                {/* Vinyl Groves */}
                <div className="absolute inset-2 border-2 border-white/5 rounded-full" />
                <div className="absolute inset-4 border border-white/5 rounded-full" />
                <div className="absolute inset-8 border border-white/5 rounded-full" />

                {/* Label */}
                <div className="relative w-1/3 h-1/3 bg-rose-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-black rounded-full" />
                </div>
            </motion.div>

            {/* Main Card */}
            <div className="absolute inset-0 z-10 glass-panel rounded-2xl overflow-hidden flex flex-col p-5 border border-white/10 group-hover:border-rose-500/30 transition-colors duration-500">

                {/* Header / Actions */}
                <div className="flex items-start justify-between mb-4 relative z-20">
                    <div className="flex flex-col">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border ${artist.careerPhase === "Breakout"
                                ? "border-green-500/50 text-green-400 bg-green-500/10"
                                : "border-white/20 text-white/40"
                            }`}>
                            {artist.careerPhase}
                        </span>
                    </div>
                    <button className="text-white/40 hover:text-white transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>

                {/* Artist Image (Circle) */}
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/5 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                    <Image
                        src={artist.image}
                        alt={artist.name}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Text Info */}
                <div className="text-center mt-auto mb-6">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-rose-500 transition-colors">{artist.name}</h3>
                    <p className="text-white/40 text-sm">{artist.genre}</p>
                </div>

                {/* Quick Stats Row */}
                <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4">
                    <div className="text-center">
                        <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Streams</p>
                        <div className="flex items-center justify-center gap-1 text-white font-medium text-xs">
                            <Music className="w-3 h-3 text-rose-500" />
                            {artist.stats.streams}
                        </div>
                    </div>
                    <div className="text-center border-l border-white/5">
                        <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Followers</p>
                        <div className="flex items-center justify-center gap-1 text-white font-medium text-xs">
                            <Users className="w-3 h-3 text-rose-500" />
                            {artist.stats.followers}
                        </div>
                    </div>
                    <div className="text-center border-l border-white/5">
                        <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Growth</p>
                        <div className="flex items-center justify-center gap-1 text-green-400 font-medium text-xs">
                            <TrendingUp className="w-3 h-3" />
                            {artist.stats.engagement}
                        </div>
                    </div>
                </div>

                {/* Hover Overlay Button */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href={`/suite/artists/${artist.id}`}>
                        <Button variant="primary" className="scale-90 group-hover:scale-100 transition-transform font-bold tracking-widest">
                            VIEW PROFILE
                        </Button>
                    </Link>
                </div>

            </div>
        </motion.div>
    );
}
