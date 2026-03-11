import { Instagram, Twitter, Music2 } from "lucide-react";
import { Artist } from "@/lib/data/artists";

interface ArtistSocialsProps {
  socials: Artist["socials"];
}

export function ArtistSocials({ socials }: ArtistSocialsProps) {
  if (!socials) {
    return null;
  }

  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
      <h3 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-4">Follow</h3>
      <div className="flex gap-3">
        {socials.instagram && (
          <a
            href={socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-white/70 hover:text-white text-sm"
          >
            <Instagram className="w-4 h-4" /> Instagram
          </a>
        )}
        {socials.twitter && (
          <a
            href={socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-white/70 hover:text-white text-sm"
          >
            <Twitter className="w-4 h-4" /> Twitter
          </a>
        )}
      </div>
      {socials.spotify && (
        <a
          href={socials.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 w-full py-3 rounded-xl bg-green-600/20 hover:bg-green-600/30 transition-colors flex items-center justify-center gap-2 text-green-400 text-sm"
        >
          <Music2 className="w-4 h-4" /> Listen on Spotify
        </a>
      )}
    </div>
  );
}
