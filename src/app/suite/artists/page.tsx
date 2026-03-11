
"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Plus, Users, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ArtistCard } from "@/components/suite/ArtistCard";
import { mockDB } from "@/lib/mock/mock-db";
import { MockArtist } from "@/lib/mock/data";
import { AddArtistModal } from "@/components/suite/AddArtistModal";
import { useToast } from "@/providers/ToastContext";

export default function ArtistsPage() {
    const [artists, setArtists] = useState<MockArtist[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { toast } = useToast();

    const fetchArtists = async () => {
        try {
            setLoading(true);
            const data = await mockDB.getArtists();
            setArtists(data);
        } catch (error) {
            toast("Failed to load artists", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArtists();
    }, []);

    // ⚡ Bolt: Memoize filtered artists to prevent expensive re-calculations on every render.
    // Impact: Reduces O(N) string matching operations to only run when the search query or artists list changes, improving render performance during input typing.
    const filteredArtists = useMemo(() => {
        const query = searchQuery.toLowerCase();
        if (!query) return artists;
        return artists.filter(artist =>
            artist.name.toLowerCase().includes(query) ||
            artist.genre.toLowerCase().includes(query)
        );
    }, [artists, searchQuery]);

    return (
        <div className="min-h-screen p-8 space-y-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Artist Roster</h1>
                    <p className="text-white/60">Manage your talent portfolio and team assignments</p>
                </div>
                <Button variant="primary" onClick={() => setIsModalOpen(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    ADD ARTIST
                </Button>
            </div>

            {/* Filters & Search */}
            <div className="glass-panel p-4 rounded-xl flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search artists, genres..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-rose-500/50 transition-colors"
                    />
                </div>
                <Button variant="ghost" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                </Button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                    {loading ? (
                        // Skeleton Loading
                        [...Array(4)].map((_, i) => (
                            <motion.div
                                key={`skeleton-${i}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-[420px] glass-panel rounded-2xl animate-pulse bg-white/5"
                            />
                        ))
                    ) : filteredArtists.length > 0 ? (
                        filteredArtists.map((artist) => (
                            <ArtistCard key={artist.id} artist={artist} />
                        ))
                    ) : (
                        // Empty State
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full py-20 flex flex-col items-center justify-center text-center opacity-60"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                <Users className="w-8 h-8 text-white/40" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No artists found</h3>
                            <p className="text-white/60 mb-6">Try adjusting your search criteria</p>
                            <Button variant="ghost" onClick={() => setSearchQuery("")}>Clear Search</Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <AddArtistModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => {
                    fetchArtists();
                    setIsModalOpen(false);
                    toast("New artist signed to roster", "success");
                }}
            />
        </div>
    );
}
