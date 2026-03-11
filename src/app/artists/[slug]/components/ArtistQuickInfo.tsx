import { Music2, Play } from "lucide-react";
import { Artist } from "@/lib/data/artists";

interface ArtistQuickInfoProps {
  artist: Artist;
}

export function ArtistQuickInfo({ artist }: ArtistQuickInfoProps) {
  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
      <h3 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-4">Quick Info</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center">
            <Music2 className="w-5 h-5 text-rose-500" />
          </div>
          <div>
            <p className="text-white/40 text-xs uppercase">Genre</p>
            <p className="text-white font-medium">{artist.genre}</p>
          </div>
        </div>
        {artist.monthlyListeners && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center">
              <Play className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase">Monthly Listeners</p>
              <p className="text-white font-medium">{artist.monthlyListeners}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
