"use client";

import Image from "next/image";
import { Track } from "@/data/musicData";
import { Clock, Calendar, Music, ExternalLink, Play } from "lucide-react";

interface TrackCardProps {
  track: Track;
  index: number;
}

export function TrackCard({ track, index }: TrackCardProps) {
  const isEven = index % 2 === 0;

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index !== 0 ? "lg:pt-8" : ""}`}>
      {/* Cover Art Section */}
      <div className={`flex justify-center ${!isEven ? "lg:order-2" : ""}`}>
        <div className="relative w-72 h-72 lg:w-96 lg:h-96 group">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl opacity-50" />
          
          {/* Main card */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            {track.coverImage ? (
              <Image
                src={track.coverImage}
                alt={`${track.title} cover`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-rose-900 via-black to-purple-900 flex flex-col items-center justify-center p-8">
                <div className="w-24 h-24 rounded-full bg-rose-500/20 flex items-center justify-center mb-4">
                  <Music className="w-12 h-12 text-rose-500" />
                </div>
                <span className="text-rose-500/50 font-body text-xs uppercase tracking-widest">
                  Rose Pearl Ent.
                </span>
              </div>
            )}
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            
            {/* Top badges */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 bg-rose-500 text-white text-xs font-bold rounded-full font-body">
                  NEW
                </span>
                {track.genre && (
                  <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white/70 text-xs rounded-full font-body">
                    {track.genre}
                  </span>
                )}
              </div>
              
              {/* Track number */}
              <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <span className="text-sm font-mono text-white/70">{String(index + 1).padStart(2, "0")}</span>
              </div>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-white/50" />
                <span className="text-sm text-white/50 font-mono">{track.duration}</span>
                {track.releaseDate && (
                  <>
                    <span className="text-white/20">•</span>
                    <Calendar className="w-4 h-4 text-white/50" />
                    <span className="text-sm text-white/50 font-mono">{track.releaseDate}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className={`space-y-6 ${!isEven ? "lg:order-1" : ""}`}>
        {/* Title and Artist */}
        <div>
          <h2 className="text-4xl lg:text-5xl font-display tracking-tight text-white mb-3 leading-none">
            {track.title}
          </h2>
          <p className="text-xl font-body">
            <span className="text-rose-400">{track.artist}</span>
            {track.featuredArtists && (
              <span className="text-white/50"> ft. {track.featuredArtists}</span>
            )}
          </p>
        </div>

        {/* Description */}
        <p className="text-white/60 leading-relaxed font-body text-base max-w-md">
          Experience the latest sound from <span className="text-white">{track.artist}</span> featuring {track.featuredArtists || "guest artists"}.
          A mesmerizing blend of rhythms that showcases the best of contemporary African music.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          {track.spotifyEmbed ? (
            <div className="w-full max-w-md">
              <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
                <iframe
                  style={{ borderRadius: '12px' }}
                  src={track.spotifyEmbed}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </div>
          ) : (
            <a
              href={track.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-rose-500 hover:bg-rose-400 text-white font-semibold rounded-lg transition-all hover:scale-105"
            >
              <Play className="w-5 h-5" fill="white" />
              Preview Track
            </a>
          )}
          
          <a
            href={track.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-lg transition-all hover:scale-105 group"
          >
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            Listen on All Platforms
          </a>
        </div>

        {/* Available On */}
        <div className="pt-6 border-t border-white/10">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-4 font-body">
            Available On
          </p>
          <div className="flex flex-wrap gap-3">
            {["Spotify", "Apple Music", "YouTube Music", "SoundCloud", "Deezer"].map((platform) => (
              <a
                key={platform}
                href={track.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 text-sm rounded-lg transition-all hover:scale-105 font-body"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
