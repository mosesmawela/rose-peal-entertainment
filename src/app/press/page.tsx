"use client";

import { useMockSubmission } from "@/hooks/useMockSubmission";
import { Button } from "@/components/ui/Button";

const ASSETS = [
    { title: "Rose Pearl EPK", type: "PDF", size: "12MB" },
    { title: "Brand Guidelines", type: "PDF", size: "45MB" },
    { title: "Logos (Vector)", type: "ZIP", size: "5MB" },
    { title: "Artist Headshots", type: "ZIP", size: "128MB" },
];

export default function PressPage() {
    const { submit, isLoading, isSuccess } = useMockSubmission();

    return (
        <div className="min-h-screen p-8 lg:p-20 max-w-7xl mx-auto">
            <header className="mb-20">
                <h1 className="text-6xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-500">MEDIA HUB</h1>
                <p className="text-white/40 uppercase tracking-[0.3em] text-xs">Official Assets & Communications</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* Left: About & Stats */}
                <div className="lg:col-span-7 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">About Rose Pearl</h2>
                        <div className="space-y-6 text-white/70 leading-relaxed font-light">
                            <p>
                                Rose Pearl Entertainment is a global music company dedicated to artistic purity and sonic excellence. Founded in 2024, our mission is to bridge the gap between classic analog warmth and modern digital precision.
                            </p>
                            <p>
                                We represent a curated roster of boundary-pushing artists who redefine their genres. Our full-service operation includes a state-of-the-art recording facility in Los Angeles, in-house creative direction, and a global distribution network.
                            </p>
                        </div>
                    </section>

                    <section>
                        <div className="grid grid-cols-3 gap-8 border-y border-white/10 py-8">
                            <div>
                                <h3 className="text-3xl font-bold text-rose-500">12</h3>
                                <span className="text-xs uppercase tracking-widest text-white/40">Artists</span>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-rose-500">35M+</h3>
                                <span className="text-xs uppercase tracking-widest text-white/40">Streams</span>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-rose-500">4</h3>
                                <span className="text-xs uppercase tracking-widest text-white/40">Continents</span>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right: Downloads & Contact */}
                <div className="lg:col-span-5 space-y-12">
                    <section className="bg-neutral-900/50 rounded-xl p-8 border border-white/5 relative overflow-hidden">
                        <h2 className="text-lg font-bold mb-6 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 bg-rose-500 rounded-full" /> Downloads
                        </h2>
                        {isSuccess && (
                            <div className="absolute top-0 left-0 w-full h-1 bg-green-500 animate-[loading_2s_ease-in-out_infinite]" />
                        )}
                        <ul className="space-y-4">
                            {ASSETS.map((asset, i) => (
                                <li
                                    key={i}
                                    className="flex items-center justify-between p-4 bg-black/40 rounded-lg hover:bg-rose-500/10 transition-colors group cursor-pointer border border-white/5 hover:border-rose-500/30"
                                    onClick={() => submit({})}
                                >
                                    <div>
                                        <p className="font-bold text-sm">{asset.title}</p>
                                        <span className="text-[10px] text-white/40 font-mono">{asset.type} • {asset.size}</span>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        {isLoading ? "..." : "↓"}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold mb-6 uppercase tracking-widest">Media Contacts</h2>
                        <div className="space-y-4 text-sm">
                            <div>
                                <p className="font-bold text-white/90">Global PR</p>
                                <p className="text-white/50">press@rosepearl.com</p>
                            </div>
                            <div>
                                <p className="font-bold text-white/90">Licensing</p>
                                <p className="text-white/50">sync@rosepearl.com</p>
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </div>
    );
}
