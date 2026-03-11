"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

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
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="landing-section h-screen w-full flex flex-col items-center justify-center relative overflow-hidden z-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-rose-950/10 to-black pointer-events-none" />

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Center Logo */}
      <div className="hero-logo relative w-64 h-64 md:w-96 md:h-96 z-10 flex flex-col items-center gap-8 -translate-y-16">
        <div className="relative w-full h-full animate-float landing-logo">
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
  );
}
