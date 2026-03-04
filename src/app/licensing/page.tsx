"use client";

import { useMockSubmission } from "@/hooks/useMockSubmission";
import { Button } from "@/components/ui/Button";

const SYNC_CATEGORIES = [
    { name: "Film & Trailer", icon: "🎬" },
    { name: "TV & Series", icon: "📺" },
    { name: "Advertising", icon: "📢" },
    { name: "Gaming", icon: "🎮" },
];

export default function LicensingPage() {
    const { submit: browseCatalog, isLoading: isBrowsing } = useMockSubmission();
    const { submit: submitRequest, isLoading: isSubmitting, isSuccess, error } = useMockSubmission();

    const handleRequest = (e: React.FormEvent) => {
        e.preventDefault();
        submitRequest({});
    };

    return (
        <div className="min-h-screen p-8 lg:p-20 max-w-7xl mx-auto">
            <header className="mb-20">
                <h1 className="text-6xl font-bold tracking-tighter mb-4">LICENSING</h1>
                <p className="text-white/40 uppercase tracking-[0.3em] text-xs">Sync & Visual Media Rights</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Left: Pitch */}
                <div className="space-y-12">
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Cinematic Soundscapes</h2>
                        <p className="text-white/60 leading-relaxed">
                            Our catalog is built for visual storytelling. From high-energy anthems for sports campaigns to emotive scores for dramatic moments, Rose Pearl controls master and publishing rights for 95% of our roster, ensuring <strong>one-stop clearance</strong>.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {SYNC_CATEGORIES.map((cat, i) => (
                            <div key={i} className="bg-neutral-900 border border-white/5 p-6 rounded-lg text-center hover:bg-neutral-800 transition-colors cursor-default">
                                <div className="text-2xl mb-2">{cat.icon}</div>
                                <div className="font-bold text-sm tracking-wide">{cat.name}</div>
                            </div>
                        ))}
                    </div>

                    <Button
                        variant="glass"
                        className="w-full"
                        isLoading={isBrowsing}
                        onClick={() => browseCatalog({})}
                    >
                        Browse Catalog (Disco.ac)
                    </Button>
                </div>

                {/* Right: Request Form */}
                <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm border border-white/5 h-fit">
                    {!isSuccess ? (
                        <>
                            <h3 className="text-xl font-bold mb-6">Clearance Request</h3>
                            <form onSubmit={handleRequest} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="First Name" required className="bg-black/50 border border-white/10 rounded p-3 text-sm outline-none focus:border-rose-500" />
                                    <input type="text" placeholder="Last Name" required className="bg-black/50 border border-white/10 rounded p-3 text-sm outline-none focus:border-rose-500" />
                                </div>
                                <input type="text" placeholder="Project Name / Brand" required className="w-full bg-black/50 border border-white/10 rounded p-3 text-sm outline-none focus:border-rose-500" />
                                <input type="text" placeholder="Track(s) of Interest" className="w-full bg-black/50 border border-white/10 rounded p-3 text-sm outline-none focus:border-rose-500" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Budget Range" className="bg-black/50 border border-white/10 rounded p-3 text-sm outline-none focus:border-rose-500" />
                                    <input type="text" placeholder="Term / Territory" className="bg-black/50 border border-white/10 rounded p-3 text-sm outline-none focus:border-rose-500" />
                                </div>
                                <Button variant="primary" className="w-full mt-2" isLoading={isSubmitting}>Submit Request</Button>
                                {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-12 space-y-6">
                            <div className="text-4xl">📄</div>
                            <h3 className="text-2xl font-bold">Request Logged</h3>
                            <p className="text-white/60 text-sm">
                                Our licensing team will review the terms and get back to you with a quote within 48 hours.
                            </p>
                            <Button variant="glass" onClick={() => window.location.reload()}>New Request</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
