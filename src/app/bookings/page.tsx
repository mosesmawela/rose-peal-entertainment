"use client";

import { useMockSubmission } from "@/hooks/useMockSubmission";
import { Button } from "@/components/ui/Button";

export default function BookingsPage() {
    const { submit, isLoading, isSuccess, error } = useMockSubmission();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit({});
    };

    return (
        <div className="min-h-screen p-8 lg:p-20 max-w-7xl mx-auto">
            <header className="mb-16">
                <h1 className="text-6xl font-bold tracking-tighter mb-4">STUDIO A</h1>
                <p className="text-white/40 uppercase tracking-[0.3em] text-xs">Beverly Hills, CA • Analog Warmth, Digital Precision</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Visuals & Specs */}
                <div className="space-y-12">
                    <div className="h-64 w-full bg-neutral-900 rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden relative group">
                        {/* Placeholder for Studio Image */}
                        <div className="absolute inset-0 bg-neutral-800 animate-pulse group-hover:animate-none transition-colors" />
                        <span className="relative z-10 text-white/20 uppercase tracking-widest text-xs">Studio Image Placeholder</span>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-rose-500 text-xs uppercase tracking-widest font-bold mb-4 border-b border-rose-500/20 pb-2">Console</h3>
                            <ul className="text-sm text-white/70 space-y-1">
                                <li>SSL 4000 G+ Series</li>
                                <li>Neve 1073 Preamps (x8)</li>
                                <li>API 512c (x4)</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-rose-500 text-xs uppercase tracking-widest font-bold mb-4 border-b border-rose-500/20 pb-2">Monitoring</h3>
                            <ul className="text-sm text-white/70 space-y-1">
                                <li>Augspurger Duo 15</li>
                                <li>Yamaha NS-10M</li>
                                <li>ATC SCM25A</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Booking Form (Live) */}
                <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm border border-white/5 h-fit">
                    {!isSuccess ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h3 className="text-xl font-bold mb-6">Request Session</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase text-white/40 font-bold">Date</label>
                                    <input type="date" required className="w-full bg-black/50 border border-white/10 rounded p-3 text-sm outline-none focus:border-rose-500 text-white/70" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase text-white/40 font-bold">Duration</label>
                                    <select className="w-full bg-black/50 border border-white/10 rounded p-3 text-sm outline-none focus:border-rose-500 text-white/70">
                                        <option>4 Hours</option>
                                        <option>8 Hours (Day Rate)</option>
                                        <option>12 Hours (Lockout)</option>
                                    </select>
                                </div>
                            </div>

                            <input type="text" placeholder="Artist / Label Name" required className="w-full bg-black/50 border border-white/10 rounded p-3 text-sm outline-none focus:border-rose-500" />
                            <input type="email" placeholder="Contact Email" required className="w-full bg-black/50 border border-white/10 rounded p-3 text-sm outline-none focus:border-rose-500" />
                            <textarea placeholder="Tell us about the project..." className="w-full bg-black/50 border border-white/10 rounded p-3 text-sm outline-none focus:border-rose-500 resize-none h-24" />

                            <div className="pt-4">
                                <Button variant="primary" className="w-full" isLoading={isLoading}>
                                    Check Availability
                                </Button>
                            </div>
                            {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
                        </form>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                            <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-3xl">✓</div>
                            <h3 className="text-2xl font-bold">Request Received</h3>
                            <p className="text-white/60 text-sm max-w-xs">
                                Our studio manager will check the calendar and send a confirmation to your email shortly.
                            </p>
                            <Button variant="glass" onClick={() => window.location.reload()}>Book Another</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
