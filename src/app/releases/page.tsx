import { VinylCard } from "@/components/skeuomorphic/VinylCard";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { TrackCard } from "@/components/modules/TrackCard";
import { newReleases } from "@/data/musicData";
import Link from "next/link";

interface Release {
    id: string;
    title: string;
    slug: string;
    cover_url: string | null;
    release_date: string | null;
    type: string | null;
    description: string | null;
    spotify_embed_url: string | null;
    link_tree_url: string | null;
    is_featured: boolean;
    artists: {
        name: string;
    };
}

export const dynamic = 'force-dynamic';

export default async function ReleasesPage() {
    const supabase = createClient();

    const { data: releases, error } = await supabase
        .from('releases')
        .select(`
            id,
            title,
            slug,
            cover_url,
            release_date,
            type,
            description,
            spotify_embed_url,
            link_tree_url,
            is_featured,
            artists (
                name
            )
        `)
        .order('release_date', { ascending: false });

    // Fallback to mock data if Supabase is not configured
    const MOCK_RELEASES = [
        { id: '1', title: "Midnight Rose", artists: { name: "The Weeknd" }, cover_url: null, spotify_embed_url: null, link_tree_url: null, description: null },
        { id: '2', title: "Solar Power", artists: { name: "Lorde" }, cover_url: null, spotify_embed_url: null, link_tree_url: null, description: null },
        { id: '3', title: "Renaissance", artists: { name: "Beyoncé" }, cover_url: null, spotify_embed_url: null, link_tree_url: null, description: null },
        { id: '4', title: "Gemini Rights", artists: { name: "Steve Lacy" }, cover_url: null, spotify_embed_url: null, link_tree_url: null, description: null },
        { id: '5', title: "SOS", artists: { name: "SZA" }, cover_url: null, spotify_embed_url: null, link_tree_url: null, description: null },
        { id: '6', title: "Un Verano Sin Ti", artists: { name: "Bad Bunny" }, cover_url: null, spotify_embed_url: null, link_tree_url: null, description: null },
    ];

    const displayReleases = (releases && !error) ? releases : MOCK_RELEASES;

    return (
        <div className="min-h-screen p-8 lg:p-20">
            <header className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter mb-2">CATALOG</h1>
                    <p className="text-white/40 uppercase tracking-widest text-xs">Browse all latest drops</p>
                </div>
                <div className="flex gap-4 text-xs font-mono uppercase text-white/40">
                    <span className="text-rose-500 cursor-pointer">All</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Albums</span>
                    <span className="hover:text-white cursor-pointer transition-colors">EPs</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Singles</span>
                </div>
            </header>

            <div className="space-y-8">
                {newReleases.map((track, index) => (
                    <TrackCard key={track.id} track={track} index={index} />
                ))}
            </div>

            <div className="mt-20 text-center">
                <p className="text-white/40 mb-6">Want to submit your music?</p>
                <Link href="/submissions">
                    <Button variant="primary" className="!py-4 !px-8">
                        Submit Your Music
                    </Button>
                </Link>
            </div>
        </div>
    );
}
