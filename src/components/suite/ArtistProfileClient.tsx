"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Edit, Globe, Instagram, Music, Twitter, Users, FolderOpen, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { mockDB } from "@/lib/mock/mock-db";
import { MockArtist, MockProject } from "@/lib/mock/data";
import { useToast } from "@/providers/ToastContext";

export function ArtistProfileClient({ id }: { id: string }) {
    const [artist, setArtist] = useState<MockArtist | null>(null);
    const [projects, setProjects] = useState<MockProject[]>([]);
    const [activeTab, setActiveTab] = useState<"projects" | "team">("projects");
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const artistData = await mockDB.getArtist(id);
                if (artistData) {
                    setArtist(artistData);
                    const projectData = await mockDB.getProjects(id);
                    setProjects(projectData);
                } else {
                    toast("Artist not found", "error");
                }
            } catch (error) {
                toast("Failed to load profile", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, toast]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
        </div>;
    }

    if (!artist) return null;

    return (
        <div className="min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative h-[400px] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={artist.image}
                        alt="Background"
                        fill
                        className="object-cover opacity-30 blur-3xl scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black" />
                </div>

                <div className="relative container mx-auto px-8 h-full flex items-end pb-12">
                    <Link href="/suite/artists" className="absolute top-8 left-8 text-white/60 hover:text-white transition-colors flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Roster
                    </Link>

                    <div className="flex items-end gap-8 w-full">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, rotate: -20 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{ duration: 0.8, ease: "backOut" }}
                            className="relative w-48 h-48 flex-shrink-0"
                        >
                            <div className="absolute inset-0 rounded-full bg-black shadow-2xl overflow-hidden border-4 border-white/10">
                                <Image
                                    src={artist.image}
                                    alt={artist.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full border border-white/20" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center border-4 border-black animate-pulse">
                                <Music className="w-4 h-4 text-white" />
                            </div>
                        </motion.div>

                        <div className="flex-1 mb-2">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-wider border border-rose-500/20">
                                    {artist.careerPhase}
                                </span>
                                <span className="text-white/40 text-sm">{artist.genre}</span>
                            </div>
                            <h1 className="text-6xl font-bold text-white mb-4 tracking-tighter">{artist.name}</h1>

                            <div className="flex items-center gap-6 text-white/60 text-sm">
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    <span>{artist.monthlyListeners} Listeners</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FolderOpen className="w-4 h-4" />
                                    <span>{artist.activeProjects} Active Projects</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mb-4">
                            <Button variant="glass" className="h-10 w-10 p-0 flex items-center justify-center rounded-full"><Instagram className="w-4 h-4" /></Button>
                            <Button variant="glass" className="h-10 w-10 p-0 flex items-center justify-center rounded-full"><Twitter className="w-4 h-4" /></Button>
                            <Button variant="glass" className="h-10 w-10 p-0 flex items-center justify-center rounded-full"><Globe className="w-4 h-4" /></Button>
                            <div className="w-px h-10 bg-white/10 mx-2" />
                            <Button variant="primary" className="gap-2">
                                <Edit className="w-4 h-4" /> Edit Profile
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-8 mt-8">
                <div className="flex gap-8 border-b border-white/10 mb-8">
                    <button
                        onClick={() => setActiveTab("projects")}
                        className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === "projects" ? "text-white" : "text-white/40 hover:text-white"}`}
                    >
                        Projects & Releases
                        {activeTab === "projects" && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500" />}
                    </button>
                    <button
                        onClick={() => setActiveTab("team")}
                        className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === "team" ? "text-white" : "text-white/40 hover:text-white"}`}
                    >
                        Team & Contacts
                        {activeTab === "team" && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500" />}
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === "projects" ? (
                        <motion.div
                            key="projects"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {projects.map(project => (
                                <div key={project.id} className="glass-panel p-6 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer border border-white/5 hover:border-rose-500/30">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-white/5 rounded-lg group-hover:bg-rose-500/20 transition-colors">
                                            <FolderOpen className="w-6 h-6 text-rose-500" />
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded border ${project.status === "Completed" ? "border-green-500/30 text-green-400" :
                                            project.status === "In Progress" ? "border-blue-500/30 text-blue-400" :
                                                "border-amber-500/30 text-amber-400"
                                            }`}>
                                            {project.status}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                                    <p className="text-white/40 text-sm mb-4">{project.type} • Due {project.dueDate}</p>

                                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-2">
                                        <div className="h-full bg-rose-500 rounded-full" style={{ width: `${project.progress}%` }} />
                                    </div>
                                    <div className="flex justify-between text-xs text-white/40">
                                        <span>{project.progress}% Complete</span>
                                        <span>{project.completedTasks}/{project.tasks} Tasks</span>
                                    </div>
                                </div>
                            ))}
                            {projects.length === 0 && (
                                <div className="col-span-full py-12 text-center text-white/40 border border-dashed border-white/10 rounded-xl">
                                    No projects found for this artist.
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="team"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {artist.team.map((member, i) => (
                                <div key={i} className="glass-panel p-4 rounded-xl flex items-center gap-4 border border-white/5">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center border border-white/10">
                                        <span className="text-lg font-bold text-white">{member.split(":")[0][0]}</span>
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">{member.split(":")[1].trim()}</p>
                                        <p className="text-rose-500 text-sm">{member.split(":")[0]}</p>
                                    </div>
                                    <div className="ml-auto flex gap-2">
                                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Mail className="w-4 h-4 text-white/60" /></button>
                                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Phone className="w-4 h-4 text-white/60" /></button>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
