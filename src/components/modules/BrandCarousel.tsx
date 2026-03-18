"use client";

import { useState } from "react";
import Image from "next/image";

interface BrandInfo {
  name: string;
  domain: string;
  logoUrl: string;
}

const BRANDS: BrandInfo[] = [
  { name: "Hennessy", domain: "hennessy.com", logoUrl: "" },
  { name: "Score", domain: "drinkscore.co.za", logoUrl: "" },
  { name: "Niknaks", domain: "niknaks.co.za", logoUrl: "" },
  { name: "Samsung", domain: "samsung.com", logoUrl: "" },
  { name: "Puma", domain: "puma.com", logoUrl: "" },
  { name: "BAL", domain: "balenciaga.com", logoUrl: "" },
];

const CAROUSEL_BRANDS = [...BRANDS, ...BRANDS, ...BRANDS];

const getLogoUrl = (domain: string) => `https://logo.clearbit.com/${domain}`;

function BrandLogo({ brand }: { brand: BrandInfo }) {
  const [error, setError] = useState(false);
  const [logoUrl] = useState<string | null>(getLogoUrl(brand.domain));
  const loading = false;

  if (loading || !logoUrl || error) {
    return (
      <span className="text-2xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/20 uppercase tracking-tighter hover:text-rose-500 transition-colors cursor-default whitespace-nowrap">
        {brand.name}
      </span>
    );
  }

  return (
    <div className="relative h-8 lg:h-12 w-auto min-w-[80px] lg:min-w-[120px] flex items-center justify-center">
      <Image
        src={logoUrl}
        alt={`${brand.name} logo`}
        width={120}
        height={48}
        className="h-full w-auto object-contain filter brightness-0 invert opacity-60 hover:opacity-100 transition-all duration-300"
        onError={() => setError(true)}
        unoptimized // Required for external images
      />
    </div>
  );
}

export function BrandCarousel() {
  return (
    <div className="w-full py-12 overflow-hidden bg-brand-black/50 border-t border-b border-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Trusted Partners</p>
      </div>

      <div className="relative flex w-full">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Animated Track */}
        <div className="flex whitespace-nowrap animate-carousel hover:pause-animation">
          {CAROUSEL_BRANDS.map((brand, i) => (
            <div
              key={i}
              className="mx-8 lg:mx-16 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300"
            >
              <BrandLogo brand={brand} />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes carousel {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-carousel {
          animation: carousel 40s linear infinite;
        }
        .pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
