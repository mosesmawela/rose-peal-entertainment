"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { VinylCard } from "@/components/skeuomorphic/VinylCard";
import { BrandCarousel } from "@/components/modules/BrandCarousel";
import { newReleases } from "@/data/musicData";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    // Hero section animations
    const heroTl = gsap.timeline();
    
    heroTl
      .from(".hero-logo", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      })
      .from(".hero-subtitle", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6")
      .from(".hero-scroll", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4");

    // Parallax effect for the landing logo
    gsap.to(".landing-logo", {
      y: 300,
      opacity: 0,
      scrollTrigger: {
        trigger: ".landing-section",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

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

    // Marquee animation
    gsap.to(".marquee-content", {
      x: "-50%",
      ease: "none",
      duration: 30,
      repeat: -1,
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
    <main ref={containerRef} className="min-h-screen flex flex-col bg-black text-white overflow-x-hidden">
      {/* 1. Full Screen Landing Page */}
      <section className="landing-section h-screen w-full flex flex-col items-center justify-center relative overflow-hidden z-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-rose-950/10 to-black pointer-events-none" />
        
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        
        {/* Center Logo */}
        <div className="hero-logo relative w-64 h-64 md:w-96 md:h-96 z-10 flex flex-col items-center gap-8 -translate-y-16">
          <div className="relative w-full h-full animate-float">
            <Image
              src="https://ik.imagekit.io/mosesmawela/Rose%20Pearl/logo(icon).svg?updatedAt=1770182492360"
              alt="Rose Pearl Entertainment"
              fill
              className="object-contain drop-shadow-[0_0_80px_rgba(225,29,72,0.5)] invert"
              priority
            />
          </div>
        </div>

        <p className="hero-subtitle text-white/30 text-sm md:text-base uppercase tracking-[0.6em] font-light">
          Premium Music Experience
        </p>

        {/* Scroll Indicator */}
        <div className="hero-scroll absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* Brand Carousel */}
      <BrandCarousel />

      {/* 2. Featured New Release Section */}
      <section className="featured-section min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-32 p-8 lg:p-20 relative overflow-hidden z-10">
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
            "The most anticipated release of the year."
          </p>

          <p className="featured-description text-white/60 text-sm lg:text-base max-w-md leading-relaxed">
            A heartfelt collaboration between <span className="text-rose-400">Mawelele</span> and <span className="text-rose-400">Naledi Aphiwe</span>, 
            "Buya Ekhaya" is a soulful journey that speaks to coming home and finding peace.
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

      {/* 3. New Releases Carousel Section */}
      <section 
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

      {/* Marquee */}
      <div className="w-full bg-rose-600/10 border-y border-rose-600/20 py-4 overflow-hidden flex whitespace-nowrap z-20">
        <div className="marquee-content flex gap-12 text-sm font-body uppercase tracking-widest text-rose-400/80 px-4">
          <span>Breaking News: Mawelele Drops "Buya Ekhaya"</span>
          <span>•</span>
          <span>New Release: Available on All Platforms</span>
          <span>•</span>
          <span>Rose Pearl welcomes you to the future of sound</span>
          <span>•</span>
          <span>Studio Sessions Open for Booking</span>
          <span>•</span>
          <span>Breaking News: Mawelele Drops "Buya Ekhaya"</span>
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
