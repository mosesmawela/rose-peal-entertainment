
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Folder, Music, Video, Image as ImageIcon, Upload, MoreVertical, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/providers/ToastContext";

interface MediaFile {
    id: string;
    name: string;
    type: "audio" | "video" | "image" | "folder";
    size: string;
    date: string;
    artist?: string;
}

const MOCK_FILES: MediaFile[] = [
    { id: "f1", name: "Demos - 2024", type: "folder", size: "12 items", date: "Feb 1, 2024" },
    { id: "f2", name: "Contracts", type: "folder", size: "3 items", date: "Jan 15, 2024" },
    { id: "m1", name: "Buya Ekhaya (Master).wav", type: "audio", size: "42.5 MB", date: "Feb 3, 2024", artist: "Mawelele" },
    { id: "m2", name: "Music Video Draft v2.mp4", type: "video", size: "1.2 GB", date: "Feb 2, 2024", artist: "Naledi Aphiwe" },
    { id: "m3", name: "Cover Art Final.png", type: "image", size: "15 MB", date: "Jan 28, 2024", artist: "Mawelele" },
];

export default function MediaVaultPage() {
    const [files, setFiles] = useState<MediaFile[]>(MOCK_FILES);
    const [searchQuery, setSearchQuery] = useState("");
    const { toast } = useToast();

    const handleUpload = () => {
        toast("Uploading files... (Simulated)", "info");
        setTimeout(() => {
            const newFile: MediaFile = {
                id: `new-${Date.now()}`,
                name: "New Upload.wav",
                type: "audio",
                size: "10 MB",
                date: "Just now",
                artist: "Unknown"
            };
            setFiles(prev => [newFile, ...prev]);
            toast("Upload complete", "success");
        }, 2000);
    };

    const filteredFiles = files.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const getIcon = (type: string) => {
        switch (type) {
            case "folder": return <Folder className="w-8 h-8 text-blue-400 fill-blue-400/20" />;
            case "audio": return <Music className="w-8 h-8 text-rose-500" />;
            case "video": return <Video className="w-8 h-8 text-purple-500" />;
            case "image": return <ImageIcon className="w-8 h-8 text-amber-500" />;
            default: return <Folder className="w-8 h-8 text-white/40" />;
        }
    };

    return (
        <div className="min-h-screen p-8 space-y-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Media Vault</h1>
                    <p className="text-white/60">Secure storage for masters, stems, and assets</p>
                </div>
                <Button variant="primary" onClick={handleUpload} className="gap-2">
                    <Upload className="w-4 h-4" />
                    UPLOAD FILES
                </Button>
            </div>

            {/* Search */}
            <div className="glass-panel p-4 rounded-xl">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search vault..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-rose-500/50 transition-colors"
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">

                {/* Dropzone (Visual) */}
                <div
                    onClick={handleUpload}
                    className="border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:border-rose-500/50 hover:bg-rose-500/5 transition-colors group"
                >
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6 text-white/40 group-hover:text-rose-500" />
                    </div>
                    <p className="text-sm font-medium text-white/60">Drop files here</p>
                </div>

                {/* Files */}
                <AnimatePresence mode="popLayout">
                    {filteredFiles.map((file) => (
                        <motion.div
                            key={file.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-panel p-4 rounded-xl group relative border border-white/5 hover:border-rose-500/30 transition-colors cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-4">
                                {getIcon(file.type)}
                                <button className="text-white/20 hover:text-white transition-colors">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>

                            <div>
                                <h4 className="font-medium text-white truncate mb-1" title={file.name}>{file.name}</h4>
                                <div className="flex items-center justify-between text-xs text-white/40">
                                    <span>{file.size}</span>
                                    <span>{file.date}</span>
                                </div>
                            </div>

                            {file.type !== "folder" && (
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm rounded-xl">
                                    <Button variant="ghost" className="text-white hover:text-rose-500">
                                        <Download className="w-6 h-6" />
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

            </div>
        </div>
    );
}
