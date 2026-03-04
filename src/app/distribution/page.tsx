"use client";

import { useMockSubmission } from "@/hooks/useMockSubmission";
import { Button } from "@/components/ui/Button";

const FEATURES = [
    { title: "Global Reach", desc: "Delivery to Spotify, Apple Music, TikTok, and 150+ DSPs." },
    { title: "Transparent Splits", desc: "Keep 100% of your masters. Friendly revenue share models." },
    { title: "Playlist Pitching", desc: "Direct access to editorial teams at major platforms." },
    { title: "Advanced Analytics", desc: "Real-time data on streams, audience, and earnings." },
];

export default function DistributionPage() {
    const { submit, isLoading, isSuccess } = useMockSubmission();

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <div className="h-[70vh] flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-neutral-900 to-black relative overflow-hidden">
                {/* Bg glow */}
                <div className="absolute inset-0 bg-gradient-radial from-rose-900/20 to-transparent pointer-events-none" />

                <span className="text-rose-500 uppercase tracking-widest text-xs font-bold mb-4 border border-rose-500/20 px-3 py-1 rounded-full z-10">
                    Rose Pearl Distribution
                </span>
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-6 max-w-4xl z-10">
                    YOUR MUSIC. <br /> EVERYWHERE.
                </h1>

                {!isSuccess ? (
                    <>
                        <p className="text-white/40 max-w-2xl text-lg mb-10 z-10">
                            We provide major label infrastructure for independent artists. Keep your rights, grow your audience, and get paid.
                        </p>
                        <div className="flex gap-4 z-10">
                            <Button
                                variant="primary"
                                className="!px-8 !py-4 text-sm"
                                isLoading={isLoading}
                                onClick={() => submit({})}
                            >
                                Apply for Distribution
                            </Button>
                            <Button variant="glass" className="!px-8 !py-4 text-sm">View Pricing</Button>
                        </div>
                    </>
                ) : (
                    <div className="bg-black/50 border border-white/5 p-8 rounded-2xl backdrop-blur-md z-10 animate-in zoom-in fade-in duration-300">
                        <h3 className="text-2xl font-bold text-white mb-2">Application Started</h3>
                        <p className="text-white/60 mb-6">Please check your email to complete the onboarding process.</p>
                        <Button variant="glass" onClick={() => window.location.reload()}>Close</Button>
                    </div>
                )}
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-8 py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {FEATURES.map((feat, i) => (
                    <div key={i} className="space-y-4">
                        <h3 className="text-xl font-bold border-l-2 border-rose-500 pl-4">{feat.title}</h3>
                        <p className="text-white/50 text-sm leading-relaxed pl-4">{feat.desc}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}
