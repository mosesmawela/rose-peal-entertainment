"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { newReleases } from "@/data/musicData";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function NewReleasesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    // New releases section
    gsap.from(".releases-header", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".releases-section",
        start: "top 80%",
      },
    });

    // Animate each track card in slider
    gsap.from(".slider-track", {
      x: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".releases-section",
        start: "top 70%",
      },
    });
  }, { scope: containerRef });

  // Auto-scroll carousel with pause on hover
  useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const scrollContent = carousel.querySelector('.carousel-content') as HTMLElement;

    if (!scrollContent) return;

    const scrollWidth = scrollContent.scrollWidth / 2;
    let currentPosition = 0;

    const animate = () => {
      if (isPaused) {
        animationRef.current = gsap.to(carousel, {
          scrollLeft: currentPosition,
          duration: 0.5,
          ease: "power2.out",
          overwrite: true,
        });
        return;
      }

      currentPosition = carousel.scrollLeft;
      const targetPosition = currentPosition + 1;

      if (targetPosition >= scrollWidth) {
        carousel.scrollLeft = 0;
      } else {
        carousel.scrollLeft = targetPosition;
      }

      animationRef.current = gsap.delayedCall(isPaused ? 0.1 : 0.02, animate);
    };

    animationRef.current = gsap.delayedCall(0.05, animate);

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [isPaused]);

  return (
    <section
      ref={containerRef}
      className="releases-section min-h-screen flex flex-col items-center justify-center p-8 lg:p-20 relative overflow-hidden z-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/5 to-black pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="releases-header relative z-10 w-full max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-rose-400 font-body text-sm uppercase tracking-[0.3em] mb-4">
            <Sparkles className="w-4 h-4" />
            Fresh Drops
          </span>
          <h2 className="font-display text-5xl lg:text-7xl tracking-tight text-white mb-4">
            NEW <span className="text-gradient-rose">RELEASES</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-lg font-body">
            Explore the latest tracks from our artists. Click to preview and listen on your favorite platforms.
          </p>
        </div>

        {/* Auto-scrolling carousel */}
        <div
          ref={carouselRef}
          className="relative overflow-hidden"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
        >
          <div className="carousel-content flex gap-6 w-max">
            {/* First set of tracks */}
            {newReleases.map((track, index) => (
              <Link
                key={`track-1-${track.id}`}
                href="/releases"
                className="slider-track flex-shrink-0 w-72 group"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
                  {track.coverImage ? (
                    <Image
                      src={track.coverImage}
                      alt={`${track.title} cover`}
                      fill
                      sizes="288px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-rose-900 to-black flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center">
                        <Play className="w-8 h-8 text-rose-500 ml-1" fill="currentColor" />
                      </div>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Play button on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-16 h-16 rounded-full bg-rose-500 flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform">
                      <Play className="w-7 h-7 text-white ml-1" fill="white" />
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-md flex items-center gap-1">
                    <span className="text-xs text-white/70 font-mono">{track.duration}</span>
                  </div>

                  {/* Track number */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-xs font-mono text-white/70">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-white font-bold text-lg truncate group-hover:text-rose-400 transition-colors font-body">
                    {track.title}
                  </h3>
                  <p className="text-white/50 text-sm truncate font-body">
                    {track.artist}
                    {track.featuredArtists && (
                      <span className="text-white/30"> ft. {track.featuredArtists}</span>
                    )}
                  </p>
                  {track.genre && (
                    <span className="inline-block px-2 py-0.5 bg-rose-500/10 text-rose-400 text-xs rounded-full font-body">
                      {track.genre}
                    </span>
                  )}
                </div>
              </Link>
            ))}

            {/* Duplicate set for seamless loop */}
            {newReleases.map((track, index) => (
              <Link
                key={`track-2-${track.id}`}
                href="/releases"
                className="slider-track flex-shrink-0 w-72 group"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
                  {track.coverImage ? (
                    <Image
                      src={track.coverImage}
                      alt={`${track.title} cover`}
                      fill
                      sizes="288px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-rose-900 to-black flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center">
                        <Play className="w-8 h-8 text-rose-500 ml-1" fill="currentColor" />
                      </div>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Play button on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-16 h-16 rounded-full bg-rose-500 flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform">
                      <Play className="w-7 h-7 text-white ml-1" fill="white" />
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-md flex items-center gap-1">
                    <span className="text-xs text-white/70 font-mono">{track.duration}</span>
                  </div>

                  {/* Track number */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-xs font-mono text-white/70">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-white font-bold text-lg truncate group-hover:text-rose-400 transition-colors font-body">
                    {track.title}
                  </h3>
                  <p className="text-white/50 text-sm truncate font-body">
                    {track.artist}
                    {track.featuredArtists && (
                      <span className="text-white/30"> ft. {track.featuredArtists}</span>
                    )}
                  </p>
                  {track.genre && (
                    <span className="inline-block px-2 py-0.5 bg-rose-500/10 text-rose-400 text-xs rounded-full font-body">
                      {track.genre}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <Link
            href="/releases"
            className="inline-flex items-center gap-2 px-8 py-4 bg-rose-500 hover:bg-rose-400 text-white font-semibold rounded-lg transition-all hover:scale-105 group"
          >
            View Full Catalog
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
