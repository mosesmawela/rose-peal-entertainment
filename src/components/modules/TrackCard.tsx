"use client";

import Image from "next/image";
import { Track } from "@/data/musicData";
import { Play, Clock, Calendar, Music, ExternalLink } from "lucide-react";

interface TrackCardProps {
  track: Track;
  index: number;
}

export function TrackCard({ track, index }: TrackCardProps) {
  const isEven = index % 2 === 0;

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index !== 0 ? "pt-20" : ""}`}>
      <div className={`flex justify-center ${!isEven ? "lg:order-2" : ""}`}>
        <div className="relative w-72 h-72 lg:w-80 lg:h-80 group">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-purple-500/20 rounded-full blur-3xl opacity-50" />
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            {track.coverImage ? (
              <Image
                src={track.coverImage}
                alt={`${track.title} cover`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-rose-900 to-black flex flex-col items-center justify-center p-8">
                <Music className="w-20 h-20 text-rose-500/50 mb-4" />
                <span className="text-rose-500/50 font-mono text-xs uppercase tracking-widest">
                  Rose Pearl Ent.
                </span>
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-rose-500 text-white text-xs font-bold rounded">
                  NEW
                </span>
                {track.genre && (
                  <span className="px-2 py-1 bg-white/10 backdrop-blur-sm text-white/70 text-xs rounded">
                    {track.genre}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`space-y-6 ${!isEven ? "lg:order-1" : ""}`}>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-rose-500 font-mono text-xs uppercase tracking-widest">
              Track {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            {track.title}
          </h2>
          <p className="text-xl text-rose-400">
            {track.artist}
            {track.featuredArtists && (
              <span className="text-white/60"> ft. {track.featuredArtists}</span>
            )}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-white/50">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{track.duration}</span>
          </div>
          {track.releaseDate && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{track.releaseDate}</span>
            </div>
          )}
        </div>

        <p className="text-white/60 leading-relaxed">
          Experience the latest sound from {track.artist} featuring {track.featuredArtists || "guest artists"}.
          A mesmerizing blend of rhythms that showcases the best of contemporary African music.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={track.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-rose-500 hover:bg-rose-400 text-white font-semibold rounded-lg transition-colors"
          >
            <Play className="w-5 h-5" fill="white" />
            Preview Track
          </a>
          <a
            href={track.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Listen on All Platforms
          </a>
        </div>

        <div className="pt-4 border-t border-white/10">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-3">
            Available On
          </p>
          <div className="flex flex-wrap gap-3">
            {["Spotify", "Apple Music", "YouTube Music", "SoundCloud", "Deezer"].map((platform) => (
              <a
                key={platform}
                href={track.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 text-xs rounded transition-colors"
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
