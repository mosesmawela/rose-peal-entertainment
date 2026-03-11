"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { TrackCard } from "@/components/modules/TrackCard";
import { newReleases } from "@/data/musicData";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Sparkles, Disc3, Radio, Headphones } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ReleasesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header animation
    gsap.from(".page-header", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Stagger reveal for track cards
    gsap.from(".track-card-wrapper", {
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".tracks-container",
        start: "top 80%",
      },
    });

    // CTA animation
    gsap.from(".cta-section", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".cta-section",
        start: "top 90%",
      },
    });

  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 p-8 lg:p-20 pt-32">
        {/* Header */}
        <header className="page-header mb-20 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Disc3 className="w-5 h-5 text-rose-500" />
              <span className="text-rose-400 font-body text-sm uppercase tracking-[0.3em]">Our Catalog</span>
            </div>
            <h1 className="font-display text-5xl lg:text-7xl tracking-tight text-white mb-2">
              CATALOG
            </h1>
            <p className="text-white/40 uppercase tracking-widest text-xs font-body">Browse all latest drops</p>
          </div>
          
          <div className="flex gap-6 text-sm font-body uppercase tracking-wider text-white/40">
            <button className="text-rose-400 hover:text-white transition-colors flex items-center gap-2">
              <Radio className="w-4 h-4" />
              All
            </button>
            <button className="hover:text-white transition-colors">Albums</button>
            <button className="hover:text-white transition-colors">EPs</button>
            <button className="hover:text-white transition-colors">Singles</button>
          </div>
        </header>

        {/* Track Cards */}
        <div className="tracks-container space-y-16 lg:space-y-24">
          {newReleases.map((track, index) => (
            <div key={track.id} className="track-card-wrapper">
              <TrackCard track={track} index={index} />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="cta-section mt-24 lg:mt-32 text-center relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          
          <div className="relative bg-black py-16 px-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 rounded-full mb-6">
              <Headphones className="w-4 h-4 text-rose-400" />
              <span className="text-rose-400 text-sm uppercase tracking-widest font-body">Got Music?</span>
            </div>
            
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">
              Submit Your Music
            </h2>
            <p className="text-white/50 max-w-md mx-auto mb-8 font-body">
              Have a track you think would fit our label? We&apos;re always looking for fresh talent and unique sounds.
            </p>
            
            <Link href="/submissions">
              <Button variant="primary" className="group">
                Submit Your Music
                <Sparkles className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer spacing */}
        <div className="h-20" />
      </div>
    </main>
  );
}
