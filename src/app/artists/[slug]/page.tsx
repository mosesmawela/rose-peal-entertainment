import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ARTISTS, getArtistBySlug } from "@/lib/data/artists";
import { ArtistHero } from "./components/ArtistHero";
import { ArtistQuickInfo } from "./components/ArtistQuickInfo";
import { ArtistSocials } from "./components/ArtistSocials";
import { ArtistReleases } from "./components/ArtistReleases";
import { ArtistBookingCTA } from "./components/ArtistBookingCTA";

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
      <ArtistHero artist={artist} />

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
            <ArtistQuickInfo artist={artist} />
            <ArtistSocials socials={artist.socials} />
          </div>
        </div>

        <ArtistReleases releases={artist.releases} />
        <ArtistBookingCTA artistName={artist.name} />
      </div>
    </div>
  );
}
