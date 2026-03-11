"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Marquee animation
    gsap.to(".marquee-content", {
      x: "-50%",
      ease: "none",
      duration: 30,
      repeat: -1,
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full bg-rose-600/10 border-y border-rose-600/20 py-4 overflow-hidden flex whitespace-nowrap z-20">
      <div className="marquee-content flex gap-12 text-sm font-body uppercase tracking-widest text-rose-400/80 px-4">
        <span>Breaking News: Mawelele Drops &quot;Buya Ekhaya&quot;</span>
        <span>•</span>
        <span>New Release: Available on All Platforms</span>
        <span>•</span>
        <span>Rose Pearl welcomes you to the future of sound</span>
        <span>•</span>
        <span>Studio Sessions Open for Booking</span>
        <span>•</span>
        <span>Breaking News: Mawelele Drops &quot;Buya Ekhaya&quot;</span>
        <span>•</span>
        <span>New Release: Available on All Platforms</span>
        <span>•</span>
        <span>Rose Pearl welcomes you to the future of sound</span>
        <span>•</span>
        <span>Studio Sessions Open for Booking</span>
      </div>
    </div>
  );
}
