import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ARTISTS } from "@/lib/data/artists";

export default function ArtistsPage() {
  return (
    <div className="min-h-screen p-8 lg:p-20">
      <header className="mb-20 text-center">
        <h1 className="text-6xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">ROSTER</h1>
        <p className="text-white/40 uppercase tracking-[0.5em] text-xs">World Class Talent</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {ARTISTS.map((artist) => (
          <Link key={artist.id} href={`/artists/${artist.slug}`}>
            <div className="group relative h-96 bg-neutral-900 rounded-xl overflow-hidden border border-white/5 hover:border-rose-500/50 transition-colors cursor-pointer">
              {/* Background Image */}
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-start gap-2">
                <h2 className="text-3xl font-bold uppercase tracking-tight">{artist.name}</h2>
                <span className="text-rose-500 font-mono text-xs uppercase tracking-widest">{artist.role}</span>

                <div className="h-0 overflow-hidden group-hover:h-auto group-hover:mt-4 transition-all duration-300">
                  <Button variant="glass" className="!py-2 !px-4 !text-[10px]">View Profile</Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}