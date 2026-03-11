import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Instagram, Twitter, Music2, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Artist } from "@/lib/data/artists";

interface ArtistHeroProps {
  artist: Artist;
}

export function ArtistHero({ artist }: ArtistHeroProps) {
  return (
    <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0">
        <Image
          src={artist.image}
          alt={artist.name}
          fill
          className="object-cover opacity-40 blur-sm scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
      </div>

      {/* Navigation */}
      <div className="absolute top-8 left-8 z-10">
        <Link
          href="/artists"
          className="text-white/60 hover:text-white transition-colors flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Roster
        </Link>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-20">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-end gap-8">
          {/* Profile Image */}
          <div className="relative w-48 h-48 lg:w-64 lg:h-64 flex-shrink-0 rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
            <Image
              src={artist.image}
              alt={artist.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Info */}
          <div className="flex-1 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-wider border border-rose-500/30">
                {artist.genre}
              </span>
              {artist.monthlyListeners && (
                <span className="text-white/40 text-sm flex items-center gap-1">
                  <Music2 className="w-4 h-4" />
                  {artist.monthlyListeners} monthly listeners
                </span>
              )}
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4 tracking-tight">{artist.name}</h1>
            <p className="text-white/60 text-lg">{artist.role}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-4">
            <Button variant="primary" className="gap-2 rounded-full px-8">
              <Play className="w-4 h-4" /> Play
            </Button>
            {artist.socials?.instagram && (
              <a href={artist.socials.instagram} target="_blank" rel="noopener noreferrer">
                <Button variant="glass" className="h-12 w-12 p-0 rounded-full">
                  <Instagram className="w-5 h-5" />
                </Button>
              </a>
            )}
            {artist.socials?.twitter && (
              <a href={artist.socials.twitter} target="_blank" rel="noopener noreferrer">
                <Button variant="glass" className="h-12 w-12 p-0 rounded-full">
                  <Twitter className="w-5 h-5" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
