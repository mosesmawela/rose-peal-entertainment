"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { VinylCard } from "@/components/skeuomorphic/VinylCard";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function FeaturedReleaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Featured release section - staggered reveal
    gsap.from(".featured-label", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".featured-section",
        start: "top 80%",
      },
    });

    gsap.from(".featured-title", {
      y: 60,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".featured-section",
        start: "top 75%",
      },
    });

    gsap.from(".featured-description", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".featured-section",
        start: "top 70%",
      },
    });

    gsap.from(".featured-vinyl", {
      scale: 0.8,
      opacity: 0,
      rotation: -10,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".featured-section",
        start: "top 60%",
      },
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="featured-section min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-32 p-8 lg:p-20 relative overflow-hidden z-10">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-rose-950/5 to-black pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-rose-500/5 to-transparent pointer-events-none" />

      {/* Decorative elements */}
      <div className="absolute top-1/3 left-10 w-2 h-32 bg-gradient-to-b from-rose-500/50 to-transparent" />
      <div className="absolute bottom-1/3 right-10 w-2 h-32 bg-gradient-to-t from-purple-500/50 to-transparent" />

      {/* Text Content */}
      <div className="featured-content z-10 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 max-w-xl">
        <div className="featured-label flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-rose-500" />
          <span className="text-rose-400 font-body text-sm uppercase tracking-[0.3em]">
            Featured Release
          </span>
        </div>

        <h1 className="featured-title font-display text-6xl lg:text-8xl tracking-tight text-white leading-none">
          BUYA <br />
          <span className="text-gradient-rose">EKHAYA</span>
        </h1>

        <p className="featured-description text-lg text-white/50 max-w-lg leading-relaxed">
          A masterpiece of modern sound design, blending nostalgic rhythms with futuristic textures.
        </p>

        <p className="featured-description text-white/40 text-base max-w-md leading-relaxed font-serif italic">
          &quot;The most anticipated release of the year.&quot;
        </p>

        <p className="featured-description text-white/60 text-sm lg:text-base max-w-md leading-relaxed">
          A heartfelt collaboration between <span className="text-rose-400">Mawelele</span> and <span className="text-rose-400">Naledi Aphiwe</span>,
          &quot;Buya Ekhaya&quot; is a soulful journey that speaks to coming home and finding peace.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <a href="https://open.spotify.com/album/3PPaPMwxGz7TECQkbvTzzM" target="_blank" rel="noopener noreferrer">
            <Button variant="primary" className="group">
              <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="white" />
              Stream on Spotify
            </Button>
          </a>
          <a href="https://ffm.to/kd30nnp" target="_blank" rel="noopener noreferrer">
            <Button variant="glass" className="group">
              Link Tree
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>
      </div>

      {/* Visual Content */}
      <div className="featured-vinyl relative z-10 flex flex-col items-center gap-8">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-600/20 blur-[120px] rounded-full pointer-events-none" />

        <VinylCard
          title="Buya Ekhaya"
          artist="Mawelele ft. Naledi Aphiwe"
          coverUrl="https://ik.imagekit.io/mosesmawela/Rose%20Pearl/buya-ekhaya-cover.jpg"
          className="w-72 h-72 lg:w-[450px] lg:h-[450px] animate-float"
        />

        {/* Spotify Embed */}
        <div className="w-full max-w-md rounded-xl overflow-hidden border border-white/10 shadow-lg">
          <iframe
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/album/3PPaPMwxGz7TECQkbvTzzM?utm_source=generator&theme=0"
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
