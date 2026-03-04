
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { mockDB } from "@/lib/mock/mock-db";
import { useToast } from "@/providers/ToastContext";

interface AddEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    selectedDate?: Date | null;
}

export function AddEventModal({ isOpen, onClose, onSuccess, selectedDate }: AddEventModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        title: "",
        type: "Meeting" as const,
        date: "",
        location: ""
    });

    useEffect(() => {
        if (selectedDate) {
            // Adjust for timezone offset to get YYYY-MM-DD
            const offset = selectedDate.getTimezoneOffset();
            const adjustedDate = new Date(selectedDate.getTime() - (offset * 60 * 1000));
            setFormData(prev => ({ ...prev, date: adjustedDate.toISOString().split('T')[0] }));
        }
    }, [selectedDate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.date) {
            toast("Please fill in required fields", "error");
            return;
        }

        try {
            setIsLoading(true);
            await mockDB.createEvent({
                ...formData,
                date: new Date(formData.date)
            });
            onSuccess();
        } catch (error) {
            toast("Failed to create event", "error");
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
                                    <h2 className="text-2xl font-bold text-white">Add Event</h2>
                                    <p className="text-white/60 text-sm">Schedule a session or release</p>
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
                                    <label className="text-xs uppercase tracking-wider text-white/40 font-medium">Event Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-rose-500/50 focus:outline-none transition-colors"
                                        placeholder="e.g. Vocal Recording"
                                        autoFocus
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs uppercase tracking-wider text-white/40 font-medium">Type</label>
                                        <select
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-rose-500/50 focus:outline-none transition-colors appearance-none"
                                        >
                                            <option value="Meeting">Meeting</option>
                                            <option value="Session">Session</option>
                                            <option value="Release">Release</option>
                                            <option value="Shoot">Shoot</option>
                                            <option value="Live">Live</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs uppercase tracking-wider text-white/40 font-medium">Date</label>
                                        <input
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-rose-500/50 focus:outline-none transition-colors text-white-scheme"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs uppercase tracking-wider text-white/40 font-medium">Location</label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-rose-500/50 focus:outline-none transition-colors"
                                        placeholder="e.g. Studio A"
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-white/5 mt-6">
                                    <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                                    <Button type="submit" variant="primary" disabled={isLoading} className="min-w-[120px]">
                                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Event"}
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
