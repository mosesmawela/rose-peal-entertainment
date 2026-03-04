"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Track } from "@/data/musicData";
import { Play, ChevronLeft, ChevronRight, Clock, Music } from "lucide-react";

interface NewReleaseSliderProps {
  tracks: Track[];
}

export function NewReleaseSlider({ tracks }: NewReleaseSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <div 
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {tracks.map((track) => (
          <div
            key={track.id}
            className="flex-shrink-0 w-72 group"
            onMouseEnter={() => setHoveredTrack(track.id)}
            onMouseLeave={() => setHoveredTrack(null)}
          >
            <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
              {track.coverImage ? (
                <Image
                  src={track.coverImage}
                  alt={`${track.title} cover`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-rose-900 to-black flex items-center justify-center">
                  <Music className="w-16 h-16 text-rose-500/50" />
                </div>
              )}
              
              <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${hoveredTrack ? "opacity-100" : "opacity-0"}`}>
                <a
                  href={track.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 rounded-full bg-rose-500 flex items-center justify-center hover:bg-rose-400 transition-colors transform hover:scale-110"
                >
                  <Play className="w-7 h-7 text-white ml-1" fill="white" />
                </a>
              </div>

              <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-md flex items-center gap-1">
                <Clock className="w-3 h-3 text-white/70" />
                <span className="text-xs text-white/70 font-mono">{track.duration}</span>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-white font-bold text-lg truncate group-hover:text-rose-400 transition-colors">
                {track.title}
              </h3>
              <p className="text-white/60 text-sm truncate">
                {track.artist}
                {track.featuredArtists && (
                  <span className="text-white/40"> ft. {track.featuredArtists}</span>
                )}
              </p>
              {track.genre && (
                <span className="inline-block px-2 py-0.5 bg-rose-500/10 text-rose-400 text-xs rounded-full">
                  {track.genre}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-black/80 border border-white/10 flex items-center justify-center hover:bg-rose-500 transition-colors z-10"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-black/80 border border-white/10 flex items-center justify-center hover:bg-rose-500 transition-colors z-10"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}
