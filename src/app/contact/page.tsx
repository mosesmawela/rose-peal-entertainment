"use client";

import { useMockSubmission } from "@/hooks/useMockSubmission";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
    const { submit, isLoading, isSuccess, error } = useMockSubmission();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit({});
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 lg:h-screen">

            {/* Left: Text */}
            <div className="p-12 lg:p-24 flex flex-col justify-between border-r border-white/5 relative bg-neutral-900/20">
                <div className="space-y-4 relative z-10">
                    <h1 className="text-5xl font-bold tracking-tighter">GET IN TOUCH</h1>
                    <p className="text-white/40 text-sm max-w-md">
                        For press inquiries, booking requests, or partnership opportunities.
                    </p>
                </div>

                <div className="space-y-8 mt-12 lg:mt-0 relative z-10">
                    <div>
                        <h3 className="text-xs uppercase tracking-widest text-rose-500 mb-2">Management</h3>
                        <p className="text-xl font-bold">mgmt@rosepearl.com</p>
                    </div>
                    <div>
                        <h3 className="text-xs uppercase tracking-widest text-rose-500 mb-2">Studio Booking</h3>
                        <p className="text-xl font-bold">studio@rosepearl.com</p>
                    </div>
                    <div>
                        <h3 className="text-xs uppercase tracking-widest text-rose-500 mb-2">Location</h3>
                        <p className="text-white/80">
                            8840 Wilshire Blvd<br />
                            Beverly Hills, CA 90211
                        </p>
                    </div>
                </div>

                {/* Decoration */}
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-900/10 blur-[100px] pointer-events-none" />
            </div>

            {/* Right: Form */}
            <div className="p-12 lg:p-24 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                {!isSuccess ? (
                    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-white/40 ml-1">Full Name</label>
                            <input type="text" required className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-rose-500 transition-colors" placeholder="Enter your name" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-white/40 ml-1">Email Address</label>
                            <input type="email" required className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-rose-500 transition-colors" placeholder="Enter your email" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-white/40 ml-1">Message</label>
                            <textarea required className="w-full h-32 bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-rose-500 transition-colors resize-none" placeholder="How can we help?" />
                        </div>

                        <Button variant="primary" className="w-full" isLoading={isLoading}>Send Message</Button>
                        {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                    </form>
                ) : (
                    <div className="text-center space-y-4 animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center mx-auto text-4xl shadow-[0_0_30px_rgba(225,29,72,0.4)]">✓</div>
                        <h2 className="text-3xl font-bold">Message Sent</h2>
                        <p className="text-white/50 max-w-xs mx-auto">Thank you for reaching out. A member of our team will get back to you within 24 hours.</p>
                        <Button variant="glass" onClick={() => window.location.reload()}>Send Another</Button>
                    </div>
                )}
            </div>

        </div>
    );
}
