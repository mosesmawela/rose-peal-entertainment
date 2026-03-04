import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Instagram, Twitter, Music2, Play, Calendar, Disc, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ARTISTS, getArtistBySlug } from "@/lib/data/artists";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTISTS.map((artist) => ({
    slug: artist.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const artist = getArtistBySlug(resolvedParams.slug);

  if (!artist) {
    return {
      title: "Artist Not Found",
    };
  }

  return {
    title: `${artist.name} | Rose Pearl Entertainment`,
    description: artist.bio,
  };
}

export default async function ArtistPage({ params }: Props) {
  const resolvedParams = await params;
  const artist = getArtistBySlug(resolvedParams.slug);

  if (!artist) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-8 lg:px-20 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Bio */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">About</h2>
            <p className="text-white/70 text-lg leading-relaxed">{artist.bio}</p>
          </div>

          {/* Stats / Info */}
          <div className="space-y-6">
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

            {/* Social Links */}
            {artist.socials && (
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-4">Follow</h3>
                <div className="flex gap-3">
                  {artist.socials.instagram && (
                    <a
                      href={artist.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-white/70 hover:text-white text-sm"
                    >
                      <Instagram className="w-4 h-4" /> Instagram
                    </a>
                  )}
                  {artist.socials.twitter && (
                    <a
                      href={artist.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-white/70 hover:text-white text-sm"
                    >
                      <Twitter className="w-4 h-4" /> Twitter
                    </a>
                  )}
                </div>
                {artist.socials.spotify && (
                  <a
                    href={artist.socials.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 w-full py-3 rounded-xl bg-green-600/20 hover:bg-green-600/30 transition-colors flex items-center justify-center gap-2 text-green-400 text-sm"
                  >
                    <Music2 className="w-4 h-4" /> Listen on Spotify
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Releases */}
        {artist.releases && artist.releases.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Releases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {artist.releases.map((release, index) => (
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
        )}

        {/* Book Artist CTA */}
        <div className="mt-20 bg-gradient-to-r from-rose-500/10 to-purple-500/10 rounded-2xl p-8 lg:p-12 border border-white/10 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Book {artist.name}</h2>
          <p className="text-white/60 mb-6 max-w-xl mx-auto">
            Interested in booking {artist.name} for your event or collaboration? Get in touch with our team.
          </p>
          <Link href="/contact">
            <Button variant="primary" className="rounded-full px-8 py-3">
              Contact for Booking
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}