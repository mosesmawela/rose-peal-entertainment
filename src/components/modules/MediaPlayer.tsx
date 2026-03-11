"use client";

import { useState, useEffect } from "react";
import { Track } from "@/data/musicData";
import { SkipBack, SkipForward, X, Music } from "lucide-react";
import Image from "next/image";

const TrackCover = ({ track, isMinimized }: { track: Track; isMinimized?: boolean }) => (
  <div className={`${isMinimized ? 'w-10 h-10 rounded-full' : 'w-16 h-16 rounded-lg flex-shrink-0'} overflow-hidden relative`}>
    {track.coverImage ? (
      <Image
        src={track.coverImage}
        alt={track.title}
        fill
        className="object-cover"
      />
    ) : (
      <div className="w-full h-full bg-rose-900 flex items-center justify-center">
        <Music className={`${isMinimized ? 'w-5 h-5' : 'w-8 h-8'} text-rose-500`} />
      </div>
    )}
  </div>
);

const TrackInfo = ({ track, isMinimized }: { track: Track; isMinimized?: boolean }) => (
  <div className="flex-1 min-w-0">
    <p className={`text-white ${isMinimized ? 'text-sm font-medium' : 'font-semibold'} truncate`}>{track.title}</p>
    <p className={`text-white/${isMinimized ? '50 text-xs' : '60 text-sm'} truncate`}>
      {track.artist}
      {!isMinimized && track.featuredArtists && (
        <span className="text-white/40"> ft. {track.featuredArtists}</span>
      )}
    </p>
  </div>
);

const SpotifyEmbed = ({ embedUrl }: { embedUrl: string }) => {
  if (!embedUrl) return null;
  return (
    <div className="rounded-xl overflow-hidden border border-white/10">
      <iframe
        style={{ borderRadius: '12px' }}
        src={embedUrl.replace('utm_source=generator', 'utm_source=generator&theme=0')}
        width="100%"
        height="152"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
};

export function MediaPlayer() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handlePlayTrack = (event: CustomEvent<Track>) => {
      const track = event.detail;
      setCurrentTrack(track);
      setIsMinimized(false);

      const allTracksWithSpotify = playlist.length > 0 
        ? playlist 
        : [track];
      
      const trackIndex = allTracksWithSpotify.findIndex(t => t.id === track.id);
      if (trackIndex !== -1) {
        setCurrentIndex(trackIndex);
      }
    };

    window.addEventListener('playTrack', handlePlayTrack as EventListener);
    return () => {
      window.removeEventListener('playTrack', handlePlayTrack as EventListener);
    };
  }, [playlist]);

  useEffect(() => {
    import("@/data/musicData").then(({ newReleases }) => {
      const tracksWithSpotify = newReleases.filter(t => t.spotifyEmbed);
      setPlaylist(tracksWithSpotify);
    });
  }, []);

  const playNext = () => {
    if (playlist.length === 0) return;
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentIndex(nextIndex);
    setCurrentTrack(playlist[nextIndex]);
  };

  const playPrevious = () => {
    if (playlist.length === 0) return;
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentIndex(prevIndex);
    setCurrentTrack(playlist[prevIndex]);
  };

  const closePlayer = () => {
    setCurrentTrack(null);
    setIsMinimized(false);
  };

  if (!currentTrack) return null;

  return (
    <>
      {isMinimized ? (
        <div 
          className="fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-2 bg-black/90 backdrop-blur-lg border border-white/10 rounded-full cursor-pointer hover:bg-black/80 transition-all"
          onClick={() => setIsMinimized(false)}
        >
          <TrackCover track={currentTrack} isMinimized={true} />
          <TrackInfo track={currentTrack} isMinimized={true} />
          <button 
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              playNext();
            }}
          >
            <SkipForward className="w-4 h-4 text-white" />
          </button>
          <button 
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              closePlayer();
            }}
          >
            <X className="w-4 h-4 text-white/50" />
          </button>
        </div>
      ) : (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4 mb-4">
              <TrackCover track={currentTrack} />
              <TrackInfo track={currentTrack} />
              <div className="flex items-center gap-2">
                <button 
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  onClick={playPrevious}
                >
                  <SkipBack className="w-5 h-5 text-white" />
                </button>
                <button 
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  onClick={playNext}
                >
                  <SkipForward className="w-5 h-5 text-white" />
                </button>
                <button 
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  onClick={() => setIsMinimized(true)}
                >
                  <X className="w-5 h-5 text-white/50" />
                </button>
              </div>
            </div>
            <SpotifyEmbed embedUrl={currentTrack.spotifyEmbed || ''} />
          </div>
        </div>
      )}
    </>
  );
}
