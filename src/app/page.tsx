"use client";

import { BrandCarousel } from "@/components/modules/BrandCarousel";
import { HeroSection } from "@/components/modules/HeroSection";
import { FeaturedReleaseSection } from "@/components/modules/FeaturedReleaseSection";
import { NewReleasesSection } from "@/components/modules/NewReleasesSection";
import { Marquee } from "@/components/modules/Marquee";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-black text-white overflow-x-hidden">
      {/* 1. Full Screen Landing Page */}
      <HeroSection />

      {/* Brand Carousel */}
      <BrandCarousel />

      {/* 2. Featured New Release Section */}
      <FeaturedReleaseSection />

      {/* 3. New Releases Carousel Section */}
      <NewReleasesSection />

      {/* Marquee */}
      <Marquee />
    </main>
  );
}
