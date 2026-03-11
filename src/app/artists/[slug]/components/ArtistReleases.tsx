import { Disc, Play } from "lucide-react";
import { Artist } from "@/lib/data/artists";

interface ArtistReleasesProps {
  releases: Artist["releases"];
}

export function ArtistReleases({ releases }: ArtistReleasesProps) {
  if (!releases || releases.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Releases</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {releases.map((release, index) => (
          <div
            key={index}
            className="group bg-white/5 rounded-xl p-4 border border-white/10 hover:border-rose-500/30 transition-colors flex items-center gap-4"
          >
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-rose-500/20 to-purple-500/20 flex items-center justify-center">
              <Disc className="w-8 h-8 text-rose-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold group-hover:text-rose-400 transition-colors">{release.title}</h3>
              <p className="text-white/40 text-sm">{release.type} • {release.year}</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-rose-500 hover:bg-rose-400 transition-colors flex items-center justify-center">
              <Play className="w-4 h-4 text-white ml-0.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
