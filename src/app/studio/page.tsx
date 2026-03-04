import { Button } from "@/components/ui/Button";

const GEAR = [
    "SSL Duality Console", "Neumann U87 Microphones", "Genelec 8351B Monitors", "Moog One Synthesizer"
];

export default function StudioPage() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <div className="h-[60vh] relative flex items-center justify-center border-b border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-neutral-900" /> {/* Placeholder for Studio Photo */}
                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 text-center space-y-6">
                    <span className="text-rose-500 text-xs uppercase tracking-widest border border-rose-500/20 px-4 py-1 rounded-full">
                        Los Angeles, CA
                    </span>
                    <h1 className="text-7xl font-bold tracking-tighter text-white">THE LAB</h1>
                    <p className="text-white/60 max-w-lg mx-auto">
                        A state-of-the-art sonic playground designed for the world's most exacting artists.
                    </p>
                    <Button variant="glass" className="mt-8">Request Booking</Button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left: Info */}
                <div className="p-12 lg:p-24 space-y-12">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">World Class Engineering</h2>
                        <p className="text-white/40 leading-relaxed text-sm">
                            Our main room features perfect acoustic treatment and the legendary warmth of analog outboard gear combined with modern digital precision. Whether you are tracking a full orchestra or finishing a vocal chain, The Lab is optimized for purity.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xs uppercase tracking-widest text-rose-500 mb-6 font-bold">Selected Gear</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {GEAR.map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-white/80 border-b border-white/5 pb-2">
                                    <div className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right: Gallery Grid Placeholder */}
                <div className="bg-neutral-950 p-1 border-l border-white/5 grid grid-cols-2 grid-rows-2">
                    <div className="bg-neutral-900 m-1 rounded-sm opacity-50 hover:opacity-100 transition-opacity" />
                    <div className="bg-neutral-900 m-1 rounded-sm opacity-50 hover:opacity-100 transition-opacity" />
                    <div className="bg-neutral-900 m-1 rounded-sm opacity-50 hover:opacity-100 transition-opacity col-span-2" />
                </div>
            </div>
        </div>
    );
}
