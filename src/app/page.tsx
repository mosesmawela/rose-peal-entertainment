"use client";

import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { VinylCard } from "@/components/skeuomorphic/VinylCard";
import { WelcomeScreen } from "@/components/modules/WelcomeScreen";
import { BrandCarousel } from "@/components/modules/BrandCarousel";
import { NewReleaseSlider } from "@/components/modules/NewReleaseSlider";
import { newReleases } from "@/data/musicData";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax effect for the landing logo
    gsap.to(".landing-logo", {
      y: 200,
      opacity: 0,
      scrollTrigger: {
        trigger: ".landing-section",
        start: "top top",
        end: "bottom center",
        scrub: 1,
      },
    });

    // Reveal new release section
    gsap.from(".release-content", {
      y: 100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".release-section",
        start: "top 80%",
        end: "center center",
        scrub: false,
      },
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen flex flex-col bg-black text-white">
      <WelcomeScreen />

      {/* 1. Full Screen Landing Page */}
      <section className="landing-section h-screen w-full flex flex-col items-center justify-center relative overflow-hidden z-20">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-rose-950/20 to-black pointer-events-none" />

        {/* Center Logo */}
        <div className="landing-logo relative w-64 h-64 md:w-96 md:h-96 z-10 flex flex-col items-center gap-8 -translate-y-16">
          <div className="relative w-full h-full animate-float">
            <Image
              src="https://ik.imagekit.io/mosesmawela/Rose%20Pearl/logo(icon).svg?updatedAt=1770182492360"
              alt="Rose Pearl Entertainment"
              fill
              className="object-contain drop-shadow-[0_0_50px_rgba(225,29,72,0.4)] invert"
              priority
            />
          </div>
          <p className="text-white/40 text-xs uppercase tracking-[0.5em] font-light animate-pulse">
            Scroll to Explore
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Brand Carousel */}
      <BrandCarousel />

      {/* 2. Featured New Release Section */}
      <section className="release-section min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 p-8 lg:p-20 relative overflow-hidden z-10 border-t border-white/5 bg-black/50 backdrop-blur-sm">

        {/* Text Content */}
        <div className="release-content z-10 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 max-w-xl">
          <span className="text-rose-500 font-mono text-xs uppercase tracking-widest border border-rose-500/20 px-3 py-1 rounded-full bg-rose-500/5 backdrop-blur-md">
            Featured Release
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-white">
            BUYA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">EKHAYA</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            &quot;A masterpiece of modern sound design, blending nostalgic rhythms with futuristic textures.&quot;
          </p>
          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            &quot;The most anticipated release of the year.&quot;
          </p>
          <p className="text-white/60 text-sm lg:text-base max-w-md leading-relaxed">
            A heartfelt collaboration between Mawelele and Naledi Aphiwe, &quot;Buya Ekhaya&quot; is a soulful journey that speaks to coming home and finding peace. Experience the rich textures of Afro-soul and Amapiano.
          </p>
          <div className="flex gap-4 pt-4">
            <a
              href="https://open.spotify.com/album/3PPaPMwxGz7TECQkbvTzzM"
              target="_blank"
              rel="noopener noreferrer"
              className="z-50"
            >
              <Button variant="primary">Stream on Spotify</Button>
            </a>
            <a
              href="https://ffm.to/kd30nnp"
              target="_blank"
              rel="noopener noreferrer"
              className="z-50"
            >
              <Button variant="glass">Link Tree</Button>
            </a>
          </div>
        </div>

        {/* Visual Content */}
        <div className="release-content z-10 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-600/20 blur-[120px] rounded-full pointer-events-none" />
          <VinylCard
            title="Buya Ekhaya"
            artist="Mawelele ft. Naledi Aphiwe"
            coverUrl="https://ik.imagekit.io/mosesmawela/Rose%20Pearl/buya-ekhaya-cover.jpg"
            className="w-72 h-72 lg:w-[450px] lg:h-[450px]"
          // In a real app, pass cover image URL here
          />
        </div>

      </section>

      {/* 3. New Releases Slider Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-8 lg:p-20 relative overflow-hidden z-10 border-t border-white/5 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-rose-950/10 to-black pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-rose-500 font-mono text-xs uppercase tracking-widest border border-rose-500/20 px-3 py-1 rounded-full bg-rose-500/5">
              Fresh Drops
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter text-white mt-4">
              New <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">Releases</span>
            </h2>
            <p className="text-white/60 mt-4 max-w-xl mx-auto">
              Explore the latest tracks from our artists. Click to preview and listen on your favorite platforms.
            </p>
          </div>

          <NewReleaseSlider tracks={newReleases} />

          <div className="text-center mt-12">
            <a
              href="/releases"
              className="inline-flex items-center gap-2 px-8 py-3 bg-rose-500 hover:bg-rose-400 text-white font-semibold rounded-lg transition-colors"
            >
              View Full Catalog
            </a>
          </div>
        </div>
      </section>

      <div className="w-full bg-rose-600/10 border-y border-rose-600/20 py-2 overflow-hidden flex whitespace-nowrap z-20">
        <div className="animate-marquee flex gap-12 text-xs font-mono uppercase tracking-widest text-rose-500/80 px-4">
          <span>Breaking News: Mawelele Drops &quot;Buya Ekhaya&quot;</span>
          <span>•</span>
          <span>New Release: Available on All Platforms</span>
          <span>•</span>
          <span>Rose Pearl welcomes you to the future of sound</span>
          <span>•</span>
          <span>Studio Sessions Open for Booking</span>
        </div>
      </div>

    </main>
  );
}
