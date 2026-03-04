"use client";

import { useState } from "react";
import { useSubmission } from "@/hooks/useSubmission";
import { Button } from "@/components/ui/Button";

export default function SubmissionsPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        link: "",
        genre: "",
        message: ""
    });

    const { submit, isLoading, isSuccess, error } = useSubmission();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await submit(formData);
        if (isSuccess) {
            setFormData({ name: "", email: "", link: "", genre: "", message: "" });
        }
    };

    return (
        <div className="min-h-screen p-8 lg:p-20 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800/30 via-black to-black -z-10" />

            <header className="mb-12 text-center max-w-2xl">
                <h1 className="text-5xl font-bold tracking-tighter mb-6 text-white">DEMO SUBMISSIONS</h1>
                <p className="text-white/40 text-sm leading-relaxed">
                    Rose Pearl is always looking for the next sound. We listen to every track.
                    Please submit streaming links only (SoundCloud, Dropbox). Do not attach files.
                </p>
            </header>

            {!isSuccess ? (
                <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6 bg-neutral-900/50 p-8 rounded-2xl border border-white/5 backdrop-blur-sm shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Artist Name</label>
                            <input type="text" required className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-sm focus:border-rose-500 outline-none transition-colors" placeholder="Stage Name" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Genre / Style</label>
                            <select className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-sm focus:border-rose-500 outline-none transition-colors text-white/70">
                                <option>Select Genre...</option>
                                <option>R&B / Soul</option>
                                <option>Hip-Hop</option>
                                <option>Alternative</option>
                                <option>Electronic</option>
                                <option>Pop</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Email Address</label>
                        <input type="email" required className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-sm focus:border-rose-500 outline-none transition-colors" placeholder="mgmt@artist.com" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Demo Link (SoundCloud / Dropbox)</label>
                        <input type="url" required className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-sm focus:border-rose-500 outline-none transition-colors" placeholder="https://" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Pitch / Bio (Max 200 words)</label>
                        <textarea required className="w-full h-32 bg-black/60 border border-white/10 rounded-lg p-3 text-sm focus:border-rose-500 outline-none transition-colors resize-none" placeholder="Tell us your story..." />
                    </div>

                    <Button variant="primary" className="w-full mt-4" isLoading={isLoading}>Submit Demo</Button>
                    <p className="text-center text-[10px] text-white/20 mt-4">By submitting, you agree to our Terms of Submission.</p>
                    {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}
                </form>
            ) : (
                <div className="w-full max-w-xl bg-neutral-900/50 p-12 rounded-2xl border border-white/5 backdrop-blur-sm text-center">
                    <div className="inline-block p-4 rounded-full bg-rose-500/10 mb-6">
                        <div className="w-12 h-12 text-rose-500 flex items-center justify-center text-2xl">🎧</div>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Loud & Clear.</h2>
                    <p className="text-white/60 leading-relaxed mb-8">
                        Your demo has been logged in our A&R portal. <br />
                        I confirm that I own the rights to this music and agree to Rose Pearl&apos;s submission terms.
                    </p>
                    <Button variant="glass" onClick={() => window.location.href = '/'}>Back to Home</Button>
                </div>
            )}
        </div>
    );
}
