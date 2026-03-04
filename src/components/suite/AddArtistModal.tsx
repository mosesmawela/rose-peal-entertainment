
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { mockDB } from "@/lib/mock/mock-db";
import { useToast } from "@/providers/ToastContext";

interface AddArtistModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function AddArtistModal({ isOpen, onClose, onSuccess }: AddArtistModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        genre: "",
        careerPhase: "Development" as const,
        monthlyListeners: "0",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.genre) {
            toast("Please fill in all required fields", "error");
            return;
        }

        try {
            setIsLoading(true);
            await mockDB.createArtist({
                ...formData,
                role: "Artist",
                image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&auto=format&fit=crop&q=60", // Placeholder for MVP
                activeProjects: 0,
                stats: {
                    streams: "0",
                    followers: "0",
                    engagement: "0%"
                },
                team: []
            });
            onSuccess();
        } catch (error) {
            toast("Failed to create artist", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none p-4"
                    >
                        <div className="w-full max-w-lg glass-panel rounded-2xl border border-white/10 p-6 pointer-events-auto shadow-2xl">

                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Sign New Artist</h2>
                                    <p className="text-white/60 text-sm">Add talent to your roster</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-4 h-4 text-white" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">

                                {/* Name */}
                                <div className="space-y-1">
                                    <label className="text-xs uppercase tracking-wider text-white/40 font-medium">Stage Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-rose-500/50 focus:outline-none transition-colors"
                                        placeholder="e.g. Young Rose"
                                        autoFocus
                                    />
                                </div>

                                {/* Genre */}
                                <div className="space-y-1">
                                    <label className="text-xs uppercase tracking-wider text-white/40 font-medium">Genre</label>
                                    <input
                                        type="text"
                                        value={formData.genre}
                                        onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-rose-500/50 focus:outline-none transition-colors"
                                        placeholder="e.g. Afro-Soul"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* Career Phase */}
                                    <div className="space-y-1">
                                        <label className="text-xs uppercase tracking-wider text-white/40 font-medium">Phase</label>
                                        <select
                                            value={formData.careerPhase}
                                            onChange={(e) => setFormData({ ...formData, careerPhase: e.target.value as any })}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-rose-500/50 focus:outline-none transition-colors appearance-none"
                                        >
                                            <option value="Development">Development</option>
                                            <option value="Breakout">Breakout</option>
                                            <option value="Established">Established</option>
                                            <option value="Star">Star</option>
                                        </select>
                                    </div>

                                    {/* Monthly Listeners */}
                                    <div className="space-y-1">
                                        <label className="text-xs uppercase tracking-wider text-white/40 font-medium">Initial Listeners</label>
                                        <input
                                            type="text"
                                            value={formData.monthlyListeners}
                                            onChange={(e) => setFormData({ ...formData, monthlyListeners: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-rose-500/50 focus:outline-none transition-colors"
                                            placeholder="e.g. 10K"
                                        />
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                <div className="flex justify-end gap-3 pt-4 border-t border-white/5 mt-6">
                                    <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                                    <Button type="submit" variant="primary" disabled={isLoading} className="min-w-[120px]">
                                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign Artist"}
                                    </Button>
                                </div>

                            </form>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
