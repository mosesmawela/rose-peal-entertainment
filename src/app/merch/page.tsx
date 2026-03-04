"use client";

import { Button } from "@/components/ui/Button";

const PRODUCTS = [
    { id: 1, name: "RP Signature Hoodie", price: "$85.00", image: "", tag: "Best Seller" },
    { id: 2, name: "Midnight Vinyl LP", price: "$45.00", image: "", tag: "Limited" },
    { id: 3, name: "Tour Cap", price: "$35.00", image: "", tag: "" },
    { id: 4, name: "Studio Sessions Tee", price: "$40.00", image: "", tag: "New" },
];

export default function MerchPage() {
    return (
        <div className="min-h-screen p-8 lg:p-20">
            <header className="mb-20 flex flex-col items-center text-center">
                <h1 className="text-6xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-rose-500 to-white">SHOP</h1>
                <p className="text-white/40 uppercase tracking-[0.3em] text-xs">Official Merchandise & Physicals</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {PRODUCTS.map((product) => (
                    <div key={product.id} className="group relative flex flex-col gap-4">
                        {/* Image Container */}
                        <div className="relative aspect-[3/4] bg-neutral-900 rounded-lg overflow-hidden border border-white/5 group-hover:border-rose-500/30 transition-colors">
                            <div className="absolute inset-0 bg-neutral-800" /> {/* Placeholder for image */}

                            {product.tag && (
                                <div className="absolute top-4 left-4 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm shadow-lg">
                                    {product.tag}
                                </div>
                            )}

                            {/* Quick Add Overlay */}
                            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-black/60 backdrop-blur-md border-t border-white/10">
                                <Button variant="primary" className="w-full !py-2 !text-[10px]">Add to Cart</Button>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-sm text-white/90">{product.name}</h3>
                                <p className="text-rose-500 text-xs font-mono mt-1">{product.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
