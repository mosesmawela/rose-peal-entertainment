"use client";

import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const TEAM = [
    { name: "Marcus 'Rose' Thorn", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", bio: "Visionary producer with 15 years in analog synthesis." },
    { name: "Sarah Jenkins", role: "Head of A&R", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80", bio: "Discovered 3 platinum artists in the last decade." },
    { name: "David Choi", role: "Chief Technology Officer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80", bio: "Building the future of music distribution infrastructure." },
    { name: "Elena Rodriguez", role: "Global Marketing", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80", bio: "Expert in brand partnerships and digital storytelling." },
    { name: "Jameson West", role: "Studio Manager", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80", bio: "Ensuring every session at Rose Pearl Studios is legendary." },
    { name: "Aria Chen", role: "Creative Director", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80", bio: "Curating the visual language of the Rose Pearl universe." },
];

export default function StaffPage() {
    return (
        <div className="min-h-screen p-8 lg:p-20 max-w-7xl mx-auto">
            <header className="mb-20 text-center">
                <h1 className="text-6xl font-bold tracking-tighter mb-6 text-white">THE ARCHITECTS</h1>
                <p className="text-white/40 uppercase tracking-[0.3em] text-xs max-w-xl mx-auto leading-relaxed">
                    The minds building the bridge between analog soul and digital future.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {TEAM.map((member, i) => (
                    <div key={i} className="group relative bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden hover:border-rose-500/50 transition-colors duration-500">
                        {/* Image */}
                        <div className="h-80 relative overflow-hidden">
                            <Image
                                src={member.img}
                                alt={member.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                        </div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                            <p className="text-rose-500 text-[10px] uppercase tracking-widest font-bold mb-3">{member.role}</p>
                            <p className="text-white/60 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                {member.bio}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-24 text-center">
                <h2 className="text-2xl font-bold mb-6">Join the Team</h2>
                <Button variant="glass">View Open Positions</Button>
            </div>
        </div>
    );
}
