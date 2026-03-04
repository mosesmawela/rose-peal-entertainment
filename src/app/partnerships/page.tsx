"use client";

import { Button } from "@/components/ui/Button";
import { useSubmission } from "@/hooks/useSubmission";
import { BrandCarousel } from "@/components/modules/BrandCarousel";

export default function PartnershipsPage() {
    const { submit, isLoading, isSuccess, error } = useSubmission();

    const handleDownload = () => {
        // In a real scenario, this would trigger a file download
        // For now, we simulate a "request" to track interest via n8n if desired, or just simulate download
        submit({ type: 'brand_deck_download', timestamp: new Date().toISOString() });
    };

    return (
        <div className="min-h-screen p-8 lg:p-20 max-w-7xl mx-auto flex flex-col justify-center">
            <header className="mb-24 text-center">
                <h1 className="text-5xl lg:text-8xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-neutral-600">
                    CULTURE <br /> CAPITAL
                </h1>
                <p className="text-white/40 uppercase tracking-[0.3em] text-xs max-w-xl mx-auto leading-relaxed">
                    We connect global brands with the raw energy of underground music culture.
                    Authentic. Impactful. Uncompromised.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                {[
                    { title: "Sonic Branding", desc: "Custom audio identities and mnemonics composed by our platinum producers." },
                    { title: "Artist Activations", desc: "Access to our roster for campaigns, events, and strategic endorsements." },
                    { title: "Cultural Strategy", desc: "Consulting on how to authentically enter the contemporary music conversation." }
                ].map((item, i) => (
                    <div key={i} className="bg-neutral-900/50 p-8 rounded-2xl border border-white/5 hover:bg-neutral-900 transition-colors">
                        <h3 className="text-xl font-bold mb-4 text-rose-500">{item.title}</h3>
                        <p className="text-white/60 leading-relaxed text-sm">{item.desc}</p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col items-center justify-center space-y-8 bg-white/5 rounded-3xl p-12 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 blur-[100px] rounded-full pointer-events-none" />

                <h2 className="text-3xl font-bold">Partner With Us</h2>
                <div className="flex flex-col gap-4 w-full">
                    <Button
                        onClick={handleDownload}
                        disabled={isLoading}
                        className="w-full bg-white text-black hover:bg-white/90"
                    >
                        {isLoading ? "Downloading..." : "Download Brand Deck"}
                    </Button>
                    <Button variant="ghost" className="w-full border border-white/10 hover:bg-white/5">
                        Contact Partnerships
                    </Button>
                </div>
                {isSuccess && <p className="text-green-500 text-xs animate-pulse">Brand_Deck_2025.pdf saved to downloads.</p>}
            </div>
            {/* Partners Section */}
            <section className="mt-24 w-full">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                    Trusted By
                </h2>
                <BrandCarousel />
            </section>
        </div>
    );
}
