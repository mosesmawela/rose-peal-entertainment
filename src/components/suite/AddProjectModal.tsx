
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { mockDB } from "@/lib/mock/mock-db";
import { useToast } from "@/providers/ToastContext";
import { MockArtist } from "@/lib/mock/data";

interface AddProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function AddProjectModal({ isOpen, onClose, onSuccess }: AddProjectModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [artists, setArtists] = useState<MockArtist[]>([]);
    const { toast } = useToast();

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        artistId: "",
        type: "Single" as const,
        dueDate: "",
    });

    useEffect(() => {
        if (isOpen) {
            mockDB.getArtists().then(setArtists);
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.artistId || !formData.dueDate) {
            toast("Please fill in all required fields", "error");
            return;
        }

        try {
            setIsLoading(true);
            const selectedArtist = artists.find(a => a.id === formData.artistId);

            await mockDB.createProject({
                ...formData,
                artistName: selectedArtist?.name || "Unknown",
                status: "Planning",
                progress: 0,
                tasks: 0,
                completedTasks: 0
            });
            onSuccess();
        } catch (error) {
            toast("Failed to create project", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none p-4"
                    >
                        <div className="w-full max-w-lg glass-panel rounded-2xl border border-white/10 p-6 pointer-events-auto shadow-2xl">

                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Start New Project</h2>
                                    <p className="text-white/60 text-sm">Launch a release or campaign</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-4 h-4 text-white" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">

                                <div className="space-y-1">
                                    <label className="text-xs uppercase tracking-wider text-white/40 font-medium">Project Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-rose-500/50 focus:outline-none transition-colors"
                                        placeholder="e.g. Summer Hits EP"
                                        autoFocus
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs uppercase tracking-wider text-white/40 font-medium">Artist</label>
                                    <select
                                        value={formData.artistId}
                                        onChange={(e) => setFormData({ ...formData, artistId: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-rose-500/50 focus:outline-none transition-colors appearance-none"
                                    >
                                        <option value="">Select Artist...</option>
                                        {artists.map(a => (
                                            <option key={a.id} value={a.id}>{a.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs uppercase tracking-wider text-white/40 font-medium">Type</label>
                                        <select
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-rose-500/50 focus:outline-none transition-colors appearance-none"
                                        >
                                            <option value="Single">Single</option>
                                            <option value="EP">EP</option>
                                            <option value="Album">Album</option>
                                            <option value="Campaign">Campaign</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs uppercase tracking-wider text-white/40 font-medium">Target Date</label>
                                        <input
                                            type="date"
                                            value={formData.dueDate}
                                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-rose-500/50 focus:outline-none transition-colors text-white-scheme"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-white/5 mt-6">
                                    <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                                    <Button type="submit" variant="primary" disabled={isLoading} className="min-w-[120px]">
                                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Project"}
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
